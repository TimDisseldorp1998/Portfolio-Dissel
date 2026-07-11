"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { site, socials } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/cn";
import {
  Twitter,
  Github,
  Linkedin,
  Dribbble,
  type LucideIcon,
} from "lucide-react";

const socialIcons: Record<string, LucideIcon> = {
  Twitter,
  Github,
  Linkedin,
  Dribbble,
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Placeholder handler — swap for your real endpoint.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 3200);
  }

  return (
    <Section id="contact" variant="light" className="pb-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Contact
              </p>
              <h2 className="mb-6 font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Let&apos;s make something{" "}
                <span className="text-gradient">memorable</span>.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-ink-muted">
                Working on something exciting, or just want to say hi? I&apos;d
                love to hear from you.
              </p>

              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Mail size={16} className="text-primary" />
                <span>{site.email}</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <div className="mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                  Elsewhere
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.icon] ?? Mail;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-glow"
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Your name" />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@domain.com"
                  />
                </div>
                <div className="mt-5">
                  <Field
                    as="textarea"
                    label="Message"
                    name="message"
                    placeholder="Tell me a little about what you have in mind…"
                    rows={5}
                  />
                </div>

                <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-soft">
                    Typical reply within a day or two.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white shadow-glow transition-all duration-200",
                      "hover:-translate-y-0.5 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60"
                    )}
                  >
                    {status === "sent"
                      ? "Sent — talk soon"
                      : status === "submitting"
                      ? "Sending…"
                      : "Send message"}
                    {status === "idle" && <ArrowRight size={16} />}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  as?: "input" | "textarea";
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  rows,
  as = "input",
}: FieldProps) {
  const base =
    "block w-full rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          required
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required
          className={base}
        />
      )}
    </label>
  );
}
