# Design-spec: Portfolio-Dissel

Deze spec beschrijft de site zoals hij nu in de code staat: Next.js 14 (app router),
React 18, Tailwind 3.4 met een eigen thema. Tokens zijn Tailwind-namen, geen losse
CSS-variabelen — `bg-primary` en `text-ink` zijn wat je in de code schrijft.

## §1 — Richting

Richting: helder werk op een licht vlak, met kleur die alleen iets betekent als er iets
te doen is. De achtergrond is bijna wit, de tekst bijna zwart, en de drie merkkleuren —
cyaan, oranje, paars — komen samen in één verloop dat als accent terugkomt. Dat past bij
een productontwerper: de pagina laat het werk zien en gaat er zelf niet voor staan.

Signature: het verloop `bg-gradient-brand` loopt van cyaan via paars naar oranje, en komt
terug in de kop-tekst (`.text-gradient`) en in de gloed onder de primaire knop
(`shadow-glow`). Verder is de pagina rustig; secties wisselen alleen van achtergrond.

```tokens
# kleur — merk
--color-primary        #5CDDFF   ACTIE — knoppen, links en focusringen
--color-primary-600    #34C4EA   hover van de primaire knop
--color-primary-700    #2199BD   focus-outline
--color-secondary      #FF833D   tweede accent, alleen voor niet-primaire acties
--color-secondary-600  #E86610   hover van de secundaire knop
--color-tertiary       #8E5CE0   derde accent, alleen in het verloop en in illustraties

# kleur — tekst en vlak
--color-ink            #111114   koppen en bodytekst
--color-ink-muted      #5A5A66   bijschriften en labels
--color-ink-soft       #8C8C97   alleen decoratief, nooit voor tekst
--color-surface        #FAFAFA   paginaachtergrond
--color-surface-alt    #FFFFFF   afwisselende sectie en kaartvlak
--color-surface-dark   #0A0A0F   donkere sectie en voettekst
--color-wit            #FFFFFF   tekst op een donker of gevuld vlak

# type
--font-heading    Poppins           koppen, via var(--font-poppins)
--font-body       PlusJakartaSans   lopende tekst, via var(--font-jakarta)
--tracking-head   -0.02em           letterspatiëring op koppen

# ruimte
--spacing         4px    Tailwind-basis; gebruikte stappen: 2, 5, 6, 7, 10, 24, 32
--max-container   1200px  maximale breedte van de inhoud

# vorm
--radius-card     16px    kaarten (rounded-2xl)
--radius-pill     9999px  knoppen (rounded-full)

# diepte
--shadow-soft     0_20px_60px_-20px_rgba(17,17,20,0.12)      kaarten in rust
--shadow-glow     0_0_0_1px_rgba(92,221,255,0.22),0_20px_60px_-20px_rgba(92,221,255,0.55)  primaire knop en kaart-hover

# beweging
--dur-fast        200ms   knoppen en kleurwissels
--dur-reveal      800ms   het in beeld schuiven van een blok
--ease-standard   ease-out
```

## §2 — Kleur

Drie merkkleuren, twee vlakken en drie tekstniveaus. Cyaan is de enige kleur die actie
betekent. Oranje en paars zijn accenten en dragen nooit tekst die gelezen moet worden —
zie de openstaande punten in §10.

| voorgrond | achtergrond | ratio | eis | gebruikt voor |
|---|---|---|---|---|
| `--color-ink` | `--color-surface` | 18,1:1 | ≥ 4,5 | koppen en bodytekst |
| `--color-ink-muted` | `--color-surface` | 6,5:1 | ≥ 4,5 | bijschriften en labels |
| `--color-ink` | `--color-primary` | 11,9:1 | ≥ 4,5 | tekst op de primaire knop |
| `--color-wit` | `--color-surface-dark` | 19,8:1 | ≥ 4,5 | tekst in de donkere sectie |
| `--color-tertiary` | `--color-surface` | 4,2:1 | ≥ 3 | alleen grote tekst en iconen |
| `--color-ink` | `--color-secondary` | 7,7:1 | ≥ 4,5 | tekst op de secundaire knop |

Let op de secundaire knop: donkere tekst op oranje haalt 7,7:1, wit haalt maar 2,5:1. De
code gebruikt op dit moment nog wit — dat staat als blokkerend punt in §10.

`--color-tertiary` haalt 4,2:1 en is daarmee alleen geschikt voor grote tekst en iconen,
nooit voor lopende tekst.

