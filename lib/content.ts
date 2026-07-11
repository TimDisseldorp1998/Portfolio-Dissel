/**
 * All personal content lives here.
 * Update your name, tagline, projects, experience, and links in this file.
 */

export const site = {
  name: "Tim Disseldorp",
  shortName: "Tim",
  role: "Designer & Developer",
  location: "Amsterdam, NL",
  email: "hello@example.com",
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
  { label: "Experience", href: "#experience" },
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
  { label: "Twitter", href: "https://twitter.com/", icon: "Twitter" },
  { label: "GitHub", href: "https://github.com/", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "Linkedin" },
  { label: "Dribbble", href: "https://dribbble.com/", icon: "Dribbble" },
];
