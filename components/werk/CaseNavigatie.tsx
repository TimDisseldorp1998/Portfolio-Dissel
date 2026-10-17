"use client";

import { useRouter } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Buur = { slug: string; klant: string; kaartbeeld: string };

/** Van de kaart naar de hero, en daarna het donker laten wegzakken. */
const IN_MS = 750;
const UIT_MS = 650;
const EASE_IN = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_UIT = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Vorige en volgende case. Een klik trekt je de foto in: het beeld maakt zich
 * los van de kaart en vliegt naar de plek van de grote foto bovenaan de
 * casepagina, terwijl de pagina erachter wegzakt. Daar landt hij, de nieuwe
 * pagina neemt de foto naadloos over en de tekst eronder komt op.
 *
 * De overlay hangt direct aan <body>, buiten React. Zo overleeft hij de
 * navigatie, want deze component verdwijnt daarbij. Zonder JavaScript, bij
 * reduced motion of bij cmd/ctrl-klik is het gewoon een link.
 */
export function CaseNavigatie({ vorige, volgende }: { vorige: Buur; volgende: Buur }) {
  return (
    <nav aria-label="Andere cases" className="grid gap-4 md:grid-cols-2 md:gap-5">
      <Kaart buur={vorige} richting="vorige" />
      <Kaart buur={volgende} richting="volgende" />
    </nav>
  );
}

function Kaart({ buur, richting }: { buur: Buur; richting: "vorige" | "volgende" }) {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const href = `/werk/${buur.slug}/`;
  const terug = richting === "vorige";

  function klik(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = imgRef.current;
    if (!img || typeof img.animate !== "function") return;
    e.preventDefault();
    trekIn(img, href, (url) => router.push(url));
  }

  return (
    <a
      href={href}
      onClick={klik}
      onMouseEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
      className="group relative flex min-h-[10rem] items-end overflow-hidden rounded-3xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff833d] focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark md:min-h-[13rem] md:p-8"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={buur.kaartbeeld}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-surface-dark opacity-[0.6] transition-opacity duration-500 group-hover:opacity-[0.5]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,1)_0%,rgba(10,10,15,0.6)_50%,rgba(10,10,15,0)_100%)]"
      />
      <span className={cn("relative flex w-full items-end justify-between gap-6", terug && "flex-row-reverse")}>
        <span className={cn(terug && "text-right")}>
          <span className="block text-xs font-medium uppercase tracking-[0.22em] text-white/70">
            {terug ? "Vorige case" : "Volgende case"}
          </span>
          <span className="mt-2 block font-heading text-2xl font-semibold text-white sm:text-3xl">
            {buur.klant}
          </span>
        </span>
        <span
          aria-hidden
          className={cn(
            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary transition-[background-color,color,transform] duration-300 group-hover:bg-secondary group-hover:text-white",
            terug ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
          )}
        >
          {terug ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
        </span>
      </span>
    </a>
  );
}

let bezig = false;

/** Waar de hero van de casepagina staat: bovenaan, volle breedte, 75svh
 *  met een minimum van 22rem. Zelfde maten als in app/werk/[slug]/page.tsx. */
function heroDoel() {
  const h = Math.max(window.innerHeight * 0.75, 22 * 16);
  return { left: 0, top: 0, width: window.innerWidth, height: h };
}

type Rect = { left: number; top: number; width: number; height: number };
const px = (r: Rect, radius: string) => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
  borderRadius: radius,
});

function laag(stijl: Partial<CSSStyleDeclaration>) {
  const el = document.createElement("div");
  Object.assign(el.style, { position: "absolute", inset: "0", ...stijl });
  return el;
}

