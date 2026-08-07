"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Meldt of een element voor een deel in beeld staat, en blijft dat volgen —
 * het schakelt dus ook terug naar `false` zodra het weer uit beeld scrolt.
 *
 * `amount` is het deel van het element dat zichtbaar moet zijn (0 tot 1).
 */
export function useInView(ref: RefObject<Element>, amount = 0.5) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: amount }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, amount]);

  return inView;
}
