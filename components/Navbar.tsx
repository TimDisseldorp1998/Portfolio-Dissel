"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

/**
 * Dark-mode header: fully transparent over the hero, then softly darkens
 * with a subtle blur when scrolled — same treatment on desktop and mobile.
 * All text stays white throughout so nothing has to shift color between
 * states, which was jarring against the mostly-dark site chrome.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-dark border-b border-white/10" : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#top"
          aria-label="DisselDesign — naar boven"
          className="inline-flex items-center rounded text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
        >
          <Logo className="h-[42px] w-auto md:h-12" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-full border border-white/25 px-4 text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/[0.06]"
          >
            Let&apos;s talk
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <div className="glass-dark border-t border-white/10 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full border border-white/25 px-4 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/[0.06]"
            >
              Let&apos;s talk
            </a>
          </Container>
        </div>
      )}
    </motion.header>
  );
}