## §3 — Typografie

Twee letters. Poppins voor koppen, omdat de gesloten vormen op grote maten rustig blijven.
Plus Jakarta Sans voor lopende tekst en labels, omdat die op kleine maten open blijft.
Beide via `next/font` als CSS-variabele, zodat Tailwind ze als `font-heading` en
`font-body` kan aanspreken.

| rol | letter | grootte | gewicht | regelhoogte | letterspatiëring |
|---|---|---|---|---|---|
| h1 | `--font-heading` | clamp(2.5rem,6vw,4.5rem) | 700 | 1.05 | `--tracking-head` |
| h2 | `--font-heading` | clamp(2rem,4vw,3rem) | 600 | 1.1 | `--tracking-head` |
| h3 | `--font-heading` | 1.25rem | 600 | 1.3 | `--tracking-head` |
| body | `--font-body` | 1rem | 400 | 1.6 | 0 |
| label | `--font-body` | 0.875rem | 500 | 1.4 | 0 |

## §4 — Ruimte en vorm

De spacing-schaal is Tailwind op `--spacing`, met de stappen 2, 5, 6, 7, 10, 24 en 32.
Verticale sectieruimte is stap 24 op mobiel en stap 32 vanaf `md`. Horizontaal is het
stap 6 op mobiel en stap 10 vanaf `md`, binnen `--max-container`.

Twee afrondingen: `--radius-card` voor kaarten en panelen, `--radius-pill` voor knoppen.
Meer dan twee betekent dat er geen systeem is.

Diepte: `--shadow-soft` op een kaart in rust, `--shadow-glow` bij hover en op de primaire
knop. De donkere sectie gebruikt geen schaduw maar contrast.

## §5 — Componenten en states

### Section

De buitenste laag van elk blok: volle breedte, verticale ruimte, en een van drie vlakken.
Neemt een `id` zodat ankerlinks werken. Geen eigen states.

| state | achtergrond | tekst | overig |
|---|---|---|---|
| light | `--color-surface` | `--color-ink` | standaard |
| alt | `--color-surface-alt` | `--color-ink` | afwisselend blok |
| dark | `--color-surface-dark` | `--color-wit` | voettekst en accentblok |

### Container

Centreert de inhoud op `--max-container` en zet de horizontale ruimte. Geen eigen kleuren
en geen states; hij bestaat alleen om de breedte overal gelijk te houden.

### Button

Een pil met `--radius-pill`, in vier varianten. De primaire is de enige met `--color-primary`
als vulling; die kleur betekent actie en staat nergens anders als vlak.

| state | achtergrond | rand | tekst | overig |
|---|---|---|---|---|
| rust | `--color-primary` | geen | `--color-ink` | `--shadow-glow` |
| hover | `--color-primary-600` | geen | `--color-ink` | schuift 2px omhoog |
| focus | `--color-primary` | `--color-primary-700` | `--color-ink` | ring van 2px met offset |
| uitgeschakeld | `--color-primary` | geen | `--color-ink` | halve dekking, niet klikbaar |

### Card

Een vlak met `--radius-card` op `--color-surface-alt`, met een dunne rand en `--shadow-soft`.
Bij hover komt hij omhoog en wisselt de schaduw naar `--shadow-glow`.

| state | achtergrond | rand | schaduw |
|---|---|---|---|
| rust | `--color-surface-alt` | 1px `--color-ink-soft` | `--shadow-soft` |
| hover | `--color-surface-alt` | 1px `--color-primary` | `--shadow-glow` |
| focus | `--color-surface-alt` | 1px `--color-primary-700` | `--shadow-glow` |

### Reveal

Geen zichtbaar component maar een wikkel: hij laat zijn inhoud van onderen in beeld
schuiven zodra die in zicht komt, over `--dur-reveal`. Bij `prefers-reduced-motion`
verschijnt de inhoud direct, zonder beweging. Geen eigen states.

## §6 — Secties

### Hero

Doel: in één scherm duidelijk maken wie Tim is en wat hij maakt.

Inhoud: een grote paginakop met het verloop op een deel van de tekst, een introregel, en één
**Button** in de primaire variant.

Desktop: een **Section** in de variant light met daarin een **Container**; één kolom, links
uitgelijnd, met stap 32 verticale ruimte. De **Button** staat onder de introregel met stap
10 ertussen. De kop komt binnen via **Reveal**.

