"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { usePresence } from "@/lib/usePresence";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  contact,
  diensten as alleDiensten,
  pakketten,
  site,
  voorafInvullen,
  type Dienst,
} from "@/lib/content";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { cn } from "@/lib/cn";
import { meet } from "@/lib/meten";

type Status = "idle" | "submitting" | "sent" | "error";
type Veld = "name" | "company" | "email" | "phone" | "website" | "message";
type Errors = { name?: string; email?: string; diensten?: string };

/** Bewust simpel: iets voor de @, en een punt in het domein. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Maximale lengtes, gelijk aan de insert-policy in Supabase. */
const MAX: Record<Veld, number> = {
  name: 100,
  company: 100,
  email: 320,
  phone: 30,
  website: 200,
  message: 2000,
};

const VERBETEREN: Dienst = "Bestaande website verbeteren";

const valideer = {
  name: (v: string) => (v.trim() ? undefined : "Vul je naam in."),
  email: (v: string) => (EMAIL_RE.test(v.trim()) ? undefined : "Vul een geldig e-mailadres in."),
  diensten: (d: Dienst[]) => (d.length ? undefined : "Selecteer minimaal één dienst."),
};

/** Haalt HTML-tags weg en knipt af op de maximale lengte. */
const schoon = (v: string, max: number) => v.replace(/<[^>]*>/g, "").trim().slice(0, max);

