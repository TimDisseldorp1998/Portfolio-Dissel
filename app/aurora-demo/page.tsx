"use client";

import { useState } from "react";
import { AuroraBackground } from "@/components/AuroraBackground";

/**
 * Interactive playground for the AuroraBackground shader.
 * Open at /aurora-demo. Tweak, then click "Kopieer config" to grab a JSX
 * snippet you can paste back into Hero.tsx.
 */
export default function AuroraDemoPage() {
  const [color1, setColor1] = useState("#5CDDFF");
  const [color2, setColor2] = useState("#7C5CFF");
  const [color3, setColor3] = useState("#E75CFF");
  const [color4, setColor4] = useState("#FF9F5C");
  const [background, setBackground] = useState("#050508");
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [spread, setSpread] = useState(1);
  const [grain, setGrain] = useState(true);
  const [copied, setCopied] = useState(false);

  function copyConfig() {
    const snippet = `<AuroraBackground
  colors={{
    color1: "${color1}",
    color2: "${color2}",
    color3: "${color3}",
    color4: "${color4}",
    background: "${background}",
  }}
  speed={${speed}}
  intensity={${intensity}}
  spread={${spread}}${grain ? "" : "\n  grain={false}"}
/>`;
    navigator.clipboard
      .writeText(snippet)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  function reset() {
    setColor1("#5CDDFF");
    setColor2("#7C5CFF");
    setColor3("#E75CFF");
    setColor4("#FF9F5C");
    setBackground("#050508");
    setSpeed(1);
    setIntensity(1);
    setSpread(1);
    setGrain(true);
  }

  return (
    <main className="fixed inset-0 overflow-hidden">
      <AuroraBackground
        colors={{ color1, color2, color3, color4, background }}
        speed={speed}
        intensity={intensity}
        spread={spread}
        grain={grain}
      />

      {/* Title over aurora */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/50">
          Aurora playground
        </p>
        <h1 className="font-heading text-4xl font-semibold sm:text-5xl md:text-6xl">
          Tweak, kopieer, plak.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          De config in het paneel rechts stuurt de shader live aan. Als je iets
          moois hebt, klik &quot;Kopieer config&quot; en plak het in{" "}
          <code className="text-white/80">components/Hero.tsx</code>.
        </p>
      </div>

      {/* Control panel */}
      <div className="absolute right-4 top-4 z-10 w-[320px] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-white/10 bg-black/70 p-5 text-white shadow-2xl backdrop-blur-xl md:right-6 md:top-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-widest">
            Config
          </h2>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-white/50 underline underline-offset-2 hover:text-white"
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          <ColorRow label="Cyaan (dominant)" value={color1} onChange={setColor1} />
          <ColorRow label="Violet" value={color2} onChange={setColor2} />
          <ColorRow label="Magenta" value={color3} onChange={setColor3} />
          <ColorRow label="Coraal (warm)" value={color4} onChange={setColor4} />
          <ColorRow label="Basis" value={background} onChange={setBackground} />
        </div>

        <div className="mt-5 space-y-3">
          <SliderRow
            label="Snelheid"
            value={speed}
            onChange={setSpeed}
            min={0.1}
            max={3}
            step={0.05}
          />
          <SliderRow
            label="Intensiteit"
            value={intensity}
            onChange={setIntensity}
            min={0.4}
            max={2}
            step={0.05}
          />
          <SliderRow
            label="Spread"
            value={spread}
            onChange={setSpread}
            min={0.5}
            max={2}
            step={0.05}
          />
          <label className="flex items-center justify-between gap-3 text-xs">
            <span className="text-white/80">Film grain</span>
            <input
              type="checkbox"
              checked={grain}
              onChange={(e) => setGrain(e.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={copyConfig}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          {copied ? "Gekopieerd!" : "Kopieer config"}
        </button>

        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          Tip: check ook <code className="text-white/60">prefers-reduced-motion</code>{" "}
          door je systeem-motion-instellingen aan te zetten — dan zie je de
          statische fallback.
        </p>
      </div>
    </main>
  );
}

/* ---------------------------------- UI ------------------------------------ */

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 text-xs">
      <span className="text-white/80">{label}</span>
      <span className="inline-flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-10 cursor-pointer rounded border border-white/20 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 rounded border border-white/15 bg-white/5 px-2 py-1 font-mono text-[11px] text-white"
        />
      </span>
    </label>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="block text-xs">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-white/80">{label}</span>
        <span className="font-mono text-white/60">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-cyan-400"
      />
    </label>
  );
}
