"use client";

import { useSyncExternalStore } from "react";

/**
 * Leest `prefers-reduced-motion: reduce` uit en volgt wijzigingen live.
 *
 * Vervangt de gelijknamige hook van framer-motion en geeft dezelfde waarde
 * terug, zodat aanroepende code niet hoeft te veranderen.
 *
 * `useSyncExternalStore` gebruikt tijdens de server-render en de hydratie de
 * server-snapshot (`false`), en pas daarna de echte waarde. Zo raakt `window`
 * nooit aangeroepen tijdens het renderen, wat de statische export zou breken.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
