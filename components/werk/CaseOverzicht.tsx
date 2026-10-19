import { heroBeeld, type Case } from "@/lib/werk";
import { CaseKaart } from "./CaseKaart";

/**
 * De indeling van een rij casekaarten. Nu alleen `grid`: vanaf 1024px twee
 * naast elkaar (even hoog), daaronder onder elkaar op volle breedte.
 *
 * Later `layout="slider"` erbij: een horizontale scroll-snap-rij met
 * vorige/volgende-knoppen. Die hoort hier, in een eigen tak; CaseKaart hoeft
 * daarvoor niet te veranderen, want die heeft geen marges of breedte van
 * zichzelf.
 */
export type CaseOverzichtLayout = "grid";

export function CaseOverzicht({
  items,
  layout = "grid",
  kop = "h3",
}: {
  items: Case[];
  layout?: CaseOverzichtLayout;
  kop?: "h2" | "h3";
}) {
  if (layout === "grid") {
    return (
      <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {items.map((c) => (
          <li key={c.slug}>
            {/* Alleen gewone data naar de (client) kaart, niet de hele case. */}
            <CaseKaart
              caseMeta={{
                slug: c.slug,
                klant: c.klant,
                datum: c.datum,
                label: c.label,
                kaart: c.kaart,
                // Zelfde beeld als de hero: de kaart is de link, het beeld
                // decoratief, behalve een mockup met eigen alt-tekst.
                beeld: { src: heroBeeld(c), alt: c.kaart.beeld?.alt ?? "" },
              }}
              kop={kop}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    );
  }
  return null;
}
