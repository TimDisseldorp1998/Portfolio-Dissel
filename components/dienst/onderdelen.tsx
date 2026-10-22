import { ArrowRight, Check, X, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { KoffieIcoon } from "@/components/ui/KoffieIcoon";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";

/**
 * Bouwstenen voor de dienstpagina's (/website-laten-maken/ en straks de
 * andere diensten). Elke pagina volgt hetzelfde stramien uit de
 * informatiestructuur: hero · wat je krijgt · werk · past het · werkwijze ·
 * kosten · FAQ · CTA. Allemaal servercomponenten.
 */

export const kicker = "mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary";
export const h2 = "font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl";
export const tekstLink =
  "inline-flex items-center gap-1.5 rounded-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Een sectie met eigen ruimte; alle secties delen de donkere achtergrond. */
export function Blok({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-14 md:py-20", className)}>
      {children}
    </section>
  );
}

/** De kennismakingsknop met het koffiekopje, zoals overal op de site. */
export function GesprekKnop({ className }: { className?: string }) {
  return (
    <Button
      href="/contact/"
      variant="primary"
      size="lg"
      data-cta="plan_kennismaking"
      className={cn("group", className)}
    >
      <KoffieIcoon stoom="hover" />
      Plan een gesprek
    </Button>
  );
}

/** "Wat je krijgt": blokken met een icoon, in rijen van drie. */
export function Voordeelblokken({
  items,
}: {
  items: { titel: string; tekst: string; icon: LucideIcon }[];
}) {
  return (
    <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-5">
      {items.map(({ titel, tekst, icon: Icon }) => (
        <RevealItem key={titel}>
          <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-7">
            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] text-secondary">
              <Icon size={22} strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="font-heading text-lg font-semibold text-white">{titel}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">{tekst}</p>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

/** Past wel / past niet, naast elkaar vanaf tablet. */
export function PastHetBijJe({ wel, niet }: { wel: string[]; niet: string[] }) {
  const lijst = (items: string[], past: boolean) => (
    <ul className="mt-4 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
          {past ? (
            <Check size={18} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-primary" />
          ) : (
            <X size={18} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-white/40" />
          )}
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
        <div className="rounded-3xl bg-white/[0.04] p-7">
          <h3 className="font-heading text-lg font-semibold text-white">Past wel</h3>
          {lijst(wel, true)}
        </div>
        <div className="rounded-3xl bg-white/[0.04] p-7">
          <h3 className="font-heading text-lg font-semibold text-white">Past niet</h3>
          {lijst(niet, false)}
        </div>
      </div>
    </Reveal>
  );
}

/** Genummerde stappen, vier naast elkaar op desktop. */
export function Stappen({ items }: { items: { titel: string; tekst: string }[] }) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map((stap, i) => (
        <li key={stap.titel} className="flex flex-col rounded-3xl bg-white/[0.04] p-7">
          <span aria-hidden className="flex items-center gap-2 font-heading text-sm font-semibold text-primary">
            {String(i + 1).padStart(2, "0")}
            {i === 0 && <KoffieIcoon size="sm" />}
          </span>
          <h3 className="mt-3 font-heading text-lg font-semibold text-white">{stap.titel}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/70">{stap.tekst}</p>
        </li>
      ))}
    </ol>
  );
}

/** Prijstabel. De laatste kolom is het bedrag; "excl. btw" staat in de kop. */
export function PrijsTabel({
  rijen,
  metOmschrijving = false,
}: {
  rijen: { pakket: string; omschrijving?: string; prijs: string }[];
  metOmschrijving?: boolean;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl bg-white/[0.04]">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-white/[0.08] text-xs uppercase tracking-[0.14em] text-white/60">
            <th scope="col" className="px-6 py-4 font-medium">Pakket</th>
            {metOmschrijving && (
              <th scope="col" className="hidden px-6 py-4 font-medium md:table-cell">Wat het is</th>
            )}
            <th scope="col" className="px-6 py-4 text-right font-medium">Vanaf (excl. btw)</th>
          </tr>
        </thead>
        <tbody>
          {rijen.map((r) => (
            <tr key={r.pakket} className="border-b border-white/[0.06] last:border-0">
              <th scope="row" className="px-6 py-4 font-medium text-white">
                {r.pakket}
                {metOmschrijving && r.omschrijving && (
                  <span className="mt-1 block text-sm font-normal text-white/60 md:hidden">{r.omschrijving}</span>
                )}
              </th>
              {metOmschrijving && (
                <td className="hidden px-6 py-4 text-white/70 md:table-cell">{r.omschrijving}</td>
              )}
              <td className="whitespace-nowrap px-6 py-4 text-right font-heading text-lg font-semibold text-white">
                {r.prijs}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Afsluiter met de kennismakingsknop. */
export function DienstCta({
  kop,
  tekst,
  onder,
}: {
  kop: string;
  tekst: string;
  /** Optionele extra regel onder de knop, bijv. een terug-link. */
  onder?: ReactNode;
}) {
  return (
    <Reveal>
      <section aria-labelledby="cta-kop" className="rounded-3xl bg-white/[0.04] p-8 md:p-12">
        <h2 id="cta-kop" className={h2}>
          {kop}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{tekst}</p>
        <GesprekKnop className="mt-8" />
        {onder && <div className="mt-6">{onder}</div>}
      </section>
    </Reveal>
  );
}

/** Tekstlink met pijl, voor "→ Lees verder"-regels. */
export function PijlLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={tekstLink}>
      {children}
      <ArrowRight size={16} aria-hidden />
    </a>
  );
}
