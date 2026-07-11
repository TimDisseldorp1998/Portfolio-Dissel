/**
 * All personal content lives here.
 * Update your name, tagline, projects, experience, and links in this file.
 */

export const site = {
  name: "Tim Disseldorp",
  shortName: "Tim",
  role: "Designer & Developer",
  location: "Amsterdam, NL",
  email: "info@disseldesign.nl",
  tagline:
    "I design and build calm, considered digital products — where craft meets clarity.",
  hero: {
    eyebrow: "Portfolio · 2026",
    headline: "Hi, ik ben Tim creatieve digitale product designer",
    subtitle:
      "I'm a designer and developer crafting premium products with a focus on typography, motion, and detail.",
    primaryCta: { label: "See my work", href: "#work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
    greeting: "Hey there!",
    line1: "Mijn naam is Tim Disseldorp.",
    line2: "Grab my email, and get in touch.",
  },
  slider: [
    { label: "Studio", gradient: "from-primary/70 via-primary-400/50 to-secondary/60" },
    { label: "Op reis", gradient: "from-secondary/70 via-primary/40 to-primary-700" },
    { label: "Werkplek", gradient: "from-primary-400 via-secondary/50 to-primary/70" },
    { label: "Side project", gradient: "from-primary-700 via-primary to-secondary/60" },
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

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  accent: "primary" | "secondary" | "mix";
};

export const projects: Project[] = [
  {
    title: "Northwind Studio",
    description:
      "A brand & product refresh for a design studio — identity, site, and product surfaces.",
    tags: ["Branding", "Web", "Motion"],
    href: "#",
    accent: "primary",
  },
  {
    title: "Lumen Health",
    description:
      "Consumer health platform — end-to-end design and front-end architecture.",
    tags: ["Product", "React", "Design System"],
    href: "#",
    accent: "secondary",
  },
  {
    title: "Aperture OS",
    description:
      "Marketing site and product dashboard for a developer-tools startup.",
    tags: ["Next.js", "Marketing", "Dashboard"],
    href: "#",
    accent: "mix",
  },
  {
    title: "Field Notes",
    description:
      "A minimal writing app for research teams. Real-time editing, offline-first.",
    tags: ["App", "SaaS", "Realtime"],
    href: "#",
    accent: "primary",
  },
  {
    title: "Kiln Coffee",
    description:
      "E-commerce experience for a specialty roaster, focused on story and craft.",
    tags: ["E-commerce", "Shopify", "Brand"],
    href: "#",
    accent: "secondary",
  },
  {
    title: "Orbit Analytics",
    description:
      "Data visualization surfaces for a growth analytics platform.",
    tags: ["Data Viz", "Product", "TypeScript"],
    href: "#",
    accent: "mix",
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
 * to info@disseldesign.nl — click the link in that email to activate the endpoint,
 * after that every submission lands directly in your inbox.
 */
export const contact = {
  endpoint: "https://formsubmit.co/ajax/info@disseldesign.nl",
  projectTypes: [
    { value: "", label: "Waar kan ik je mee helpen?" },
    { value: "Website / landing page", label: "Website / landing page" },
    { value: "Product / app design", label: "Product / app design" },
    { value: "Web app / SaaS", label: "Web app / SaaS" },
    { value: "Mobile app", label: "Mobile app" },
    { value: "Brand & identity", label: "Brand & identity" },
    { value: "UX audit / consulting", label: "UX audit / consulting" },
    { value: "Anders", label: "Iets anders" },
  ],
};
