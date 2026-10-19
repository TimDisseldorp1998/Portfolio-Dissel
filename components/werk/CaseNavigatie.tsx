"use client";

import { useRouter } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { trekIn } from "./trekIn";

type Buur = { slug: string; klant: string; kaartbeeld: string };

/**
 * Vorige en volgende case. Een klik trekt je de foto in: het beeld maakt zich
 * los van de kaart en vliegt naar de plek van de grote foto bovenaan de
 * casepagina, terwijl de pagina erachter wegzakt. Daar landt hij, de nieuwe
 * pagina neemt de foto naadloos over en de tekst eronder komt op.
 *
 * De animatie zelf staat in ./trekIn.ts. Zonder JavaScript, bij reduced
 * motion of bij cmd/ctrl-klik is het gewoon een link.
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