/** "jouwwebsite.nl" mag; bij versturen komt er https:// voor. */
const metProtocol = (v: string) => (!v || /^https?:\/\//i.test(v) ? v : `https://${v}`);

const leeg = { name: "", company: "", email: "", phone: "", website: "", message: "" };

/**
 * Het contactformulier, op home (in de contactsectie) en op /contact/.
 * Eén component op twee plekken: een wijziging hier geldt voor allebei.
 * `id="contact-form"` staat op de buitenste div, zodat /#contact-form en de
 * knoppen die daarheen wijzen blijven werken.
 *
 * Verzenden gaat via twee kanalen tegelijk: Supabase (de database; de
 * insert-policy daar valideert lengtes en de dienstenlijst) en FormSubmit
 * (de e-mail). Lukt er één, dan is de aanvraag binnen.
 */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  // Pas na de eerste verzendpoging controleert een veld zichzelf bij elke
  // wijziging; daarvoor geen meldingen terwijl iemand nog typt.
  const [gecontroleerd, setGecontroleerd] = useState(false);
  const [values, setValues] = useState(leeg);
  const [gekozen, setGekozen] = useState<Dienst[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bezigRef = useRef(false);
  const pakketRef = useRef<string | null>(null);
  const toonWebsite = gekozen.includes(VERBETEREN);

  // Vooraf invullen vanuit de prijzen op home (?pakket=…). Eigen tekst en
  // zelf aangevinkte diensten blijven staan; alleen wat eerder vooraf was
  // ingevuld, wordt vervangen.
  const voorafBericht = useRef("");
  const voorafDiensten = useRef<Dienst[]>([]);
  useEffect(() => {
    const kies = (slug: string | null) => {
      const p = pakketten.find((x) => x.slug === slug);
      if (!p) return;
      pakketRef.current = p.slug;
      const tekst = `Ik heb interesse in: ${p.naam} (vanaf € ${p.bedrag.toLocaleString("nl-NL")})`;
      const nieuw = voorafInvullen.pakket[p.slug];
      // Vastleggen vóór de update: React voert de updaters later uit.
      const vorigeTekst = voorafBericht.current;
      const vorigeDiensten = voorafDiensten.current;
      voorafBericht.current = tekst;
      voorafDiensten.current = nieuw;
      setGekozen((d) => {
        const eigen = d.filter((x) => !vorigeDiensten.includes(x));
        return alleDiensten.filter((x) => eigen.includes(x) || nieuw.includes(x));
      });
      setValues((v) =>
        v.message.trim() === "" || v.message === vorigeTekst ? { ...v, message: tekst } : v
      );
    };

    kies(new URLSearchParams(window.location.search).get("pakket"));

    // Een klik op "Vraag aan" blijft op de pagina: invullen, URL bijwerken,
    // naar het formulier scrollen. Zonder JavaScript werkt de link gewoon.
    const opKlik = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[data-pakket]");
      if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const slug = link.getAttribute("data-pakket");
      e.preventDefault();
      kies(slug);
      window.history.replaceState(null, "", `?pakket=${slug}#contact-form`);
      const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: rustig ? "auto" : "smooth", block: "start" });
    };
    document.addEventListener("click", opKlik);
    return () => document.removeEventListener("click", opKlik);
  }, []);

  // Het berichtveld groeit mee, binnen een minimum en maximum.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.max(104, Math.min(ta.scrollHeight, 300));
    ta.style.height = `${next}px`;
  }, [values.message]);

  function updateField(name: Veld, val: string) {
    setValues((v) => ({ ...v, [name]: val }));
    if (gecontroleerd && (name === "name" || name === "email")) {
      setErrors((e) => ({ ...e, [name]: valideer[name](val) }));
    }
  }

  function toggleDienst(dienst: Dienst) {
    // Altijd in de volgorde van de lijst, zodat de e-mail voorspelbaar is.
    const nieuw = gekozen.includes(dienst)
      ? gekozen.filter((x) => x !== dienst)
      : alleDiensten.filter((x) => x === dienst || gekozen.includes(x));
    setGekozen(nieuw);
    if (gecontroleerd) setErrors((e) => ({ ...e, diensten: valideer.diensten(nieuw) }));
  }

  function resetForm() {
    setStatus("idle");
    setValues(leeg);
    setGekozen([]);
    setErrors({});
    setGecontroleerd(false);
    pakketRef.current = null;
    voorafBericht.current = "";
    voorafDiensten.current = [];
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (bezigRef.current) return; // geen dubbele verzending

    // Honeypot: ingevuld door een bot, dan stil stoppen.
    const honey = (e.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null)?.value;
    if (honey) return;

    const fouten: Errors = {
      name: valideer.name(values.name),
      email: valideer.email(values.email),
      diensten: valideer.diensten(gekozen),
    };
    setGecontroleerd(true);
    setErrors(fouten);
    if (fouten.name || fouten.email || fouten.diensten) {
      // Focus naar het eerste foute veld, in de volgorde van het formulier.
      const eerste = fouten.name
        ? "contact-name"
        : fouten.email
          ? "contact-email"
          : "contact-dienst-0";
      document.getElementById(eerste)?.focus();
      return;
    }

    bezigRef.current = true;
    setStatus("submitting");

    const data = {
      name: schoon(values.name, MAX.name),
      company: schoon(values.company, MAX.company),
      email: schoon(values.email, MAX.email),
      phone: schoon(values.phone, MAX.phone),
      // Alleen mee als "Bestaande website verbeteren" aan staat.
      website: toonWebsite ? metProtocol(schoon(values.website, MAX.website)).slice(0, MAX.website) : "",
      message: schoon(values.message, MAX.message),
      diensten: gekozen,
      pakket: pakketRef.current,
      pagina: window.location.pathname,
    };

    const naarSupabase = async () => {
      try {
        // Dynamisch: Supabase hoort niet in de eerste bundel.
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { error } = await supabase.from("contact_submissions").insert({
          name: data.name,
          company: data.company || null,
          email: data.email,
          phone: data.phone || null,
          services: data.diensten,
          website: data.website || null,
          message: data.message || null,
          pakket: data.pakket,
          page_path: data.pagina,
        });
        return !error;
      } catch {
        return false;
      }
    };

    // FormSubmit als x-www-form-urlencoded (een CORS "simple request"), geen
    // JSON: dat voorkomt een preflight die Safari en contentblockers vaak
    // weigeren. De veldnamen zijn de regels in de e-mail.
    const naarMail = async () => {
      try {
        const body = new URLSearchParams();
        body.set("Naam", data.name);
        if (data.company) body.set("Bedrijfsnaam", data.company);
        body.set("E-mailadres", data.email);
        if (data.phone) body.set("Telefoonnummer", data.phone);
        body.set("Diensten", data.diensten.map((d) => `• ${d}`).join("\n"));
        if (data.website) body.set("Website", data.website);
        if (data.message) body.set("Bericht", data.message);
        if (data.pakket) body.set("Pakket", data.pakket);
        body.set("Verstuurd vanaf", data.pagina === "/" ? "Home" : data.pagina);
        body.set("_subject", `Nieuwe aanvraag van ${data.name} · ${data.diensten.join(", ")}`);
        body.set("_replyto", data.email);
        body.set("_template", "table");
        body.set("_captcha", "false");
        const res = await fetch(contact.endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });
        const json = (await res.json().catch(() => ({}))) as { success?: string };
        return res.ok && json.success === "true";
      } catch {
        return false;
      }
    };

    const [opgeslagen, gemaild] = await Promise.all([naarSupabase(), naarMail()]);
    bezigRef.current = false;

    // Alleen een bevestiging als minstens één kanaal het echt heeft verwerkt.
    if (opgeslagen || gemaild) {
      setStatus("sent");
      meet({
        naam: "generate_lead",
        params: {
          page_path: data.pagina,
          diensten: data.diensten.join(","),
          ...(data.pakket ? { pakket: data.pakket } : {}),
        },
      });
    } else {
      // Alles blijft ingevuld; de melding staat bij de knop.
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  // Het formulier blijft nog 220ms staan nadat het verstuurd is, zodat het weg
  // kan faden voordat de bedankt-kaart verschijnt.
  const { mounted: formulierZichtbaar, state: formulierState } = usePresence(
    status !== "sent",
    220
  );

  return (
          <div id="contact-form" className={cn("scroll-mt-24", className)}>
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white/[0.04] p-6 backdrop-blur-sm md:p-10">
                {/* Het formulier fadet eerst weg, daarna komt de
                    bedankt-kaart op — zoals mode="wait" dat deed. */}
                {formulierZichtbaar ? (
                  <>
                  {/* Een <p>, geen kop: het formulier staat onder een H2 (home)
                      én onder een H1 (/contact/), dus een vast kopniveau zou
                      op één van de twee de volgorde breken. */}
                  <p className="mb-6 font-heading text-xl font-semibold leading-snug text-white md:text-2xl">
                    Plan een gratis gesprek
                  </p>
                  <form
                    data-form="fields"
                    data-state={formulierState}
                    onSubmit={onSubmit}
                    noValidate
                  >
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden
                      />

                      <RevealStagger className="space-y-5" stagger={0.05}>
                        <RevealItem>
                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                              id="contact-name"
                              name="name"
                              label="Naam"
                              required
                              value={values.name}
                              onChange={(v) => updateField("name", v)}
                              error={errors.name}
                              placeholder="Je naam"
                              autoComplete="name"
                              maxLength={MAX.name}
                            />
                            <Field
                              id="contact-company"
                              name="company"
                              label="Bedrijfsnaam"
                              optional
                              value={values.company}
                              onChange={(v) => updateField("company", v)}
                              placeholder="Naam van je bedrijf"
                              autoComplete="organization"
                              maxLength={MAX.company}
                            />
                            <Field
                              id="contact-email"
                              name="email"
                              label="E-mailadres"
                              required
                              type="email"
                              inputMode="email"
                              value={values.email}
                              onChange={(v) => updateField("email", v)}
                              error={errors.email}
                              placeholder="jij@bedrijf.nl"
                              autoComplete="email"
                              maxLength={MAX.email}
                            />
                            <Field
                              id="contact-phone"
                              name="phone"
                              label="Telefoonnummer"
                              optional
                              type="tel"
                              inputMode="tel"
                              value={values.phone}
                              onChange={(v) => updateField("phone", v)}
                              placeholder="06 12345678"
                              autoComplete="tel"
                              maxLength={MAX.phone}
                            />
                          </div>
                        </RevealItem>

                        <RevealItem>
                          <fieldset
                            aria-describedby={cn(
                              "contact-diensten-uitleg",
                              errors.diensten && "contact-diensten-error"
                            )}
                            aria-invalid={!!errors.diensten || undefined}
                          >
                            <legend className="flex items-baseline gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                              Waar kan ik je mee helpen?
                              <span aria-hidden className="text-primary">
                                *
                              </span>
                            </legend>
                            <p id="contact-diensten-uitleg" className="mb-3 mt-1 text-xs text-white/60">
                              Kies één of meer opties.
                            </p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {alleDiensten.map((dienst, i) => {
                                const aan = gekozen.includes(dienst);
                                return (
                                  // De hele tegel is het label, dus overal klikbaar.
                                  <label
                                    key={dienst}
                                    className={cn(
                                      "group flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-[background-color,border-color,color] duration-200",
                                      "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/25",
                                      aan
                                        ? "border-primary bg-primary/10 text-white"
                                        : errors.diensten
                                          ? "border-red-400/70 bg-white/[0.04] text-white/80 hover:border-red-400"
                                          : "border-white/10 bg-white/[0.04] text-white/80 hover:border-primary/40 hover:bg-white/[0.06]"
                                    )}
                                  >
                                    <input
                                      id={`contact-dienst-${i}`}
                                      type="checkbox"
                                      name="diensten"
                                      value={dienst}
                                      checked={aan}
                                      onChange={() => toggleDienst(dienst)}
                                      className="sr-only"
                                    />
                                    <span
                                      aria-hidden
                                      className={cn(
                                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200",
                                        aan ? "border-primary bg-primary text-ink" : "border-white/30"
                                      )}
                                    >
                                      {aan && <Check size={14} strokeWidth={3} />}
                                    </span>
                                    {dienst}
                                  </label>
                                );
                              })}
                            </div>
                            <Foutmelding id="contact-diensten-error" fout={errors.diensten} />
                          </fieldset>

                          {/* Alleen bij "Bestaande website verbeteren". Uit =
                              weg uit de DOM, dus de waarde gaat niet mee. */}
                          {toonWebsite && (
                            <div className="veld-in mt-5">
                              <Field
                                id="contact-website"
                                name="website"
                                label="Wat is je huidige website?"
                                optional
                                inputMode="url"
                                value={values.website}
                                onChange={(v) => updateField("website", v)}
                                placeholder="jouwwebsite.nl"
                                autoComplete="url"
                                maxLength={MAX.website}
                              />
                            </div>
                          )}
                        </RevealItem>

                        <RevealItem>
                          <Field
                            id="contact-message"
                            name="message"
                            label="Vertel kort over je vraag of idee"
                            optional
                            as="textarea"
                            textareaRef={textareaRef}
                            value={values.message}
                            onChange={(v) => updateField("message", v)}
                            placeholder="Vertel bijvoorbeeld wat je wilt laten maken of verbeteren en wat je ermee wilt bereiken."
                            hint="Een paar zinnen is genoeg. Je hoeft nog geen uitgewerkt plan te hebben."
                            maxLength={MAX.message}
                          />
                        </RevealItem>

                        <RevealItem>
                          <div className="flex flex-col gap-3 pt-2">
                            <div role="status" aria-live="polite">
                              {status === "error" && (
                                <p className="flex items-start gap-1.5 text-sm text-red-400">
                                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                                  <span>
                                    Er ging iets mis bij het versturen. Probeer het opnieuw of mail naar{" "}
                                    <a
                                      href={`mailto:${site.email}`}
                                      className="rounded font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50"
                                    >
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
                                disabled={isSubmitting}
                                aria-busy={isSubmitting || undefined}
                                className={cn(
                                  // Zelfde cyaan als de andere hoofdknoppen (Button variant="primary").
                                  "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-ink shadow-glow transition-[background-color,box-shadow,opacity] duration-200 sm:w-auto",
                                  "hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
                                  "disabled:cursor-not-allowed disabled:opacity-70"
                                )}
                              >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 size={16} className="animate-spin" aria-hidden />
                                    <span>Versturen…</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Bespreek mijn project</span>
                                    <ArrowRight
                                      size={16}
                                      className="transition-transform duration-200 group-hover:translate-x-1"
                                      aria-hidden
                                    />
                                  </>
                                )}
                              </button>
                              <p className="text-center text-xs text-white/60 sm:text-left">
                                Reactie binnen twee werkdagen · Vrijblijvend
                              </p>
                            </div>
                          </div>
                        </RevealItem>
                      </RevealStagger>
                  </form>
                  </>
                ) : (
                  <SuccessCard onReset={resetForm} />
                )}
              </div>
            </Reveal>
          </div>
  );
}

