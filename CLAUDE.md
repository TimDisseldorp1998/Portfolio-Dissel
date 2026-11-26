# CLAUDE.md

## Project
- Dit is de zakelijke site van DisselDesign: disseldesign.com (Next.js 14).
- Alle copy op de site is Nederlands, geschreven voor lokale ondernemers, zonder designjargon.
- De site wordt bij de build vooraf gerenderd (`output: "export"`, geen Node-server). H1, title, description en canonical staan in de HTML van elke pagina, de intro-tekst ook (behalve op de 404, die er geen `<p>` voor heeft). Voor SEO is geen SSR nodig (gecontroleerd 2026-11-26).
- Elke pagina heeft `og:image` en `twitter:card` `summary_large_image`. Een nieuwe pagina met een eigen `openGraph`-blok heeft `images: [OG_BEELD]` nodig (`lib/structured-data.ts`), en `card` in het `twitter`-blok.
- Alleen in de browser: cookiebanner en Google Analytics, het tekenen van de aurora-achtergrond op de home (de lege `<canvas>` staat in de HTML), het wisselen van het H1-woord (in de H1 in de HTML staat alleen "lokale ondernemers", niet "regionale bedrijven"), klikmeting (`KlikMeter`), doorsturen van oude `?case=`-links (`OudeCaseLinks`), openklappen van de footerkolommen op desktop (`FooterKolommenOpen`) en reacties op invoer, zoals formuliermeldingen, de bedankkaart en het extra websiteveld in het contactformulier.

## Lokaal
- Dev server: `npx next dev -p 5002` (poort 5001 is van mijn portfolio).
- Dit draait al in een eigen Terminal-tabblad, dus start de server niet opnieuw.
- `npm run dev` gebruikt poort 1080 en wist eerst `.next`: niet gebruiken.

## Deploy-flow
- localhost → dev.disseldesign.com (staging, Hostinger) → main (live).
- Push nooit zelf naar GitHub. Ik zeg wanneer.
- Staging is de branch `experimental`. `deploy`, `ship` en `rollback` pushen: alleen draaien als ik het zeg.

## Werkwijze
- Kleinste complete wijziging, geen extra features erbij.
- Laat bij wijzigingen alleen de aangepaste regels zien (diff-stijl).
- Kort antwoorden, geen uitleg die ik niet vraag.

## Mappen
- `app/`: routes (App Router) en `sitemap.ts`; `aurora-demo/` bestaat alleen in dev
- `components/`: onderdelen, met submappen `dienst/`, `footer/`, `kennis/`, `ui/`, `werk/`
- `content/werk/`: casepagina's in MDX
- `lib/`: helpers, content, structured data, `supabase/`
- `public/`: beelden, `llms.txt`, `robots.txt`, `404.md`
- `docs/`: teksten en notities, `supabase/`
- `scripts/`: build-, controle- en deployscripts
- `out/`: statische build, wordt meegecommit voor Hostinger
- Root: `404.php` en `.htaccess` voor de server

## Scripts
| Commando | Doet |
|---|---|
| `npm run build` | statische build naar `out/` (draait eerst `check:content`) |
| `npm run check:content` | lengte van de kaartteksten van cases |
| `npm run check:agents` | controle voor AI-agents (standaard op live) |
| `node scripts/check-links.mjs` | interne links in `out/`, na een build |
| `npm run lint` | lint |
| `npm run start` | `next start` |
| `npm run deploy "bericht"` | build, commit en push naar staging |
| `npm run ship "bericht"` | feature-branch naar `main` (live) |
| `npm run rollback` | laatste ship op `main` terugdraaien |
