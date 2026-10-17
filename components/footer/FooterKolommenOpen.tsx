"use client";

import { useEffect } from "react";

const DESKTOP = "(min-width: 768px)";

/**
 * De footerkolommen zijn <details>: op mobiel klap je ze uit, en de links
 * staan ook dichtgeklapt in de HTML. Vanaf tablet zet dit ze open en houdt
 * het ze open, want daar is ruimte voor alle kolommen naast elkaar.
 */
export function FooterKolommenOpen() {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const kolommen = () =>
      document.querySelectorAll<HTMLDetailsElement>("details[data-footer-kolom]");
    const zetOpen = () => {
      if (mq.matches) kolommen().forEach((d) => (d.open = true));
    };
    // Op desktop sluit een klik op de kop de kolom niet.
    const blokkeerSluiten = (e: Event) => {
      if (mq.matches && (e.target as Element).closest("summary")) e.preventDefault();
    };
    zetOpen();
    mq.addEventListener("change", zetOpen);
    kolommen().forEach((d) => d.addEventListener("click", blokkeerSluiten));
    return () => {
      mq.removeEventListener("change", zetOpen);
      kolommen().forEach((d) => d.removeEventListener("click", blokkeerSluiten));
    };
  }, []);
  return null;
}
