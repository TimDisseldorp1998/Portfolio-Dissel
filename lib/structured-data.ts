/**
 * Structured data (JSON-LD) voor zoekmachines en AI-assistenten.
 *
 * `ProfessionalService` en `Person` staan via de layout op elke pagina en
 * verwijzen naar elkaar via een vaste `@id`. Het `WebPage`-blok hoort alleen
 * bij /voor-ai/. Een `@id` over twee losse script-blokken heen is geldig:
 * Google voegt ze samen op dat id.
 */

export const SITE_URL = "https://disseldesign.com";

const BEDRIJF_ID = `${SITE_URL}/#business`;
const TIM_ID = `${SITE_URL}/#tim`;

const SOCIALS = [
  "https://www.linkedin.com/in/timdisseldorp/",
  "https://www.instagram.com/timdisseldorp/",
];

// Google Bedrijfsprofiel hoort ook in `sameAs` zodra de echte link er is.
export const bedrijfEnPersoon = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": BEDRIJF_ID,
      name: "DisselDesign",
      url: `${SITE_URL}/`,
      email: "info@disseldesign.com",
      description:
        "UX/UI design, webdesign, branding en webdevelopment voor ondernemers, merken en bureaus, vanuit Noord-Holland.",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Heiloo",
        addressRegion: "Noord-Holland",
        addressCountry: "NL",
      },
      areaServed: "Noord-Holland",
      knowsAbout: [
        "Webdesign",
        "UX/UI design",
        "Webdevelopment",
        "Branding",
        "Logo-ontwerp",
        "SEO",
        "Conversie-optimalisatie",
      ],
      founder: { "@id": TIM_ID },
      sameAs: SOCIALS,
    },
    {
      "@type": "Person",
      "@id": TIM_ID,
      name: "Tim Disseldorp",
      jobTitle: "Digitale Product Designer",
      worksFor: { "@id": BEDRIJF_ID },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Hogeschool van Amsterdam",
      },
      sameAs: SOCIALS,
    },
  ],
};

export const voorAiPagina = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/voor-ai/#webpage`,
  url: `${SITE_URL}/voor-ai/`,
  name: "Alles over DisselDesign",
  inLanguage: "nl-NL",
  dateModified: "2026-10-14",
  about: { "@id": BEDRIJF_ID },
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "DisselDesign",
  },
};
