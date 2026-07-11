"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { contact, site, socials } from "@/lib/content";
import { Section } from "./ui/Section";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "sent" | "error";

const brandIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots often fill hidden fields
    if (data.get("_honey")) {
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const payload = {
      name: (data.get("name") as string) || "—",
      email: data.get("email") as string,
      project_type:
        (data.get("project_type") as string) || "Niet gespecificeerd",
      message: data.get("message") as string,
      _subject: `Nieuw bericht via portfolio — ${
        (data.get("project_type") as string) || "algemeen"
      }`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const res = await fetch(contact.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: string;
        message?: string;
      };
      if (!res.ok || json.success !== "true") {
        throw new Error(json.message || "Er ging iets mis. Probeer opnieuw.");
      }
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer opnieuw."
      );
    }
  }

  const isSubmitting = status === "submitting";

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
                Werk je aan iets interessants, of wil je gewoon even hi zeggen?
                Ik hoor het graag.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                <a
                  href={`tel:${site.phone}`}
                  className="group inline-flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <Phone size={16} className="text-primary" />
                  <span>{site.phoneDisplay}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              <div className="mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                  Elsewhere
                </p>
                <div className="flex gap-2">
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
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-glow"
                      >
                        <Icon size={18} />
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
                noValidate
              >
                {/* Honeypot — hidden from users, visible to bots */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    required={false}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@domain.com"
                    required
                  />
                </div>

                <div className="mt-5">
                  <SelectField
                    label="Project type"
                    name="project_type"
                    options={contact.projectTypes}
                  />
                </div>

                <div className="mt-5">
                  <Field
                    as="textarea"
                    label="Message"
                    name="message"
                    placeholder="Vertel me kort waar je mee bezig bent…"
                    rows={5}
                    required
                  />
                </div>

                <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs">
                    {status === "error" ? (
                      <p className="text-red-600" role="alert">
                        {errorMessage}
                      </p>
                    ) : status === "sent" ? (
                      <p className="text-emerald-600">
                        Bedankt — ik hoor je binnen een dag of twee terug.
                      </p>
                    ) : (
                      <p className="text-ink-soft">
                        Ik reageer meestal binnen een dag of twee.
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white shadow-glow transition-all duration-200",
                      "hover:-translate-y-0.5 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:hover:translate-y-0"
                    )}
                  >
                    {status === "sent"
                      ? "Verstuurd — talk soon"
                      : isSubmitting
                      ? "Bezig met versturen…"
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
  required?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  rows,
  as = "input",
  required = false,
}: FieldProps) {
  const base =
    "block w-full rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
        {label}
        {required && <span className="text-primary">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={cn(base, "resize-none")}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

function SelectField({ label, name, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          className="block w-full appearance-none rounded-xl border border-black/[0.08] bg-white/60 px-4 py-3 pr-10 text-sm text-ink transition-all duration-200 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
        >
          {options.map((opt) => (
            <option key={opt.label} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft"
          aria-hidden
        />
      </div>
    </label>
  );
}
