"use client";

import { useEffect } from "react";

/** Oude slugs die een nieuwe URL kregen. */
const HERNOEMD: Record<string, string> = {
  "marktzicht-eten-en-drinken": "marktzicht",
};

/**
 * Cases openden eerst in een lade op home, met `/?case=<slug>` als deelbare
 * link. Die links staan nog in mails en berichten; ze sturen nu door naar de
 * eigen casepagina. Een statische export heeft geen server die dat met een
 * 301 kan doen, dus het gebeurt hier in de browser.
 */
export function OudeCaseLinks() {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("case");
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) return;
    window.location.replace(`/werk/${HERNOEMD[slug] ?? slug}/`);
  }, []);
  return null;
}
