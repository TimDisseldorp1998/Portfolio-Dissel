/**
 * All personal content lives here.
 * Update your name, tagline, projects, experience, and links in this file.
 */

export const site = {
  name: "Tim Disseldorp",
  shortName: "Tim",
  role: "UX Designer & Developer",
  location: "Amsterdam, NL",
  email: "info@disseldesign.com",
  tagline:
    "I design and build calm, considered digital products — where craft meets clarity.",
  hero: {
    eyebrow: "Freelance · Nederland",
    headline: "Product designer & developer voor ambitieuze merken.",
    subtitle:
      "Ik ontwerp en bouw conversiegerichte websites, web-apps en merkidentiteiten die je bedrijf laten groeien. Een strak design dat snel is opgeleverd zonder gedoe.",
    primaryCta: { label: "Bekijk mijn werk", href: "#work" },
    secondaryCta: { label: "Neem contact op", href: "#contact" },
    /**
     * Client logo strip under the hero CTAs. SVGs live in /public/logos/
     * (all white/monochrome, so they sit muted on the dark hero).
     * `size` tweaks per-logo height so the marks are optically balanced.
     */
    trustedBy: {
      label: "Vertrouwd door teams die echte producten bouwen:",
      logos: [
        { src: "/logos/1608-logo.svg", alt: "1608", size: "h-5 sm:h-6" },
        { src: "/logos/airforce-logo.svg", alt: "Airforce", size: "h-10 sm:h-11" },
        { src: "/logos/dtx-logo.svg", alt: "DTX", size: "h-7 sm:h-8" },
        { src: "/logos/new-edition-logo.svg", alt: "New Edition", size: "h-7 sm:h-8" },
        { src: "/logos/ziggodome-logo.svg", alt: "Ziggo Dome", size: "h-9 sm:h-10" },
      ],
    },
  },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
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
      "Creatieve digitale product designer met een oog voor detail — ik ontwerp en bouw producten die net zo goed presteren als ze eruitzien.",
    resumeHref: "#",
  },
  background: {
    paragraphs: [
      "Opgegroeid in Amsterdam, altijd al gefascineerd door de kruising tussen esthetiek en engineering — mijn vader was fotograaf, mijn moeder marketeer.",
      "Ik studeerde Interaction Design en spendeerde de laatste jaren tussen product-teams en freelance-projecten, altijd zoekend naar dat detail dat een interface écht laat resoneren.",
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
    { period: "2015 — 2019", degree: "BSc Interaction Design", school: "TU Delft" },
    { period: "2019 — 2021", degree: "MSc Digital Product Design", school: "Design Academy Eindhoven" },
    { period: "2022", degree: "UX Research Bootcamp", school: "Nielsen Norman Group" },
  ],
  tracks: [
    { title: "Midnight City", artist: "M83", color: "from-fuchsia-500 to-purple-600" },
    { title: "Redbone", artist: "Childish Gambino", color: "from-amber-500 to-red-600" },
    { title: "Nights", artist: "Frank Ocean", color: "from-sky-500 to-indigo-600" },
    { title: "Weightless", artist: "Marconi Union", color: "from-teal-400 to-emerald-600" },
  ],
  tools: [
    { label: "Fg", name: "Figma", gradient: "from-purple-500 via-pink-500 to-orange-500" },
    { label: "Ps", name: "Photoshop", gradient: "from-blue-900 to-cyan-500" },
    { label: "Ai", name: "Illustrator", gradient: "from-orange-500 to-yellow-400" },
    { label: "Fr", name: "Framer", gradient: "from-blue-500 to-indigo-600" },
    { label: "Nt", name: "Notion", gradient: "from-neutral-800 to-neutral-500" },
    { label: "Vs", name: "VS Code", gradient: "from-sky-500 to-blue-600" },
    { label: "Cs", name: "Cursor", gradient: "from-neutral-900 to-neutral-700" },
    { label: "Ln", name: "Linear", gradient: "from-fuchsia-500 to-purple-600" },
    { label: "Sp", name: "Spotify", gradient: "from-emerald-400 to-emerald-600" },
    { label: "Sl", name: "Slack", gradient: "from-pink-500 to-yellow-500" },
  ],
};

