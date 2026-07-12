"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Container } from "./ui/Container";
import { Logo } from "./Logo";

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
        scrolled
          ? "glass border-b border-black/[0.06]"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#top"
          aria-label="DisselDesign — naar boven"
          className={cn(
            "inline-flex items-center rounded transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25",
            scrolled ? "text-ink" : "text-white"
          )}
        >
          <Logo className="h-[42px] w-auto md:h-12" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-ink-muted hover:text-ink"
                  : "text-white/70 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={cn(
              "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-all",
              scrolled
                ? "bg-primary text-white hover:bg-primary-600"
                : "border border-white/30 text-white hover:border-white/70 hover:bg-white/5"
            )}
          >
            Let&apos;s talk
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden",
            scrolled
              ? "text-ink hover:bg-black/5"
              : "text-white hover:bg-white/10"
          )}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <div className="glass border-t border-black/[0.06] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-black/5 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-white"
            >
              Let&apos;s talk
            </a>
          </Container>
        </div>
      )}
    </motion.header>
  );
}
