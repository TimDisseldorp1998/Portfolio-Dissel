"use client";

import { reopenConsent } from "../CookieConsent";

/** Opent de cookiebanner opnieuw. Alleen zichtbaar als GA is ingesteld. */
export function CookieVoorkeurenKnop({ className }: { className?: string }) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Cookievoorkeuren
    </button>
  );
}
