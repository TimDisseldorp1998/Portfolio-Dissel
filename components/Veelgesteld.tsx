import { ChevronDown } from "lucide-react";

export type Vraag = { vraag: string; antwoord: React.ReactNode };

/**
 * Uitklaplijst met veelgestelde vragen, gedeeld door home en /voor-ai/.
 *
 * <details>/<summary>: ook dichtgeklapt staan de antwoorden in de HTML, dus
 * Google en AI-assistenten lezen ze gewoon mee. Werkt zonder JavaScript. De
 * vraag is bewust geen H3: een kop binnen <summary> wordt niet in elke
 * schermlezer als knop voorgelezen. De animaties staan in globals.css onder
 * `.faq-item`.
 */
export function Veelgesteld({ vragen }: { vragen: Vraag[] }) {
  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {vragen.map((item, i) => (
        <details key={item.vraag} open={i === 0} className="faq-item group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
            <span className="font-heading text-lg font-semibold leading-snug text-white/80 transition-colors duration-300 group-open:text-white group-hover:text-white">
              {item.vraag}
            </span>
            <span
              aria-hidden
              className="faq-pijl flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/60 group-open:rotate-180 group-open:bg-primary/15 group-open:text-primary group-hover:bg-white/[0.1] group-hover:text-white group-open:group-hover:bg-primary/25 group-open:group-hover:text-primary"
            >
              <ChevronDown size={18} strokeWidth={2} />
            </span>
          </summary>
          <div className="faq-antwoord pb-6 pr-0 sm:pr-14">
            <p className="max-w-[68ch] leading-relaxed text-white/75">{item.antwoord}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
