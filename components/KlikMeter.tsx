"use client";

import { useEffect } from "react";
import { meet } from "@/lib/meten";

/**
 * Eén luisteraar voor de hele site, in plaats van een onClick op elke link:
 * - `email_click` bij elke mailto-link;
 * - `cta_click` bij elk element met `data-cta="plan_kennismaking"` of
 *   `data-cta="pakket_…"` (de "Vraag aan"-knoppen bij de prijzen).
 * Een nieuwe knop telt dus mee zodra hij dat attribuut heeft.
 */
export function KlikMeter() {
  useEffect(() => {
    const opKlik = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (!el) return;
      const page_path = window.location.pathname;
      if (el.getAttribute("href")?.startsWith("mailto:")) {
        meet({ naam: "email_click", params: { page_path } });
      }
      const cta = el.getAttribute("data-cta");
      if (cta === "plan_kennismaking" || cta?.startsWith("pakket_")) {
        meet({
          naam: "cta_click",
          params: { cta_name: cta as "plan_kennismaking" | `pakket_${string}`, page_path },
        });
      }
    };
    document.addEventListener("click", opKlik, { capture: true });
    return () => document.removeEventListener("click", opKlik, { capture: true });
  }, []);
  return null;
}
