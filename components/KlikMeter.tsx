"use client";

import { useEffect } from "react";
import { meet } from "@/lib/meten";

/**
 * Eén luisteraar voor de hele site, in plaats van een onClick op elke link:
 * - `email_click` bij elke mailto-link;
 * - `cta_click` bij elk element met `data-cta="plan_kennismaking"`.
 * Een nieuwe kennismakingsknop telt dus mee zodra hij dat attribuut heeft.
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
      if (el.getAttribute("data-cta") === "plan_kennismaking") {
        meet({
          naam: "cta_click",
          params: { cta_name: "plan_kennismaking", page_path },
        });
      }
    };
    document.addEventListener("click", opKlik, { capture: true });
    return () => document.removeEventListener("click", opKlik, { capture: true });
  }, []);
  return null;
}