/* ------------------------------ Foutmelding ------------------------------ */

/** Blijft staan zodat hij ook dicht kan animeren (grid-truc in globals.css). */
function Foutmelding({ id, fout }: { id: string; fout?: string }) {
  return (
    <div className="field-error" data-state={fout ? "open" : "closed"}>
      <div>
        <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={12} className="shrink-0" aria-hidden />
          <span>{fout}</span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ SuccessCard ------------------------------ */

function SuccessCard({ onReset }: { onReset: () => void }) {
  // De focus gaat naar de kop, zodat toetsenbord en schermlezer meteen
  // weten dat het gelukt is.
  const kopRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    kopRef.current?.focus();
  }, []);
  return (
    <div
      role="status"
      aria-live="polite"
      className="success-card flex min-h-[300px] flex-col items-center justify-center gap-4 py-8 text-center"
    >
      <div className="success-check flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check size={28} strokeWidth={2.5} aria-hidden />
      </div>
      <div>
        <p
          ref={kopRef}
          tabIndex={-1}
          className="rounded font-heading text-2xl font-semibold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
        >
          Bedankt voor je bericht!
        </p>
        <p className="mt-2 max-w-sm text-white/70">
          Ik heb je aanvraag ontvangen en neem binnen twee werkdagen contact met je op.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 rounded text-sm font-medium text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
      >
        Nog een bericht sturen
      </button>
    </div>
  );
}

