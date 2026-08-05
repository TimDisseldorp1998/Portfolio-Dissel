"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "./ui/Button";

/**
 * GDPR/AVG-conforme, opt-in analytics. Google Analytics wordt PAS geladen
 * nadat de bezoeker op "Accepteren" klikt — vóór die keuze gaan er geen
 * requests naar Google. De keuze blijft in localStorage bewaard.
 *
 * Zet `NEXT_PUBLIC_GA_ID` (bijv. G-XXXXXXXXXX) om dit te activeren; zonder
 * die var rendert dit component niets en verandert er niks aan de site.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "dd-analytics-consent"; // "granted" | "denied"
const REOPEN_EVENT = "dd:reopen-consent";

type Consent = "granted" | "denied";

/** Wis de opgeslagen keuze en toon de banner opnieuw (voor de footer-knop). */
export function reopenConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* localStorage kan geblokkeerd zijn — dan gewoon de banner tonen */
  }
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function CookieConsent() {
  // undefined = keuze nog niet uit storage gelezen (voorkomt hydration-flits)
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    const read = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        setConsent(stored === "granted" || stored === "denied" ? stored : null);
      } catch {
        setConsent(null);
      }
    };
    read();
    window.addEventListener(REOPEN_EVENT, read);
    return () => window.removeEventListener(REOPEN_EVENT, read);
  }, []);

  // Geen GA geconfigureerd, of keuze nog niet gelezen → niks renderen.
  if (!GA_ID || consent === undefined) return null;

  function choose(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* niet fataal */
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookievoorkeuren"
          className="fixed inset-x-4 bottom-[calc(8rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#12121A]/95 p-4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:p-5 lg:bottom-6"
        >
          <p className="text-sm leading-relaxed text-white/75">
            Ik gebruik Google Analytics om te zien hoe de site gebruikt wordt.
            Dat plaatst cookies, alleen als jij dat goedvindt.
          </p>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="md"
              className="min-h-[44px]"
              onClick={() => choose("denied")}
            >
              Weigeren
            </Button>
            <Button
              variant="primary"
              size="md"
              className="min-h-[44px]"
              onClick={() => choose("granted")}
            >
              Accepteren
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
