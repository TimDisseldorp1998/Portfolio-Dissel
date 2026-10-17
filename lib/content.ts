/**
 * All personal content lives here.
 * Update your name, tagline, projects, experience, and links in this file.
 */

export const site = {
  name: "Tim Disseldorp",
  shortName: "Tim",
  role: "Digitale Product Designer",
  location: "Amsterdam, NL",
  email: "info@disseldesign.com",
  // Wordt getoond in de privacyverklaring (AVG: identiteit van de
  // verwerkingsverantwoordelijke). Leeg laten = regel valt weg.
  kvk: "94838852",
  tagline:
    "I design and build calm, considered digital products — where craft meets clarity.",
  hero: {
    eyebrow: "Gevestigd in Noord-Holland",
    // The headline ends with a rotating tail that types in/out (see Typewriter).
    // The first phrase is what renders server-side (SEO + no-JS fallback).
    headlinePrefix: "Digitale Product Designer",
    // "voor" is vaste tekst (wordt niet steeds opnieuw getypt); alleen de
    // woorden erna roteren via de Typewriter.
    headlineConnector: "voor",
    headlineRotating: [
      "lokale ondernemers",
      "regionale bedrijven",
    ],
    subtitle:
      "Ik ontwerp en bouw websites voor lokale ondernemers, van huisstijl tot live site. Strak design, snel opgeleverd, zonder gedoe.",
    // Contact is the primary (filled) action; work is the secondary (ghost) one.
    // The contact CTA targets the form anchor directly so the form lands in view.
    contactCta: { label: "Plan een kennismaking", href: "#contact-form" },
    workCta: { label: "Bekijk mijn werk", href: "#work" },
    /**
     * Client logo strip under the hero CTAs. SVGs live in /public/logos/
     * (all white/monochrome, so they sit muted on the dark hero).
     * `size` tweaks per-logo height so the marks are optically balanced.
     */
    trustedBy: {
      label: "Merken waar ik de afgelopen jaren aan werkte",
      logos: [
        // `w`/`h` zijn de intrinsieke maten uit de SVG's. Ze staan als
        // width/height op de <img> zodat de browser de verhouding kent en de
        // rij niet verspringt tijdens het laden; de zichtbare hoogte blijft
        // via `size` geregeld.
        { src: "/logos/ziggodome-logo.svg", alt: "Ziggo Dome", size: "h-10 sm:h-11", w: 242, h: 242 },
        { src: "/logos/new-edition-logo.svg", alt: "New Edition", size: "h-7 sm:h-8", w: 160, h: 77 },
        { src: "/logos/dtx-logo.svg", alt: "DTX", size: "h-8 sm:h-9", w: 120, h: 90 },
        { src: "/logos/1608-logo.svg", alt: "1608", size: "h-5 sm:h-6", w: 160, h: 55 },
      ],
    },
  },
};

/**
 * Klantreviews. Ze staan in een eigen sectie direct na het werk, allebei
 * tegelijk zichtbaar en zonder rotatie: bewijs overtuigt pas nadat iemand de
 * cases heeft gezien. Voeg hier een review toe en hij verschijnt vanzelf.
 */
export type Review = {
  quote: string;
  /** De persoon die het zei. Laat hem weg als je alleen het bedrijf hebt: de
   *  kaart toont dan de bedrijfsnaam met het logo ernaast. */
  author?: string;
  role?: string;
  /** Valt terug in beeld als het ronde logo ontbreekt of niet laadt. */
  initials?: string;
  /** Bedrijfsnaam. Nodig zodra `author` ontbreekt. */
  company?: string;
  logo?: string;
  /** Slug van de case waar deze review als quote op staat (content/werk/). */
  case?: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Super blij met de stijl van de website, precies zoals we het in ons hoofd hadden. Erg fijne samenwerking gehad en we hebben inmiddels de eerste oppasdiensten via het platform lopen.",
    author: "Madelief",
    role: "Founder de Kleintjes van Alkmaar",
    initials: "K",
    logo: "/logos/kleintjes-van-alkmaar-logo.png",
    case: "kleintjes-van-alkmaar",
  },
  {
    quote:
      "Vanuit alleen een logo en paar kleuren, en snel geschakeld met Tim. De website ziet er professioneel en modern uit en werkt top.",
    author: "Sjoerd Avis",
    role: "Founder De-Stock.nl",
    initials: "D",
    logo: "/logos/de-stock-logo.png",
    case: "de-stock",
  },
  // Geen naam beschikbaar, alleen het bedrijf. De kaart toont daarom de
  // bedrijfsnaam met het wordmark ernaast in plaats van een persoon.
  {
    quote:
      "Reserveringen komen nu binnen zonder dat wij er iets voor hoeven doen. Dat scheelt ons uren per week en gasten bellen niet meer voor de openingstijden.",
    company: "Marktzicht Eten & Drinken",
    logo: "/logos/marktzicht-logo.svg",
    case: "marktzicht",
  },
];