Mobiel: dezelfde volgorde, verticale ruimte terug naar stap 24 en horizontaal stap 6. De
kop schaalt mee via de clamp uit §3.

### Services

Doel: laten zien welk soort werk Tim doet.

Inhoud: een sectiekop, een introregel, en drie **Card**-items met per kaart een titel en twee
regels tekst.

Desktop: een **Section** in de variant alt met een **Container**; drie kaarten naast elkaar
met stap 6 ertussen. De drie **Card**-items komen na elkaar binnen via **Reveal**.

Mobiel: één kolom, kaarten onder elkaar met stap 6 ertussen.

### Contact

Doel: bezoekers laten kiezen tussen mailen en het formulier invullen.

Inhoud: een sectiekop, een introregel, de contactgegevens, en een formulier met twee velden en
één **Button**.

Desktop: een **Section** in de variant light met een **Container**; twee kolommen met stap
10 ertussen. Links de kop en de gegevens, rechts het formulier op een **Card**. Beide
kolommen komen binnen via **Reveal**.

Mobiel: één kolom. De gegevens staan boven het formulier, omdat mailen op een telefoon de
kortste route is. Ruimte tussen de blokken is stap 6.

### Call to action

Doel: de bezoeker die tot hier gelezen heeft doorsturen naar het werk.

Inhoud: een sectiekop, één introregel, en één **Button** in de primaire variant die naar
`/werk` leidt.

Desktop: een **Section** in de variant dark met een **Container**; één kolom, links
uitgelijnd. De introregel is op 40 tekens gebroken zodat hij niet over de volle breedte
loopt. De **Button** staat eronder met stap 10 ertussen. Het blok komt binnen via **Reveal**.

Mobiel: dezelfde volgorde, één kolom.

De variant is dark en niet alt, omdat de secties ernaast (Projects, Contact) dat ook zijn:
`--color-surface-alt` scheelt maar 2% met `--color-surface` en leest dus als een gat in de
rij in plaats van als afwisseling. Op dit vlak is de kop `--color-wit` en de introregel wit
op 70% dekking; de knop houdt `--color-ink` op `--color-primary` uit §2.

## §7 — Beweging

Er is één herhalend patroon: **Reveal**. Elk blok schuift bij binnenkomst een klein stukje omhoog (stap 6 uit
`--spacing`) en verschijnt over `--dur-reveal` met `--ease-standard`. Blokken onder elkaar lopen met een
kleine vertraging na elkaar.

Alle overige overgangen zijn `--dur-fast`: de kleurwissel en de opwaartse verschuiving van
een **Button**, en de schaduwwissel van een **Card**.

Bij `prefers-reduced-motion` vervallen alle verschuivingen en verschijnt inhoud direct. Er
gaat geen informatie verloren, alleen beweging.

## §8 — Beeld

| plek | verhouding | onderwerp | status |
|---|---|---|---|
| projectkaart | 16:9 | schermafbeelding van het werk | ECHT — in de repo |
| ogo | 1:1 | woordmerk als component | ECHT — als component |

Fotografie van personen komt op de site niet voor. Iconen komen uit lucide-react en zijn
altijd SVG, nooit emoji. Het verloop uit §1 is geen beeld maar een achtergrond.

## §9 — Copy

Deze site heeft geen losse copy-regels in de spec staan, en dat is met opzet. Alle
zichtbare tekst leeft in `lib/content.ts` en wordt daaruit geïmporteerd — nooit hard in
een component getypt.

Waar wat staat:

- de kop, de introregel en de knoptekst van de Hero komen uit `site`
- de sectiekoppen en introregels komen per sectie uit hetzelfde bestand
- de contactgegevens en de formulierlabels komen uit `contact`

Nieuwe teksten horen dus eerst in `lib/content.ts` en dan pas in een component. Wie de
tekst van een sectie wil weten, leest dat bestand — niet deze spec.

## §10 — Openstaand

| onderwerp | wie | blokkerend |
|---|---|---|
| de secundaire knop gebruikt in de code nog wit op oranje (2,5:1); de spec schrijft `--color-ink` voor (7,7:1) | Tim | ja — tot dat aangepast is haalt die knop de eis niet |
| `--color-primary-700` op `--color-surface` haalt 3,2:1 | Tim | nee — alleen als focus-outline gebruikt, niet als tekst |
| `--color-ink-soft` op `--color-surface` haalt 3,2:1 | Tim | nee — staat in §1 als decoratief, moet zo blijven |