function trekIn(bron: HTMLImageElement, href: string, navigeer: (url: string) => void) {
  if (bezig) return;
  bezig = true;

  const kaart = bron.parentElement!;
  const r = kaart.getBoundingClientRect();
  const radius = getComputedStyle(kaart).borderRadius;
  const html = document.documentElement;
  // De body is licht; zonder dit zie je lichte randen als de pagina wegzakt.
  const oudeBody = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#0a0a0f";

  // Achtergrond: het scherm wordt donker, zodat onder de hero niets van de
  // oude pagina overblijft.
  const achter = document.createElement("div");
  achter.setAttribute("aria-hidden", "true");
  Object.assign(achter.style, {
    position: "fixed",
    inset: "0",
    zIndex: "99",
    pointerEvents: "none",
    background: "#0a0a0f",
    opacity: "0",
  });

  // Het frame groeit van de kaart naar de plek van de hero. De foto zit er
  // met object-fit: cover in, dus de uitsnede klopt aan begin en eind
  // precies met de kaart en met de hero.
  const frame = document.createElement("div");
  frame.setAttribute("aria-hidden", "true");
  Object.assign(frame.style, {
    position: "fixed",
    overflow: "hidden",
    zIndex: "100",
    pointerEvents: "none",
    ...px(r, radius),
  });
  const foto = bron.cloneNode() as HTMLImageElement;
  foto.removeAttribute("loading");
  Object.assign(foto.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "none",
    transform: "scale(1.04)",
  });
  // De donkere lagen van de kaart lossen op, het verloop van de hero komt op.
  const kaartWaas = laag({ background: "#0a0a0f", opacity: "0.5" });
  const kaartVerloop = laag({
    background: "linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0) 100%)",
  });
  const heroVerloop = laag({
    top: "50%",
    bottom: "-1px",
    background: "linear-gradient(to top, #0a0a0f, rgba(10,10,15,0))",
    opacity: "0",
  });
  frame.append(foto, kaartWaas, kaartVerloop, heroVerloop);
  document.body.append(achter, frame);

  const opties = { duration: IN_MS, easing: EASE_IN, fill: "forwards" as const };
  const main = document.getElementById("main");
  const wegzakken = main?.animate(
    [
      { transform: "scale(1)", filter: "blur(0px)" },
      { transform: "scale(0.94)", filter: "blur(6px)" },
    ],
    opties,
  );
  achter.animate([{ opacity: 0 }, { opacity: 1 }], opties);
  frame.animate([px(r, radius), px(heroDoel(), "0px")], opties);
  foto.animate([{ transform: "scale(1.04)" }, { transform: "scale(1)" }], opties);
  kaartWaas.animate([{ opacity: 0.5 }, { opacity: 0 }], opties);
  kaartVerloop.animate([{ opacity: 1 }, { opacity: 0 }], opties);
  heroVerloop.animate([{ opacity: 0 }, { opacity: 1 }], opties);

  const oudScroll = html.style.scrollBehavior;

  window.setTimeout(() => {
    // Geen zacht scrollen naar boven onder de overlay door, en de tekst van
    // de nieuwe pagina wacht met opkomen tot de foto geland is.
    html.style.scrollBehavior = "auto";
    html.setAttribute("data-case-overgang", "");
    const oudeKop = document.querySelector("h1")?.textContent;
    navigeer(href);

    // Met timers in plaats van animatieframes: een tabblad op de achtergrond
    // pauzeert die, en dan zou de overlay blijven liggen.
    const start = performance.now();
    const wacht = () => {
      // De URL verandert al voordat de nieuwe pagina staat. Een andere h1
      // betekent dat hij er echt is.
      const klaar = document.querySelector("h1")?.textContent !== oudeKop;
      if (!klaar && performance.now() - start < 4000) {
        window.setTimeout(wacht, 30);
        return;
      }
      wegzakken?.cancel();
      window.scrollTo(0, 0);
      html.style.scrollBehavior = oudScroll;

      // Kleine correctie als de echte hero net anders valt dan berekend
      // (adresbalk op mobiel), daarna neemt de pagina het over.
      const hero = document.querySelector("[data-case-hero]")?.getBoundingClientRect();
      if (hero) frame.animate([px(heroDoel(), "0px"), px(hero, "0px")], { duration: 200, easing: EASE_UIT, fill: "forwards" });

      window.setTimeout(() => {
        // De hero ligt nu exact onder het frame. Het donker zakt weg en de
        // tekst komt op.
        html.removeAttribute("data-case-overgang");
        achter.animate([{ opacity: 1 }, { opacity: 0 }], { duration: UIT_MS, easing: EASE_UIT, fill: "forwards" });
        window.setTimeout(() => {
          frame.remove();
          achter.remove();
          document.body.style.backgroundColor = oudeBody;
          bezig = false;
        }, UIT_MS + 50);
      }, hero ? 200 : 0);
    };
    window.setTimeout(wacht, 30);
  }, IN_MS);
}