export const about = {
  paragraph:
    "I've spent the last decade at the intersection of design and engineering — leading product teams, shipping interfaces, and obsessing over the small details that make software feel considered. Currently freelancing on a handful of thoughtful projects.",
  details: [
    {
      title: "Design",
      body: "Systems thinking, typography, motion, and interaction — with taste.",
    },
    {
      title: "Engineering",
      body: "Modern web stacks: React, Next.js, TypeScript, and everything around them.",
    },
    {
      title: "Product",
      body: "From zero-to-one prototypes to mature systems used by millions.",
    },
  ],
};

/**
 * Bento content — replaces the plain About with a data-rich grid.
 * Placeholder images live in /public/bento/* (swap them for real ones).
 */
export const bento = {
  intro: {
    title:
      "Creatieve Digitale Product Designer met een oog voor detail. Ik ontwerp en bouw producten die net zo goed presteren als ze eruitzien.",
  },
  background: {
    paragraphs: [
      "Ik ben Tim Disseldorp, Digitale Product Designer. Alweer 6+ jaar ervaring en sinds 2024 voor mezelf begonnen. Daarnaast actief bij een e-commercebureau in Alkmaar. Disseldesign is geen team, geen manager, geen doorgeefluik. Je praat met de persoon die het ook daadwerkelijk maakt. Sprintklusjes binnen een week, marathonprojecten in twee tot vier weken. Nooit half af.",
      "Ik ontwerp websites voor lokale ondernemers en regionale bedrijven. Maar eerlijk: iedereen is welkom, van eenmanszaak tot groot merk. Ik ontwierp de website van de Ziggo Dome, die van de kapper om de hoek en hielp een vriend met zijn retailbedrijf. Dezelfde vragen, dezelfde tests, dezelfde tijd en aandacht.",
      "Zin in een koffie en wil je praten over je ambitie? Ik reageer ook op zondagavond. 😉",
    ],
  },
  portrait: {
    // Chat-style messages that animate in one by one, hold, then clear.
    messages: [
      "Hoi daar! 👋",
      "Mijn naam is Tim Disseldorp.",
      "Stuur me gerust een berichtje!",
    ],
  },
  // Slider photos live in /public/bento/*.webp (1200×900). label + number
  // only show on hover, over a soft gradient.
  slider: [
    { label: "Start", src: "/bento/start.webp", alt: "Tim met het KvK-boekje 'Hoera, een eigen bedrijf'" },
    { label: "Focus", src: "/bento/focus.webp", alt: "Tim aan het werk achter zijn scherm" },
    { label: "Avontuur", src: "/bento/avontuur.webp", alt: "Tim bij het meer van Bled in Slovenië" },
    { label: "Werkplek", src: "/bento/werkplek.webp", alt: "Tim's werkplek met dubbele monitoren" },
  ],
  education: [
    { period: "2018 — 2022", type: "Bachelor", degree: "Communicatie en Multimedia Design", school: "Hogeschool van Amsterdam" },
    { period: "2021 — 2021", type: "Minor", degree: "Visueel Interface Design", school: "Hogeschool van Amsterdam" },
    { period: "2014 — 2017", type: "", degree: "Havo diploma (VAVO)", school: "R.O.C. Horizon College" },
    { period: "2010 — 2014", type: "", degree: "Mavo diploma", school: "Jac. P. Thijsse College" },
  ],
  // Toolstack — voeg een tool toe of haal er een weg door hier een regel te
  // wijzigen. `icon` verwijst naar een bestand in /public/icons/.
  tools: [
    { name: "Figma", icon: "/icons/figma.png" },
    { name: "Photoshop", icon: "/icons/photoshop.png" },
    { name: "Illustrator", icon: "/icons/illustrator.png" },
    { name: "Adobe", icon: "/icons/adobe.png" },
    { name: "Miro", icon: "/icons/miro.png" },
    { name: "Notion", icon: "/icons/notion.png" },
    { name: "Claude", icon: "/icons/claude.png" },
    { name: "ChatGPT", icon: "/icons/chatgpt.png" },
    { name: "Google Analytics", icon: "/icons/analytics.png" },
    { name: "Hotjar", icon: "/icons/hotjar.png" },
    { name: "Google Tag Manager", icon: "/icons/google-tag-manager.png" },
    { name: "Spotify", icon: "/icons/spotify.png" },
  ],
};

