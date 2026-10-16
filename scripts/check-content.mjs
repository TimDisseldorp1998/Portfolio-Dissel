/**
 * Content-guard: bewaakt de maximale lengte van de kaartteksten van de cases
 * (op home, op /werk/ en als meta-description van de casepagina).
 *
 * Draait automatisch via het `prebuild`-script, dus vóór elke `npm run build`
 * — en daarmee ook vóór `npm run deploy` en `npm run ship`. Een te lange tekst
 * kan dus niet naar de preview of naar live.
 *
 * De volledige controle van een casebestand (verplichte velden, titellengte,
 * bestaande beelden) zit in lib/werk.ts en draait tijdens de build zelf. Dit
 * script is de snelle check vooraf, met een leesbare melding.
 *
 * Handmatig draaien kan met: npm run check:content
 */
import { readdirSync, readFileSync } from "node:fs";

const MAX_KAARTTEKST = 120;
const MAP = new URL("../content/werk/", import.meta.url);

const bestanden = readdirSync(MAP).filter((f) => f.endsWith(".mdx"));

const teksten = bestanden.map((bestand) => {
  const bron = readFileSync(new URL(bestand, MAP), "utf8");
  const match = bron.match(/kaarttekst:\s*\n?\s*"([^"]+)"/);
  return { bestand, tekst: match?.[1] };
});

// Vangnet: een controle die stil niets controleert is erger dan geen.
const zonder = teksten.filter((t) => !t.tekst);
if (bestanden.length === 0 || zonder.length > 0) {
  console.error("\n❌ check-content: geen kaarttekst gevonden in:");
  for (const t of zonder) console.error(`   content/werk/${t.bestand}`);
  if (bestanden.length === 0) console.error("   (geen .mdx-bestanden in content/werk/)");
  console.error(
    "   Elke case heeft `kaarttekst: \"...\"` in zijn meta nodig. Is de opmaak"
  );
  console.error("   gewijzigd, pas dan de regex in scripts/check-content.mjs aan.\n");
  process.exit(1);
}

const teLang = teksten.filter((t) => t.tekst.length > MAX_KAARTTEKST);
if (teLang.length > 0) {
  console.error(`\n❌ Kaarttekst te lang (max ${MAX_KAARTTEKST} tekens):\n`);
  for (const t of teLang) {
    const over = t.tekst.length - MAX_KAARTTEKST;
    console.error(`   ${t.bestand}: ${t.tekst.length} tekens, ${over} te veel`);
    console.error(`   "${t.tekst}"\n`);
  }
  console.error("   Kort de tekst in in content/werk/ en probeer opnieuw.\n");
  process.exit(1);
}

const langste = Math.max(...teksten.map((t) => t.tekst.length));
console.log(
  `✓ ${teksten.length} kaartteksten, allemaal binnen ${MAX_KAARTTEKST} tekens (langste: ${langste}).`
);
