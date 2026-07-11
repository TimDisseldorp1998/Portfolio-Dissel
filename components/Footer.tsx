"use client";

import { nav, site, socials } from "@/lib/content";
import { Container } from "./ui/Container";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";

const brandIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

export function Footer() {
  return (
    <footer className="relative border-t border-black/[0.06] bg-surface-alt">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a
            href="#top"
            className="font-heading text-lg font-semibold tracking-tight"
          >
            {site.shortName}
            <span className="text-primary">.</span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {site.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
              Navigate
            </p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
              Say hello
            </p>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-black/[0.06]">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-1">
            {socials.map((s) => {
              const Icon = brandIcons[s.icon];
              if (!Icon) return null;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-all hover:bg-black/[0.04] hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </Container>
      </div>
    </footer>
  );
}
