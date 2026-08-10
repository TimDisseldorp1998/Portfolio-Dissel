"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { usePresence } from "@/lib/usePresence";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
} from "lucide-react";
import { contact, site, socials } from "@/lib/content";
import { Testimonial } from "./ui/Testimonial";
import { Section } from "./ui/Section";

/** Op naam gezocht, niet op positie: zo wisselt de quote niet stilletjes mee
 *  als de volgorde in `site.hero.reviews` ooit verandert. */
const contactReview = site.hero.reviews.find((r) => r.author === "Madelief");
import { Container } from "./ui/Container";
import { Reveal, RevealStagger, RevealItem } from "./ui/Reveal";
import { LinkedinFilled, InstagramFilled } from "./ui/BrandIcons";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "sent" | "error";
type Errors = { email?: string; message?: string };

const brandIcons: Record<string, (props: { size?: number }) => JSX.Element> = {
  Linkedin: LinkedinFilled,
  Instagram: InstagramFilled,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(v: string): string | undefined {
  if (!v.trim()) return "Vul je e-mailadres in.";
  if (!EMAIL_RE.test(v)) return "Dit lijkt geen geldig e-mailadres.";
  return undefined;
}

function validateMessage(v: string): string | undefined {
  if (!v.trim()) return "Vertel me even waar het over gaat.";
  if (v.trim().length < 3) return "Iets meer graag. Een paar woorden helpen.";
  return undefined;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string>("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea, respecting min/max heights.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.max(130, Math.min(ta.scrollHeight, 300));
    ta.style.height = `${next}px`;
  }, [values.message]);

  function updateField(name: keyof typeof values, val: string) {
    setValues((v) => ({ ...v, [name]: val }));
    // Clear any existing error the moment the field becomes valid.
    if (name === "email" && errors.email) {
      if (!validateEmail(val)) setErrors((e) => ({ ...e, email: undefined }));
    }
    if (name === "message" && errors.message) {
      if (!validateMessage(val))
        setErrors((e) => ({ ...e, message: undefined }));
    }
  }

  function handleBlur(name: "email" | "message") {
    const err =
      name === "email"
        ? validateEmail(values.email)
        : validateMessage(values.message);
    setErrors((e) => ({ ...e, [name]: err }));
  }

  function resetForm() {
    setStatus("idle");
    setValues({ name: "", email: "", message: "" });
    setProjectType("");
    setErrors({});
    setErrorMessage(null);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check
    const honey = (e.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null)?.value;
    if (honey) return;

    const emailErr = validateEmail(values.email);
    const messageErr = validateMessage(values.message);
    if (emailErr || messageErr) {
      setErrors({ email: emailErr, message: messageErr });
      // Move focus to the first invalid field for keyboard users.
      const firstInvalid = document.getElementById(
        emailErr ? "contact-email" : "contact-message"
      );
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    // 1) Store the lead in Supabase. The site is a static export (no server),
    //    so the browser writes directly with the public publishable key. RLS
    //    lets anonymous visitors only INSERT, never read other submissions.
    const storeInSupabase = async () => {
      try {
        // Dynamisch: Supabase hoort niet in de eerste bundel. De client wordt
        // pas opgehaald op het moment dat iemand het formulier verstuurt.
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { error } = await supabase.from("contact_submissions").insert({
          name: values.name.trim() || null,
          email: values.email.trim(),
          project_type: projectType || null,
          message: values.message.trim(),
        });
        return !error;
      } catch {
        return false;
      }
    };

    // 2) Also fire the existing email notification via formsubmit.co, so a
    //    submission still lands in the inbox. Sent as x-www-form-urlencoded
    //    (a CORS "simple request"), NOT JSON, to avoid a preflight OPTIONS
    //    that Safari + content blockers often reject.
    const sendEmail = async () => {
      try {
        const body = new URLSearchParams();
        body.set("name", values.name.trim() || "—");
        body.set("email", values.email.trim());
        body.set("project_type", projectType || "Niet gespecificeerd");
        body.set("message", values.message.trim());
        body.set(
          "_subject",
          `Nieuw bericht via portfolio — ${projectType || "algemeen"}`
        );
        body.set("_template", "table");
        body.set("_captcha", "false");
        const res = await fetch(contact.endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });
        const json = (await res.json().catch(() => ({}))) as {
          success?: string;
        };
        return res.ok && json.success === "true";
      } catch {
        return false;
      }
    };

    const [stored, emailed] = await Promise.all([
      storeInSupabase(),
      sendEmail(),
    ]);

    // The message got through if at least one channel succeeded.
    if (stored || emailed) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMessage(
        `We konden je bericht niet direct versturen. Mail me rechtstreeks op ${site.email}.`
      );
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
    <Section id="contact" variant="dark" className="pb-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Left column: intro + socials */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Contact
              </p>
              <h2 className="mb-6 font-heading text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                <span className="text-white/[0.55]">Klaar om te groeien?</span>{" "}
                <span className="text-white">Plan een gesprek.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/70">
                Plan een vrijblijvend gesprek van 20 minuten.
                <br />
                Vertel me waar je naartoe wilt met je merk of product. Ik denk
                direct met je mee over hoe we daar sneller komen. Geen
                verplichtingen, gewoon een goed gesprek.
              </p>

              {/* Socials */}
              <div className="mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                  Socials
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = brandIcons[s.icon];
                    if (!Icon) return null;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={`${s.a11yLabel}, opent in nieuw tabblad`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-primary/40 hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                  <a
                    href={`mailto:${site.email}`}
                    aria-label={`Mail naar ${site.email}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-[background-color,border-color,color,box-shadow] duration-200 hover:border-primary/40 hover:bg-white/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
                  >
                    <Mail size={18} aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Bewijs naast het formulier. Onderaan deze kolom, dus op desktop
                naast het formulier en onder `lg` (één kolom) er direct boven.
                Zelfde kaart als in de hero, uit hetzelfde component. */}
            {contactReview && (
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Testimonial review={contactReview} />
                </div>
              </Reveal>
            )}
          </div>

          {/* Right column: form / success card. `contact-form` anchor is the
              hero contact CTA's target, so the form lands in view on any device
              (on mobile the form stacks below the intro). */}
          <div id="contact-form" className="scroll-mt-24 lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white/[0.04] p-6 backdrop-blur-sm md:p-10">
                {/* Het formulier fadet eerst weg, daarna komt de
                    bedankt-kaart op — zoals mode="wait" dat deed. */}
                {formulierZichtbaar ? (
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
                              optional
                              value={values.name}
                              onChange={(v) => updateField("name", v)}
                              placeholder="Je naam"
                              autoComplete="name"
                            />
                            <Field
                              id="contact-email"
                              name="email"
                              label="E-mail"
                              required
                              type="email"
                              inputMode="email"
                              value={values.email}
                              onChange={(v) => updateField("email", v)}
                              onBlur={() => handleBlur("email")}
                              error={errors.email}
                              placeholder="jij@voorbeeld.nl"
                              autoComplete="email"
                            />
                          </div>
                        </RevealItem>

                        <RevealItem>
                          <fieldset>
                            <legend className="mb-2 flex items-baseline gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                              Project type
                              <span className="text-[10px] normal-case tracking-normal text-white/50">
                                (optioneel)
                              </span>
                            </legend>
                            {/* Toggle-knoppen, geen radiogroep: een tweede klik
                                zet de keuze weer uit, en dat kan een radio niet.
                                De fieldset + legend zorgen al voor groepering
                                en naam. */}
                            <div className="flex flex-wrap gap-2">
                              {contact.projectTypes.map((opt) => {
                                const selected = projectType === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() =>
                                      setProjectType(selected ? "" : opt.value)
                                    }
                                    className={cn(
                                      "min-h-[40px] rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25",
                                      selected
                                        ? "border-primary bg-primary text-ink shadow-glow"
                                        : "border-white/15 bg-white/[0.04] text-white/80 hover:border-primary/40 hover:bg-white/[0.06] hover:text-primary"
                                    )}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>
                        </RevealItem>

                        <RevealItem>
                          <Field
                            id="contact-message"
                            name="message"
                            label="Bericht"
                            required
                            as="textarea"
                            textareaRef={textareaRef}
                            value={values.message}
                            onChange={(v) => updateField("message", v)}
                            onBlur={() => handleBlur("message")}
                            error={errors.message}
                            placeholder="Vertel kort waar je mee bezig bent…"
                          />
                        </RevealItem>

                        <RevealItem>
                          <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <div
                              role="status"
                              aria-live="polite"
                              className="min-h-[1.25rem] text-xs"
                            >
                              {status === "error" ? (
                                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-red-400">
                                  <span className="flex items-center gap-1.5">
                                    <AlertCircle
                                      size={14}
                                      className="shrink-0"
                                      aria-hidden
                                    />
                                    <span>{errorMessage}</span>
                                  </span>
                                  <a
                                    href={`mailto:${site.email}`}
                                    className="font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 rounded"
                                  >
                                    Mail me direct
                                  </a>
                                  <span aria-hidden className="text-red-400/40">·</span>
                                  <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 rounded"
                                  >
                                    Opnieuw proberen
                                  </button>
                                </p>
                              ) : (
                                <p className="flex items-center gap-1.5 text-white/60">
                                  <Clock
                                    size={14}
                                    className="shrink-0 text-primary"
                                    aria-hidden
                                  />
                                  <span>Reactie binnen 24–48 uur.</span>
                                </p>
                              )}
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={cn(
                                "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-tertiary-600 px-7 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(142,92,224,0.2),_0_20px_60px_-20px_rgba(142,92,224,0.6)] transition-[background-color,box-shadow,opacity] duration-200 sm:w-auto",
                                "hover:bg-tertiary-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tertiary/40",
                                "disabled:cursor-not-allowed disabled:opacity-70"
                              )}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                    aria-hidden
                                  />
                                  <span>Versturen…</span>
                                </>
                              ) : (
                                <>
                                  <span>Verstuur bericht</span>
                                  <ArrowRight
                                    size={16}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden
                                  />
                                </>
                              )}
                            </button>
                          </div>
                        </RevealItem>
                      </RevealStagger>
                  </form>
                ) : (
                  <SuccessCard onReset={resetForm} />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------ SuccessCard ------------------------------ */

function SuccessCard({ onReset }: { onReset: () => void }) {
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
        <p className="font-heading text-2xl font-semibold text-white">
          Bedankt!
        </p>
        <p className="mt-2 max-w-sm text-white/70">
          Je bericht is verstuurd. Je hoort binnen 24 tot 48 uur van me.
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

function Field(props: FieldProps) {
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
  } = props;

  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;

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
          rows={5}
          className={cn(
            controlClasses,
            "min-h-[130px] max-h-[300px] resize-none overflow-y-auto"
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
          spellCheck={false}
          className={cn(controlClasses, "min-h-[48px]")}
        />
      )}

      {/* Blijft staan zodat hij ook dicht kan animeren; de grid-truc in
          globals.css doet het hoogte-effect. */}
      <div className="field-error" data-state={error ? "open" : "closed"}>
        <div>
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
          >
            <AlertCircle size={12} className="shrink-0" aria-hidden />
            <span>{error}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
