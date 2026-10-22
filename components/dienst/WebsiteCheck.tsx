"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { contact, site } from "@/lib/content";
import { meet } from "@/lib/meten";
import { cn } from "@/lib/cn";
import { Field } from "@/components/ContactForm";

/** Termijn waarbinnen Tim de drie verbeterpunten terugstuurt. */
const TERMIJN = "3 werkdagen";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const schoon = (v: string, max: number) => v.replace(/<[^>]*>/g, "").trim().slice(0, max);
const metProtocol = (v: string) => (!v || /^https?:\/\//i.test(v) ? v : `https://${v}`);

type Fouten = { name?: string; email?: string; website?: string };

/**
 * De gratis websitecheck op /website-verbeteren/: iemand vult zijn site in,
 * Tim stuurt binnen 3 werkdagen drie verbeterpunten terug (handwerk, geen
 * scanner). Verzending zoals het contactformulier: Supabase (dienst
 * "Bestaande website verbeteren", pakket "websitecheck") en FormSubmit.
 */
export function WebsiteCheck() {
  const [waarden, setWaarden] = useState({ name: "", email: "", website: "", message: "" });
  const [fouten, setFouten] = useState<Fouten>({});
  const [gecontroleerd, setGecontroleerd] = useState(false);
  const [status, setStatus] = useState<"idle" | "bezig" | "klaar" | "fout">("idle");
  const bezig = useRef(false);

  const valideer = (w: typeof waarden): Fouten => ({
    name: w.name.trim() ? undefined : "Vul je naam in.",
    email: EMAIL_RE.test(w.email.trim()) ? undefined : "Vul een geldig e-mailadres in.",
    website: w.website.trim() ? undefined : "Vul het adres van je website in.",
  });

  function zet(veld: keyof typeof waarden, v: string) {
    const nieuw = { ...waarden, [veld]: v };
    setWaarden(nieuw);
    if (gecontroleerd) setFouten(valideer(nieuw));
  }

  async function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bezig.current) return;
    const honey = (e.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null)?.value;
    if (honey) return;
    const f = valideer(waarden);
    setGecontroleerd(true);
    setFouten(f);
    if (f.name || f.email || f.website) {
      document.getElementById(f.name ? "check-name" : f.email ? "check-email" : "check-website")?.focus();
      return;
    }
    bezig.current = true;
    setStatus("bezig");

    const data = {
      name: schoon(waarden.name, 100),
      email: schoon(waarden.email, 320),
      website: metProtocol(schoon(waarden.website, 200)).slice(0, 200),
      message: schoon(waarden.message, 2000),
      pagina: window.location.pathname,
    };

    const naarSupabase = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const { error } = await createClient().from("contact_submissions").insert({
          name: data.name,
          email: data.email,
          services: ["Bestaande website verbeteren"],
          website: data.website,
          message: data.message || null,
          pakket: "websitecheck",
          page_path: data.pagina,
        });
        return !error;
      } catch {
        return false;
      }
    };
    const naarMail = async () => {
      try {
        const body = new URLSearchParams();
        body.set("Naam", data.name);
        body.set("E-mailadres", data.email);
        body.set("Website", data.website);
        if (data.message) body.set("Waar loop je tegenaan?", data.message);
        body.set("Aanvraag", "Gratis websitecheck");
        body.set("_subject", `Gratis websitecheck: ${data.website} (${data.name})`);
        body.set("_replyto", data.email);
        body.set("_template", "table");
        body.set("_captcha", "false");
        const res = await fetch(contact.endpoint, { method: "POST", headers: { Accept: "application/json" }, body });
        const json = (await res.json().catch(() => ({}))) as { success?: string };
        return res.ok && json.success === "true";
      } catch {
        return false;
      }
    };

    const [opgeslagen, gemaild] = await Promise.all([naarSupabase(), naarMail()]);
    bezig.current = false;
    if (opgeslagen || gemaild) {
      setStatus("klaar");
      meet({
        naam: "generate_lead",
        params: { page_path: data.pagina, diensten: "Bestaande website verbeteren", pakket: "websitecheck" },
      });
    } else {
      setStatus("fout");
    }
  }

  if (status === "klaar") {
    return (
      <div role="status" className="flex flex-col items-start gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check size={24} strokeWidth={2.5} aria-hidden />
        </span>
        <p className="font-heading text-xl font-semibold text-white">Bedankt, je check is aangevraagd.</p>
        <p className="text-white/70">Binnen {TERMIJN} krijg je drie verbeterpunten in je mail.</p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} noValidate className="space-y-5">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="check-name"
          name="name"
          label="Naam"
          required
          value={waarden.name}
          onChange={(v) => zet("name", v)}
          error={fouten.name}
          placeholder="Je naam"
          autoComplete="name"
          maxLength={100}
        />
        <Field
          id="check-email"
          name="email"
          label="E-mailadres"
          required
          type="email"
          inputMode="email"
          value={waarden.email}
          onChange={(v) => zet("email", v)}
          error={fouten.email}
          placeholder="jij@bedrijf.nl"
          autoComplete="email"
          maxLength={320}
        />
      </div>
      <Field
        id="check-website"
        name="website"
        label="Je website"
        required
        inputMode="url"
        value={waarden.website}
        onChange={(v) => zet("website", v)}
        error={fouten.website}
        placeholder="jouwwebsite.nl"
        autoComplete="url"
        maxLength={200}
      />
      <Field
        id="check-message"
        name="message"
        label="Waar loop je tegenaan?"
        optional
        value={waarden.message}
        onChange={(v) => zet("message", v)}
        placeholder="Bijvoorbeeld: er komen weinig aanvragen binnen, of de site is traag."
        maxLength={2000}
      />
      <div role="status" aria-live="polite">
        {status === "fout" && (
          <p className="flex items-start gap-1.5 text-sm text-red-400">
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              Er ging iets mis bij het versturen. Probeer het opnieuw of mail naar{" "}
              <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
                {site.email}
              </a>
              .
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col items-stretch gap-2 sm:items-start">
        <button
          type="submit"
          disabled={status === "bezig"}
          aria-busy={status === "bezig" || undefined}
          className={cn(
            "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-ink shadow-glow transition-[background-color,opacity] duration-200 sm:w-auto",
            "hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-70"
          )}
        >
          {status === "bezig" ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              <span>Versturen…</span>
            </>
          ) : (
            <>
              <span>Vraag de gratis check aan</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </>
          )}
        </button>
        <p className="text-center text-xs text-white/60 sm:text-left">
          Gratis · Binnen {TERMIJN} in je mail · Je zit nergens aan vast
        </p>
      </div>
    </form>
  );
}
