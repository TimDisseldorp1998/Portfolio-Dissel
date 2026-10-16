/**
 * Events naar GA4, rechtstreeks via gtag.js (geen Tag Manager). Er gaat
 * alleen iets weg als de bezoeker in de cookiebanner op Accepteren klikte;
 * zonder toestemming wordt er niets verstuurd en ook niets in de wachtrij
 * gezet.
 *
 * GA4 toont eigen parameters (project_type, page_path, cta_name) pas in
 * rapporten als ze in GA4 als aangepaste dimensie (bereik: event) zijn
 * aangemaakt.
 */

/** Toestemmingssleutel in localStorage, gedeeld met CookieConsent. */
export const TOESTEMMING_KEY = "dd-analytics-consent";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export type MeetEvent =
  | {
      naam: "generate_lead";
      params: { page_path: string; project_type: string };
    }
  | { naam: "email_click"; params: { page_path: string } }
  | {
      naam: "cta_click";
      params: { cta_name: "plan_kennismaking"; page_path: string };
    };

function heeftToestemming(): boolean {
  try {
    return localStorage.getItem(TOESTEMMING_KEY) === "granted";
  } catch {
    return false;
  }
}

export function meet({ naam, params }: MeetEvent) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_ID || !heeftToestemming()) return;
  window.dataLayer = window.dataLayer || [];
  // Dezelfde gtag als in CookieConsent. Is gtag.js nog niet geladen, dan komt
  // het event in de wachtrij en verwerkt gtag.js het zodra het er is.
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  window.gtag("event", naam, params);
}
