/**
 * Linkcheck over de statische export in out/: elke interne link (href, src en
 * url(...) in een inline style) moet naar een bestand wijzen dat bestaat, en
 * een anker (#work, /#contact-form) naar een id die op die pagina staat.
 *
 * Draaien na een build:  node scripts/check-links.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

function htmlBestanden(map) {
  return readdirSync(map).flatMap((naam) => {
    const vol = path.join(map, naam);
    if (statSync(vol).isDirectory()) return htmlBestanden(vol);
    return naam.endsWith(".html") ? [vol] : [];
  });
}

/** "/werk/" → out/werk/index.html, "/llms.txt" → out/llms.txt */
function doelBestand(pad) {
  const p = decodeURIComponent(pad);
  if (p.endsWith("/")) return path.join(OUT, p, "index.html");
  const direct = path.join(OUT, p);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  return path.join(OUT, p, "index.html");
}

const idsCache = new Map();
function ids(bestand) {
  if (!idsCache.has(bestand)) {
    const html = readFileSync(bestand, "utf8");
    idsCache.set(bestand, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(bestand);
}

const fouten = [];
let geteld = 0;

for (const bestand of htmlBestanden(OUT)) {
  if (bestand.endsWith(`${path.sep}404.html`) || bestand.includes(`${path.sep}404${path.sep}`)) continue;
  const html = readFileSync(bestand, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  const links = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/url\((?:&#x27;|'|")?([^)'"&]+)/g)].map((m) => m[1]),
  ];
  const pagina = "/" + path.relative(OUT, bestand).replace(/index\.html$/, "");
  for (const link of links) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(link)) continue;
    geteld++;
    const [padMetQuery, anker] = link.split("#");
    const pad = padMetQuery.split("?")[0];
    const doel = pad === "" ? bestand : doelBestand(pad.startsWith("/") ? pad : path.posix.join(pagina, pad));
    if (!existsSync(doel)) {
      fouten.push(`${pagina}  →  ${link}  (bestaat niet)`);
    } else if (anker && doel.endsWith(".html") && !ids(doel).has(anker)) {
      fouten.push(`${pagina}  →  ${link}  (anker #${anker} niet gevonden)`);
    }
  }
}

if (fouten.length) {
  console.error(`\n❌ ${fouten.length} kapotte link(s):\n`);
  for (const f of [...new Set(fouten)]) console.error("   " + f);
  process.exit(1);
}
console.log(`✓ ${geteld} interne links en bronnen gecontroleerd, allemaal in orde.`);
