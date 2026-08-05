"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * GDPR/AVG-conforme, opt-in analytics. Google Analytics wordt PAS geladen
 * nadat de bezoeker op "Accepteren" klikt — vóór die keuze gaan er geen
 * requests naar Google. De keuze blijft in localStorage bewaard.
 *
 * De banner blokkeert de site bewust niet: je kunt gewoon doorscrollen en
 * -klikken terwijl hij onderin staat.
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
  // Op de privacy-pagina geen banner: die moet juist vrij leesbaar zijn
  // voordat iemand kiest. Terug op de site verschijnt de banner alsnog.
  const pathname = usePathname();
  const onPrivacyPage = pathname?.startsWith("/privacy") ?? false;

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

  const bannerOpen = consent === null && !!GA_ID && !onPrivacyPage;

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

      {bannerOpen && (
        <>
          <div
            role="dialog"
            aria-label="Cookievoorkeuren"
            className="fixed inset-x-4 bottom-[calc(8rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#12121A]/95 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-7 lg:bottom-6"
          >
            <p className="font-heading text-xl font-semibold">Cookies</p>
            <p className="text-base leading-relaxed text-white/75">
              Met jouw toestemming gebruik ik cookies om verkeer te
              analyseren, advertenties te personaliseren en je ervaring te
              verbeteren. Lees meer in de{" "}
              <a
                href="/privacy/"
                className="text-white underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                privacyverklaring
              </a>
              .
            </p>
            <div className="mt-2 flex items-center gap-3">
              {/* Zelfde hover als de site-CTA's: alleen een tint donkerder,
                  geen lift (ui/Button springt omhoog, dat oogt hier onrustig). */}
              <button
                type="button"
                onClick={() => choose("granted")}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full bg-primary font-semibold text-ink shadow-glow transition-all duration-200 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
              >
                Accepteren
              </button>
              <button
                type="button"
                onClick={() => choose("denied")}
                className="min-h-[44px] shrink-0 rounded px-4 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white/80 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                Weigeren
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
