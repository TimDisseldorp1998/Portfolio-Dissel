"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Copy,
  Loader2,
  Mail,
} from "lucide-react";
import { contact, site, socials } from "@/lib/content";
import { Section } from "./ui/Section";
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
  if (v.trim().length < 3) return "Iets meer graag — een paar woorden helpen.";
  return undefined;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore — some browsers block without user gesture context */
    }
  }

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

    const payload = {
      name: values.name.trim() || "—",
      email: values.email.trim(),
      project_type: projectType || "Niet gespecificeerd",
      message: values.message.trim(),
      _subject: `Nieuw bericht via portfolio — ${projectType || "algemeen"}`,
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
        throw new Error(
          json.message || "Er ging iets mis bij het versturen. Probeer opnieuw."
        );
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Er ging iets mis bij het versturen. Probeer opnieuw."
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <Section id="contact" variant="light" className="pb-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-12">
          {/* Left column: intro + socials */}
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

              {/* Mailto + copy row */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-black/[0.08] bg-white px-5 py-3 text-sm font-medium shadow-soft transition-all duration-300 hover:border-primary/30 focus-visible:border-primary/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                >
                  <Mail size={16} className="text-primary" />
                  <span>{site.email}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
                <div className="relative">
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={
                      copied ? "E-mailadres gekopieerd" : "Kopieer e-mailadres"
                    }
                    className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink-muted transition-all duration-200 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-primary"
                        >
                          <Check size={16} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        role="status"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[11px] font-medium text-white shadow-lg"
                      >
                        Gekopieerd!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-10">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
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
                        aria-label={`${s.label} — opent in nieuw tabblad`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-ink-muted transition-all duration-200 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column: form / success card */}
          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft md:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sent" ? (
                    <SuccessCard key="sent" onReset={resetForm} />
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      noValidate
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
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
                            <legend className="mb-2 flex items-baseline gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                              Project type
                              <span className="text-[10px] normal-case tracking-normal text-ink-muted">
                                (optioneel)
                              </span>
                            </legend>
                            <div
                              role="radiogroup"
                              aria-label="Project type"
                              className="flex flex-wrap gap-2"
                            >
                              {contact.projectTypes.map((opt) => {
                                const selected = projectType === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() =>
                                      setProjectType(selected ? "" : opt.value)
                                    }
                                    className={cn(
                                      "min-h-[40px] rounded-full border px-4 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
                                      selected
                                        ? "border-primary bg-primary text-white shadow-glow"
                                        : "border-black/[0.1] bg-white text-ink hover:border-primary/40 hover:text-primary"
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
                                <p className="flex items-center gap-1.5 text-red-600">
                                  <AlertCircle
                                    size={14}
                                    className="shrink-0"
                                    aria-hidden
                                  />
                                  <span>
                                    {errorMessage}{" "}
                                    <button
                                      type="button"
                                      onClick={() => setStatus("idle")}
                                      className="font-medium underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded"
                                    >
                                      Opnieuw proberen
                                    </button>
                                  </span>
                                </p>
                              ) : (
                                <p className="text-ink-muted">
                                  Ik reageer meestal binnen een dag of twee.
                                </p>
                              )}
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={cn(
                                "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-white shadow-glow transition-all duration-200 sm:w-auto",
                                "hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25",
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
                    </motion.form>
                  )}
                </AnimatePresence>
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
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={
        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
      }
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[300px] flex-col items-center justify-center gap-4 py-8 text-center"
    >
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Check size={28} strokeWidth={2.5} aria-hidden />
      </motion.div>
      <div>
        <p className="font-heading text-2xl font-semibold">Bedankt!</p>
        <p className="mt-2 max-w-sm text-ink-muted">
          Ik reageer meestal binnen een dag of twee.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 rounded text-sm font-medium text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
      >
        Nog een bericht sturen
      </button>
    </motion.div>
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
    "block w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-ink transition-all duration-200",
    "placeholder:text-ink-muted/80",
    "focus:bg-white focus:outline-none",
    error
      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
      : "border-black/[0.08] focus:border-primary/50 focus:ring-4 focus:ring-primary/15"
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted"
      >
        <span>{label}</span>
        {required && (
          <span aria-hidden className="text-primary">
            *
          </span>
        )}
        {optional && (
          <span className="text-[10px] normal-case tracking-normal text-ink-muted">
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
          className={cn(controlClasses, "min-h-[48px]")}
        />
      )}

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            key="err"
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-xs text-red-600"
          >
            <AlertCircle size={12} className="shrink-0" aria-hidden />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
