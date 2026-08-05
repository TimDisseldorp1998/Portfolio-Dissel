"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/**
 * GDPR/AVG-conforme, opt-in analytics. Google Analytics wordt PAS geladen
 * nadat de bezoeker op "Accepteren" klikt — vóór die keuze gaan er geen
 * requests naar Google. De keuze blijft in localStorage bewaard.
 *
 * De banner is een modal: een donkere blur-overlay legt de focus op de
 * keuze en de pagina eronder is even niet scrolbaar of klikbaar.
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
  const acceptRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
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

  // Modal-gedrag zolang de banner open is: pagina-scroll op slot en focus op
  // de Accepteren-knop. Tab blijft binnen de dialog (licht focus-trap).
  useEffect(() => {
    if (!bannerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    acceptRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>("a, button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [bannerOpen]);

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
          {/* Overlay — dimt en blurt de site zodat de focus op de keuze ligt.
              Bewust niet klikbaar-om-te-sluiten: er moet gekozen worden. */}
          <div
            aria-hidden
            className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm motion-safe:animate-[fadeIn_250ms_ease-out]"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cookievoorkeuren"
            className="fixed inset-x-4 bottom-[calc(8rem+env(safe-area-inset-bottom))] z-[60] mx-auto flex max-w-md flex-col gap-4 rounded-2xl border border-white/10 bg-[#12121A]/95 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-7 lg:bottom-6"
          >
            <p className="font-heading text-lg font-semibold">Cookies</p>
            <p className="text-sm leading-relaxed text-white/75">
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
            {/* Zelfde hover als de site-CTA's: alleen een tint donkerder,
                geen lift (ui/Button springt omhoog, dat oogt hier onrustig). */}
            <button
              ref={acceptRef}
              type="button"
              onClick={() => choose("granted")}
              className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary font-semibold text-ink shadow-glow transition-all duration-200 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
            >
              Accepteren
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="mx-auto min-h-[44px] rounded px-4 text-sm text-white/50 underline-offset-4 transition-colors hover:text-white/80 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              Weigeren
            </button>
          </div>
        </>
      )}
    </>
  );
}
