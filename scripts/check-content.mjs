/**
 * Content-guard: bewaakt de maximale lengte van de projectomschrijvingen
 * die op de landingspagina in de case-kaarten staan.
 *
 * Draait automatisch via het `prebuild`-script, dus vóór elke `npm run build`
 * — en daarmee ook vóór `npm run deploy` en `npm run ship`. Een te lange tekst
 * kan dus niet naar de preview of naar live.
 *
 * Handmatig draaien kan met: npm run check:content
 */
import { readFileSync } from "node:fs";

const MAX_DESCRIPTION = 120;
const CONTENT_FILE = new URL("../lib/content.ts", import.meta.url);

const source = readFileSync(CONTENT_FILE, "utf8");

// Pakt elke `title: "..."` met de `description: "..."` die er direct op volgt.
const pattern = /title:\s*"([^"]+)",\s*\n\s*description:\s*\n?\s*"([^"]+)"/g;

const descriptions = [];
let match;
while ((match = pattern.exec(source))) {
  descriptions.push({ title: match[1], text: match[2] });
}

// Vangnet: als de opmaak van content.ts verandert en de regex niets meer vindt,
// moet dat opvallen. Een controle die stil niets controleert is erger dan geen.
if (descriptions.length === 0) {
  console.error(
    "\n❌ check-content: geen projectomschrijvingen gevonden in lib/content.ts."
  );
  console.error(
    "   De opmaak van dat bestand is waarschijnlijk gewijzigd. Pas de regex in"
  );
  console.error("   scripts/check-content.mjs aan zodat de controle weer werkt.\n");
  process.exit(1);
}

const tooLong = descriptions.filter((d) => d.text.length > MAX_DESCRIPTION);

if (tooLong.length > 0) {
  console.error(
    `\n❌ Projectomschrijving te lang (max ${MAX_DESCRIPTION} tekens):\n`
  );
  for (const d of tooLong) {
    const over = d.text.length - MAX_DESCRIPTION;
    console.error(`   ${d.title} — ${d.text.length} tekens, ${over} te veel`);
    console.error(`   "${d.text}"\n`);
  }
  console.error(
    "   Kort de tekst in in lib/content.ts en probeer opnieuw.\n"
  );
  process.exit(1);
}

const longest = Math.max(...descriptions.map((d) => d.text.length));
console.log(
  `✓ ${descriptions.length} projectomschrijvingen, allemaal binnen ${MAX_DESCRIPTION} tekens (langste: ${longest}).`
);
