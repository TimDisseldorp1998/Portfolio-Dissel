"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/* -------------------------------------------------------------------------- */
/*  Config — safe to tweak                                                     */
/* -------------------------------------------------------------------------- */

const DEFAULT_COLORS = {
  color1: "#5CDDFF", // cyan  — dominant ribbon, brand anchor
  color2: "#7C5CFF", // violet — analogous neighbour
  color3: "#E75CFF", // magenta — high-energy pop
  color4: "#FF9F5C", // coral — one warm accent for depth
  background: "#050508", // near-black with a hint of blue
};

const DEFAULTS = {
  speed: 1, // 0.1 – 3 (multiplier on ~33s base cycle)
  intensity: 1, // 0.4 – 2 (ribbon brightness/opacity)
  spread: 1, // 0.5 – 2 (larger = wider, softer ribbons)
  grain: true, // subtle film-grain overlay to prevent banding
};

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface AuroraColors {
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  background?: string;
}

export interface AuroraBackgroundProps {
  colors?: AuroraColors;
  speed?: number;
  intensity?: number;
  spread?: number;
  grain?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function hexToRGB(hex: string): [number, number, number] {
  const clean = (hex ?? "").replace("#", "").trim();
  if (clean.length !== 3 && clean.length !== 6) return [0, 0, 0];
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [0, 0, 0];
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

/** Empty/invalid color → fall back to the background (invisible ribbon). */
function normalizeColor(input: string | undefined, fallback: string): string {
  const clean = (input ?? "").replace("#", "").trim();
  return clean.length === 3 || clean.length === 6 ? (input as string) : fallback;
}

/* -------------------------------------------------------------------------- */
/*  Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const VERT_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// Ashima simplex noise + fbm + 4-layer aurora ribbon blend.
const FRAG_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uBackground;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSpread;
uniform float uGrain;

vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
       i.z + vec4(0.0, i1.z, i2.z, 1.0))
     + i.y + vec4(0.0, i1.y, i2.y, 1.0))
     + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += amp * snoise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= uResolution.x / uResolution.y;

  // ~33s base cycle at speed=1.
  float t = uTime * uSpeed * 0.03;

  vec3 color = uBackground;

  // Layer 1 — cyan (dominant)
  vec3 q1 = vec3(p * uSpread * 0.7, t);
  float n1 = fbm(q1) * 0.5 + 0.5;
  float ribbon1 = smoothstep(0.34, 0.62, n1) * (1.0 - smoothstep(0.62, 0.88, n1));
  color = mix(color, uColor1, ribbon1 * uIntensity * 0.95);

  // Layer 2 — violet
  vec3 q2 = vec3(p * uSpread * 0.9 + vec2(3.7, 1.4), t * 0.72);
  float n2 = fbm(q2) * 0.5 + 0.5;
  float ribbon2 = smoothstep(0.30, 0.58, n2) * (1.0 - smoothstep(0.58, 0.86, n2));
  color = mix(color, uColor2, ribbon2 * uIntensity * 0.75);

  // Layer 3 — magenta
  vec3 q3 = vec3(p * uSpread * 1.15 - vec2(2.3, 3.1), t * 1.2);
  float n3 = fbm(q3) * 0.5 + 0.5;
  float ribbon3 = smoothstep(0.42, 0.66, n3) * (1.0 - smoothstep(0.66, 0.90, n3));
  color = mix(color, uColor3, ribbon3 * uIntensity * 0.6);

  // Layer 4 — coral (subtle warm accent)
  vec3 q4 = vec3(p * uSpread * 0.55 + vec2(5.2, -2.3), t * 0.5);
  float n4 = fbm(q4) * 0.5 + 0.5;
  float ribbon4 = smoothstep(0.50, 0.74, n4) * (1.0 - smoothstep(0.74, 0.94, n4));
  color = mix(color, uColor4, ribbon4 * uIntensity * 0.4);

  // Darken bottom half for content readability.
  float bottomDark = smoothstep(0.55, 0.05, uv.y);
  color = mix(color, uBackground, bottomDark * 0.55);

  // Soft radial vignette.
  float vignette = smoothstep(1.4, 0.35, length(p * 0.55));
  color = mix(uBackground, color, 0.35 + 0.65 * vignette);

  // Optional film grain against banding.
  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += (g - 0.5) * 0.02;
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function AuroraBackground({
  colors,
  speed = DEFAULTS.speed,
  intensity = DEFAULTS.intensity,
  spread = DEFAULTS.spread,
  grain = DEFAULTS.grain,
  className,
  style,
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const raw = { ...DEFAULT_COLORS, ...colors };
  const background = normalizeColor(raw.background, DEFAULT_COLORS.background);
  const merged = {
    color1: normalizeColor(raw.color1, background),
    color2: normalizeColor(raw.color2, background),
    color3: normalizeColor(raw.color3, background),
    color4: normalizeColor(raw.color4, background),
    background,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl =
      (canvas.getContext("webgl", { premultipliedAlpha: false }) as
        | WebGLRenderingContext
        | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      // No WebGL — show CSS fallback.
      canvas.style.display = "none";
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }

    // Compile shader helper.
    function compile(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) throw new Error("Failed to create shader");
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        const log = gl!.getShaderInfoLog(s);
        gl!.deleteShader(s);
        throw new Error(`Shader compile error: ${log}`);
      }
      return s;
    }

    let program: WebGLProgram | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    try {
      vs = compile(gl.VERTEX_SHADER, VERT_SHADER);
      fs = compile(gl.FRAGMENT_SHADER, FRAG_SHADER);
      program = gl.createProgram();
      if (!program) throw new Error("Failed to create program");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
      }
    } catch (err) {
      console.error(err);
      canvas.style.display = "none";
      if (fallbackRef.current) fallbackRef.current.style.display = "block";
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations.
    const uTime = gl.getUniformLocation(program, "uTime");
    const uRes = gl.getUniformLocation(program, "uResolution");
    const uBg = gl.getUniformLocation(program, "uBackground");
    const uC1 = gl.getUniformLocation(program, "uColor1");
    const uC2 = gl.getUniformLocation(program, "uColor2");
    const uC3 = gl.getUniformLocation(program, "uColor3");
    const uC4 = gl.getUniformLocation(program, "uColor4");
    const uSpeed = gl.getUniformLocation(program, "uSpeed");
    const uInt = gl.getUniformLocation(program, "uIntensity");
    const uSpread = gl.getUniformLocation(program, "uSpread");
    const uGrain = gl.getUniformLocation(program, "uGrain");

    // Static color uniforms.
    gl.uniform3fv(uBg, hexToRGB(merged.background));
    gl.uniform3fv(uC1, hexToRGB(merged.color1));
    gl.uniform3fv(uC2, hexToRGB(merged.color2));
    gl.uniform3fv(uC3, hexToRGB(merged.color3));
    gl.uniform3fv(uC4, hexToRGB(merged.color4));
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uInt, intensity);
    gl.uniform1f(uSpread, spread);
    gl.uniform1f(uGrain, grain ? 1 : 0);

    // Resolution scaling. The aurora is a soft, blurry gradient, so we render
    // it well below native resolution: the quality loss is invisible, but it
    // slashes fragment-shader work. This is what keeps it cheap on weak GPUs and
    // in lab tools (Lighthouse) that render WebGL in software on the CPU.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const quality = isMobile ? 0.75 : 0.9;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * quality));
      const h = Math.max(1, Math.round(rect.height * quality));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
      gl!.uniform2f(uRes, w, h);
    }
    resize();

    // Animation loop — only runs while the hero is on-screen AND the tab is
    // visible. Pausing when scrolled away (or hidden) frees the GPU/CPU so the
    // rest of the page and smooth-scrolling back to the top stay snappy.
    let raf = 0;
    let running = false;
    let inView = true;
    let tabVisible = !document.hidden;
    const start = performance.now();

    // Cap the animation at ~30fps. The drift is slow, so 30fps is visually
    // identical to 60fps but halves the shader work per second.
    const FRAME_MS = 1000 / 30;
    let lastDraw = 0;

    function drawStatic() {
      gl!.uniform1f(uTime, 12.0); // any fixed value gives a nice frozen aurora
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function sync() {
      const shouldRun = !prefersReducedMotion && tabVisible && inView;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      sync();
    }

    function onVisibility() {
      tabVisible = !document.hidden;
      sync();
    }

    // Pause the shader once the hero scrolls out of view.
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    function onResize() {
      resize();
      if (prefersReducedMotion) drawStatic();
    }

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, [
    merged.background,
    merged.color1,
    merged.color2,
    merged.color3,
    merged.color4,
    speed,
    intensity,
    spread,
    grain,
  ]);

  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          // The buffer renders below native resolution for performance; a hair
          // of blur (with a tiny upscale to push the blurred edge past the
          // clipped container) smooths the upscale so there's no visible
          // pixelation or grain-speckle on the gradient.
          filter: "blur(1.5px)",
          transform: "scale(1.04)",
          transformOrigin: "center",
        }}
      />
      {/* CSS fallback for no-WebGL devices — hidden by default, shown by JS if needed. */}
      <div
        ref={fallbackRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "none",
          background: `
            radial-gradient(60% 55% at 40% 30%, ${merged.color1}55 0%, transparent 60%),
            radial-gradient(50% 45% at 70% 40%, ${merged.color2}44 0%, transparent 65%),
            radial-gradient(55% 45% at 55% 55%, ${merged.color3}33 0%, transparent 70%),
            radial-gradient(40% 35% at 25% 65%, ${merged.color4}22 0%, transparent 70%),
            ${merged.background}
          `,
        }}
      />
    </div>
  );
}