// De cases staan sinds fase 1 elk in een eigen bestand: content/werk/*.mdx.
// Zie lib/werk.ts.

export const skills = [
  {
    title: "Product Design",
    body: "UX research, IA, wireframes, high-fidelity design, prototyping.",
    icon: "Sparkles",
  },
  {
    title: "Design Systems",
    body: "Token architectures, component libraries, documentation.",
    icon: "Layers",
  },
  {
    title: "Front-end Engineering",
    body: "React, Next.js, TypeScript, Tailwind, Framer Motion.",
    icon: "Code2",
  },
  {
    title: "Brand & Identity",
    body: "Logos, typography systems, and visual language.",
    icon: "Palette",
  },
  {
    title: "Motion",
    body: "Micro-interactions, scroll choreography, and product delight.",
    icon: "Wand2",
  },
  {
    title: "Prototyping",
    body: "From Figma flows to working code prototypes in days, not weeks.",
    icon: "Zap",
  },
];

export const experience = [
  {
    role: "UX & UI Designer",
    company: "ShopCommerce",
    period: "2024 — heden",
    location: "Alkmaar",
  },
  {
    role: "UX & UI Designer",
    company: "Touch Creative",
    period: "2023 — 2024",
    location: "Amsterdam",
  },
  {
    role: "Allround Designer",
    company: "yourdutchmedia",
    period: "2021 — 2023",
    location: "Zwaag, Hoorn",
  },
  {
    role: "UX Designer stage",
    company: "Brick Zero",
    period: "2020 — 2020",
    location: "Castricum",
  },
];

/**
 * `label` is de korte naam voor intern gebruik; `a11yLabel` is wat een
 * schermlezer voorleest. Die laatste moet op zichzelf te begrijpen zijn, want
 * gebruikers kunnen een lijst met alleen de links opvragen: "LinkedIn" zegt dan
 * niet van wie.
 */
export const socials = [
  {
    label: "LinkedIn",
    a11yLabel: "LinkedIn-profiel van Tim Disseldorp",
    href: "https://www.linkedin.com/in/timdisseldorp/",
    icon: "Linkedin",
  },
  {
    label: "Instagram",
    a11yLabel: "Instagram van Tim Disseldorp",
    href: "https://www.instagram.com/timdisseldorp/",
    icon: "Instagram",
  },
];

/**
 * Contact form — real submissions go to formsubmit.co and forward to `site.email`.
 * NOTE: the very first submission triggers a confirmation email from formsubmit.co
 * to info@disseldesign.com — click the link in that email to activate the endpoint,
 * after that every submission lands directly in your inbox.
 */
export const contact = {
  endpoint: "https://formsubmit.co/ajax/info@disseldesign.com",
  projectTypes: [
    { value: "Branding", label: "Branding" },
    { value: "Web design", label: "Web design" },
    { value: "Development", label: "Development" },
    { value: "Anders", label: "Anders" },
  ],
};