/**
 * Contribution bullets are split into `lead` (the action, rendered bold for
 * scannability) and `rest` — keep the lead to the first 3–5 words.
 */
export type ProjectDetail = {
  company: string;
  year: string;
  type: string;
  overview: string;
  contribution: { lead: string; rest: string }[];
  slides: { label: string; gradient: string }[];
  /** Award link (e.g. Awwwards). Omit for projects without honors. */
  award?: { label: string; href: string };
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  accent: "primary" | "secondary" | "mix";
  detail: ProjectDetail;
};

export const projects: Project[] = [
  {
    title: "Northwind Studio",
    description:
      "A brand & product refresh for a design studio — identity, site, and product surfaces.",
    tags: ["Branding", "Web", "Motion"],
    href: "#",
    accent: "primary",
    detail: {
      company: "Northwind",
      year: "2025",
      type: "Branding",
      overview:
        "A full brand and product refresh for a design studio — from a new identity system to the marketing site and product surfaces that carry it.",
      contribution: [
        {
          lead: "Led the identity redesign",
          rest: " across logo, typography, and a flexible color system that scales from print to product.",
        },
        {
          lead: "Designed and built",
          rest: " the new marketing site in Next.js with a motion language that echoes the brand.",
        },
        {
          lead: "Documented the design system",
          rest: " so the in-house team could extend it without agency support.",
        },
      ],
      slides: [
        { label: "Identity", gradient: "from-primary/70 via-primary-700/50 to-[#8E5CE0]/60" },
        { label: "Website", gradient: "from-[#8E5CE0]/60 via-primary/40 to-primary-800" },
        { label: "Product UI", gradient: "from-primary-400/60 via-[#8E5CE0]/40 to-primary-900" },
      ],
      award: { label: "Awwwards Honors", href: "https://www.awwwards.com/" },
    },
  },
  {
    title: "Lumen Health",
    description:
      "Consumer health platform — end-to-end design and front-end architecture.",
    tags: ["Product", "React", "Design System"],
    href: "#",
    accent: "secondary",
    detail: {
      company: "Lumen Health",
      year: "2024",
      type: "Mobile",
      overview:
        "An end-to-end consumer health platform: appointment booking, medication tracking, and care-team chat in one calm, accessible app.",
      contribution: [
        {
          lead: "Partnered with the care team",
          rest: " to map the patient journey and cut the booking flow from nine steps to four.",
        },
        {
          lead: "Owned the design system",
          rest: " — tokens, components, and accessibility patterns used across iOS, Android, and web.",
        },
        {
          lead: "Prototyped and user-tested",
          rest: " the medication reminders feature with 24 patients across three rounds.",
        },
      ],
      slides: [
        { label: "Onboarding", gradient: "from-secondary/70 via-secondary-700/50 to-primary-900" },
        { label: "Booking flow", gradient: "from-secondary-400/60 via-secondary/40 to-[#8E5CE0]/50" },
        { label: "Care chat", gradient: "from-primary/50 via-secondary/50 to-secondary-800" },
      ],
    },
  },
  {
    title: "Aperture OS",
    description:
      "Marketing site and product dashboard for a developer-tools startup.",
    tags: ["Next.js", "Marketing", "Dashboard"],
    href: "#",
    accent: "mix",
    detail: {
      company: "Aperture",
      year: "2024",
      type: "Web",
      overview:
        "Marketing site and product dashboard for a developer-tools startup — one visual language from the first landing-page visit to daily dashboard use.",
      contribution: [
        {
          lead: "Designed the marketing site",
          rest: " with a component library shared 1:1 with the product dashboard.",
        },
        {
          lead: "Built interactive demos",
          rest: " that let visitors try the core product without signing up.",
        },
        {
          lead: "Improved dashboard information density",
          rest: " based on session recordings and power-user interviews.",
        },
      ],
      slides: [
        { label: "Landing", gradient: "from-primary/60 via-[#8E5CE0]/50 to-secondary/50" },
        { label: "Dashboard", gradient: "from-primary-800 via-primary/40 to-secondary/40" },
        { label: "Docs", gradient: "from-[#8E5CE0]/50 via-primary-700/40 to-primary/60" },
      ],
      award: { label: "Awwwards Honors", href: "https://www.awwwards.com/" },
    },
  },
  {
    title: "Field Notes",
    description:
      "A minimal writing app for research teams. Real-time editing, offline-first.",
    tags: ["App", "SaaS", "Realtime"],
    href: "#",
    accent: "primary",
    detail: {
      company: "Field Notes",
      year: "2023",
      type: "SaaS",
      overview:
        "A minimal, offline-first writing app for research teams — real-time collaboration without the visual noise of a full document suite.",
      contribution: [
        {
          lead: "Defined the product principles",
          rest: " with the founders: calm by default, keyboard-first, zero modal dialogs.",
        },
        {
          lead: "Designed the editor experience",
          rest: " including presence, comments, and conflict-free offline merging.",
        },
      ],
      slides: [
        { label: "Editor", gradient: "from-primary/60 via-primary-800 to-[#8E5CE0]/40" },
        { label: "Presence", gradient: "from-primary-400/50 via-primary/30 to-primary-900" },
      ],
    },
  },
  {
    title: "Kiln Coffee",
    description:
      "E-commerce experience for a specialty roaster, focused on story and craft.",
    tags: ["E-commerce", "Shopify", "Brand"],
    href: "#",
    accent: "secondary",
    detail: {
      company: "Kiln",
      year: "2023",
      type: "E-commerce",
      overview:
        "A storytelling-first e-commerce experience for a specialty roaster — every bag of beans gets the origin story it deserves.",
      contribution: [
        {
          lead: "Reworked the product pages",
          rest: " around origin stories, brewing guides, and tasting notes instead of specs.",
        },
        {
          lead: "Designed a subscription flow",
          rest: " that lifted repeat purchases by 28% in the first quarter.",
        },
      ],
      slides: [
        { label: "Product page", gradient: "from-secondary/70 via-secondary-800 to-primary-900" },
        { label: "Subscription", gradient: "from-secondary-400/60 via-secondary/30 to-[#8E5CE0]/40" },
      ],
    },
  },
  {
    title: "Orbit Analytics",
    description:
      "Data visualization surfaces for a growth analytics platform.",
    tags: ["Data Viz", "Product", "TypeScript"],
    href: "#",
    accent: "mix",
    detail: {
      company: "Orbit",
      year: "2022",
      type: "Web",
      overview:
        "Data-visualization surfaces for a growth analytics platform — dashboards that surface the story in the numbers, not just the numbers.",
      contribution: [
        {
          lead: "Designed the charting language",
          rest: " — a consistent visual grammar for twelve chart types across the product.",
        },
        {
          lead: "Paired with engineers",
          rest: " to build a TypeScript chart kit with theming and reduced-motion support.",
        },
      ],
      slides: [
        { label: "Dashboards", gradient: "from-primary/50 via-[#8E5CE0]/40 to-secondary/50" },
        { label: "Chart kit", gradient: "from-secondary/50 via-primary-700/40 to-primary/50" },
      ],
    },
  },
];

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
    role: "Senior Product Designer",
    company: "Northwind",
    period: "2023 — Present",
    body: "Leading product design across the platform. Building a scalable design system and shipping high-impact features.",
  },
  {
    role: "Design Engineer",
    company: "Lumen Health",
    period: "2020 — 2023",
    body: "Bridged design and engineering. Owned the front-end architecture and prototyped upcoming product surfaces.",
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    period: "2017 — 2020",
    body: "Worked with startups on brand, product, and marketing — from zero-to-one launches to design system rebuilds.",
  },
  {
    role: "Product Design Intern",
    company: "Aperture",
    period: "2016 — 2017",
    body: "Contributed to the design system, marketing site, and first version of the product dashboard.",
  },
];

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/timdisseldorp/",
    icon: "Linkedin",
  },
  {
    label: "Instagram",
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
