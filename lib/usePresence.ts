"use client";

import { useEffect, useState } from "react";

/**
 * Houdt een element in de pagina tot zijn uit-animatie klaar is.
 *
 * Zonder dit zou een element dat sluit meteen verdwijnen en zou je de
 * uit-animatie nooit zien. `state` gaat direct naar "closed" zodat de CSS de
 * uit-animatie kan draaien; pas na `exitMs` verdwijnt het echt.
 *
 * Zet in de CSS de animaties op `[data-state="open"]` en `[data-state="closed"]`.
 */
export function usePresence(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), exitMs);
    return () => window.clearTimeout(timer);
  }, [open, exitMs]);

  return { mounted, state: (open ? "open" : "closed") as "open" | "closed" };
}