/* --------------------------------- Field --------------------------------- */

interface BaseFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  /** Korte toelichting onder het veld, gekoppeld via aria-describedby. */
  hint?: string;
  maxLength?: number;
}

interface InputFieldProps extends BaseFieldProps {
  as?: "input";
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  textareaRef?: never;
}

interface TextareaFieldProps extends BaseFieldProps {
  as: "textarea";
  textareaRef?: RefObject<HTMLTextAreaElement>;
  type?: never;
  inputMode?: never;
}

type FieldProps = InputFieldProps | TextareaFieldProps;

export function Field(props: FieldProps) {
  const {
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    required,
    optional,
    autoComplete,
    hint,
    maxLength,
  } = props;

  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = cn(hint && hintId, error && errorId) || undefined;

  const controlClasses = cn(
    "block w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white transition-[background-color,border-color,box-shadow] duration-200",
    "placeholder:text-white/50",
    "focus:bg-white/[0.06] focus:outline-none",
    error
      ? "border-red-400/70 focus:border-red-400 focus:ring-4 focus:ring-red-400/20"
      : "border-white/10 focus:border-primary/60 focus:ring-4 focus:ring-primary/25"
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60"
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden className="text-primary">
            *
          </span>
        )}
        {optional && (
          <span className="text-[10px] normal-case tracking-normal text-white/50">
            (optioneel)
          </span>
        )}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          ref={props.textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-required={required || undefined}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          maxLength={maxLength}
          rows={4}
          className={cn(
            controlClasses,
            "min-h-[104px] max-h-[300px] resize-none overflow-y-auto"
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          inputMode={props.inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-required={required || undefined}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          autoComplete={autoComplete}
          maxLength={maxLength}
          spellCheck={false}
          className={cn(controlClasses, "min-h-[48px]")}
        />
      )}

      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-white/60">
          {hint}
        </p>
      )}
      <Foutmelding id={errorId} fout={error} />
    </div>
  );
}
