"use client";

import { nav, site, socials } from "@/lib/content";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";

const brandIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

const footerNav = [...nav, { label: "Contact", href: "#contact" }];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-surface-dark text-white">
      <Container className="grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-3 md:gap-6">
        {/* Logo — left */}
        <a
          href="#top"
          aria-label="DisselDesign — naar boven"
          className="justify-self-center rounded text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 md:justify-self-start"
        >
          <Logo className="h-11 w-auto" />
        </a>

        {/* Nav — center */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerNav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials — right */}
        <div className="flex items-center justify-center gap-2 md:justify-self-end">
          {socials.map((s) => {
            const Icon = brandIcons[s.icon];
            if (!Icon) return null;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${s.label} — opent in nieuw tabblad`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>
      </Container>

      {/* Copyright — centered below */}
      <Container className="pb-10">
        <p className="text-center text-xs text-white/45">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
          Designed &amp; built by {site.name}.
        </p>
      </Container>
    </footer>
  );
}
