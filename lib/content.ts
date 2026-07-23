/**
 * All personal content lives here.
 * Update your name, tagline, projects, experience, and links in this file.
 */

export const site = {
  name: "Tim Disseldorp",
  shortName: "Tim",
  role: "UX Designer & Developer",
  location: "Amsterdam, NL",
  email: "info@disseldesign.com",
  tagline:
    "I design and build calm, considered digital products — where craft meets clarity.",
  hero: {
    eyebrow: "Gevestigd in Noord-Holland",
    // The headline ends with a rotating tail that types in/out (see Typewriter).
    // The first phrase is what renders server-side (SEO + no-JS fallback).
    headlinePrefix: "Digitale product designer",
    // "voor" is vaste tekst (wordt niet steeds opnieuw getypt); alleen de
    // woorden erna roteren via de Typewriter.
    headlineConnector: "voor",
    headlineRotating: [
      "lokale ondernemers",
      "regionale bedrijven",
    ],
    subtitle:
      "Ik ontwerp en bouw websites voor lokale ondernemers, van huisstijl tot live site. Strak design, snel opgeleverd, zonder gedoe. Met één doel: meer bezoekers die klant worden.",
    // Contact is the primary (filled) action; work is the secondary (ghost) one.
    // The contact CTA targets the form anchor directly so the form lands in view.
    contactCta: { label: "Plan een kennismaking", href: "#contact-form" },
    workCta: { label: "Bekijk mijn werk", href: "#work" },
    /**
     * Client logo strip under the hero CTAs. SVGs live in /public/logos/
     * (all white/monochrome, so they sit muted on the dark hero).
     * `size` tweaks per-logo height so the marks are optically balanced.
     */
    trustedBy: {
      label: "Merken waar ik de afgelopen jaren aan werkte",
      logos: [
        { src: "/logos/ziggodome-logo.svg", alt: "Ziggo Dome", size: "h-10 sm:h-11" },
        { src: "/logos/new-edition-logo.svg", alt: "New Edition", size: "h-7 sm:h-8" },
        { src: "/logos/dtx-logo.svg", alt: "DTX", size: "h-8 sm:h-9" },
        { src: "/logos/1608-logo.svg", alt: "1608", size: "h-5 sm:h-6" },
      ],
    },
    /**
     * Subtiele klantreviews rechtsonder in de hero (dark glassmorphism, geen
     * sterren). De quotes zijn placeholder: vervang ze door de echte reviews.
     */
    reviews: [
      {
        quote:
          "Super blij met de stijl van de website, precies zoals we het in ons hoofd hadden. Erg fijne samenwerking gehad en we hebben inmiddels de eerste oppasdiensten via het platform lopen.",
        author: "Madelief",
        role: "Founder de Kleintjes van Alkmaar",
        initials: "K",
        logo: "/logos/kleintjes-van-alkmaar-logo.png",
      },
      {
        quote:
          "Vanuit alleen een logo en paar kleuren, en snel geschakeld met Tim. De website ziet er professioneel en modern uit en werkt top.",
        author: "Sjoerd Avis",
        role: "Founder De-Stock.nl",
        initials: "D",
        logo: "/logos/de-stock-logo.png",
      },
    ],
  },
};

export const nav = [
  { label: "Diensten", href: "#services" },
  { label: "Werk", href: "#work" },
  { label: "Over mij", href: "#about" },
];

export const about = {
  paragraph:
    "I've spent the last decade at the intersection of design and engineering — leading product teams, shipping interfaces, and obsessing over the small details that make software feel considered. Currently freelancing on a handful of thoughtful projects.",
  details: [
    {
      title: "Design",
      body: "Systems thinking, typography, motion, and interaction — with taste.",
    },
    {
      title: "Engineering",
      body: "Modern web stacks: React, Next.js, TypeScript, and everything around them.",
    },
    {
      title: "Product",
      body: "From zero-to-one prototypes to mature systems used by millions.",
    },
  ],
};

/**
 * Bento content — replaces the plain About with a data-rich grid.
 * Placeholder images live in /public/bento/* (swap them for real ones).
 */
export const bento = {
  intro: {
    title:
      "Creatieve digitale product designer met een oog voor detail. Ik ontwerp en bouw producten die net zo goed presteren als ze eruitzien.",
    resumeHref: "#",
  },
  background: {
    paragraphs: [
      "Ik ben Tim Disseldorp, product designer. Alweer 6+ jaar ervaring en sinds 2024 voor mezelf begonnen. Daarnaast actief bij een e-commercebureau in Alkmaar. Disseldesign is geen team, geen manager, geen doorgeefluik. Je praat met de persoon die het ook daadwerkelijk maakt. Sprintklusjes binnen een week, marathonprojecten in twee tot vier weken. Nooit half af.",
      "Ik ontwerp websites voor lokale ondernemers en regionale bedrijven. Maar eerlijk: iedereen is welkom, van eenmanszaak tot groot merk. Ik ontwierp de website van de Ziggo Dome, die van de kapper om de hoek en hielp een vriend met zijn retailbedrijf. Dezelfde vragen, dezelfde tests, dezelfde tijd en aandacht.",
      "Zin in een koffie en wil je praten over je ambitie? Ik reageer ook op zondagavond. 😉",
    ],
  },
  portrait: {
    // Chat-style messages that animate in one by one, hold, then clear.
    messages: [
      "Hoi daar! 👋",
      "Mijn naam is Tim Disseldorp.",
      "Stuur me gerust een berichtje!",
    ],
  },
  // Slider photos live in /public/bento/*.webp (1200×900). label + number
  // only show on hover, over a soft gradient.
  slider: [
    { label: "Start", src: "/bento/start.webp", alt: "Tim met het KvK-boekje 'Hoera, een eigen bedrijf'" },
    { label: "Focus", src: "/bento/focus.webp", alt: "Tim aan het werk achter zijn scherm" },
    { label: "Avontuur", src: "/bento/avontuur.webp", alt: "Tim bij het meer van Bled in Slovenië" },
    { label: "Werkplek", src: "/bento/werkplek.webp", alt: "Tim's werkplek met dubbele monitoren" },
  ],
  education: [
    { period: "2018 — 2022", type: "Bachelor", degree: "Communicatie en Multimedia Design", school: "Hogeschool van Amsterdam" },
    { period: "2021 — 2021", type: "Minor", degree: "Visueel Interface Design", school: "Hogeschool van Amsterdam" },
    { period: "2014 — 2017", type: "", degree: "Havo diploma (VAVO)", school: "R.O.C. Horizon College" },
    { period: "2010 — 2014", type: "", degree: "Mavo diploma", school: "Jac. P. Thijsse College" },
  ],
  tools: [
    { label: "Fg", name: "Figma", gradient: "from-purple-500 via-pink-500 to-orange-500" },
    { label: "Ps", name: "Photoshop", gradient: "from-blue-900 to-cyan-500" },
    { label: "Ai", name: "Illustrator", gradient: "from-orange-500 to-yellow-400" },
    { label: "Fr", name: "Framer", gradient: "from-blue-500 to-indigo-600" },
    { label: "Nt", name: "Notion", gradient: "from-neutral-800 to-neutral-500" },
    { label: "Vs", name: "VS Code", gradient: "from-sky-500 to-blue-600" },
    { label: "Cs", name: "Cursor", gradient: "from-neutral-900 to-neutral-700" },
    { label: "Ln", name: "Linear", gradient: "from-fuchsia-500 to-purple-600" },
    { label: "Sp", name: "Spotify", gradient: "from-emerald-400 to-emerald-600" },
    { label: "Sl", name: "Slack", gradient: "from-pink-500 to-yellow-500" },
  ],
};

/**
 * Contribution bullets are split into `lead` (the action, rendered bold for
 * scannability) and `rest` — keep the lead to the first 3–5 words.
 */
export type CaseSection = { heading: string; paragraphs: string[] };

export type ProjectDetail = {
  company: string;
  /** What I did — shown as "Rol" in the meta bar instead of the company name
   *  (which already appears as the drawer title). Falls back to `company`. */
  role?: string;
  year: string;
  type: string;
  overview: string;
  /** Full prose case (challenge / approach / result …). When present, the
   *  panel renders these sections instead of the contribution bullets. */
  body?: CaseSection[];
  contribution?: { lead: string; rest: string }[];
  slides: { label: string; gradient: string }[];
  /** Award link (e.g. Awwwards). Omit for projects without honors. */
  award?: { label: string; href: string };
};

export type Project = {
  title: string;
  /** Tekst in de case-kaart op de landingspagina. Maximaal 120 tekens —
   *  dit wordt afgedwongen door scripts/check-content.mjs, dat vóór elke
   *  build draait. Te lang = de build faalt. */
  description: string;
  tags: string[];
  href: string;
  accent: "primary" | "secondary" | "mix";
  detail: ProjectDetail;
};

export const projects: Project[] = [
  {
    title: "Kleintjes van Alkmaar",
    description:
      "Van idee naar merk en een tweezijdig oppasplatform: huisstijl, UX en alle schermen voor ouders én oppassers.",
    tags: ["Branding", "UX/UI", "Webdesign"],
    href: "https://kleintjesvanalkmaar.nl/",
    accent: "primary",
    detail: {
      company: "Kleintjes van Alkmaar",
      role: "Branding & UX/UI",
      year: "2025",
      type: "Web",
      overview:
        "Kleintjes van Alkmaar koppelt ouders aan een oppas, en oppassers aan een klusje waarmee ze wat bijverdienen. Het begon met een idee in de hoofden van de oprichters, verder was er niets: geen merk, geen schermen, geen structuur. Samen met developer Lucas werkte ik dat idee uit tot een compleet platform, van de huisstijl tot het laatste scherm.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "Een idee dat nog nergens stond, en een platform met twee heel verschillende kanten. Aan de ene kant ouders die een betrouwbare oppas zoeken. Aan de andere kant oppassers die zich aanbieden en wat willen bijverdienen. Allebei moeten ze zich meteen thuis voelen en snappen waar ze zijn. En omdat ouders hun kinderen uit handen geven, moet alles rust en vertrouwen uitstralen. Geen kille app, wel iets warms waar je je kleintjes met een gerust hart achterlaat.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "Het begon klein. Een paar zaterdagochtenden zaten we samen om tafel, de oprichters, Lucas en ik, om het idee uit te denken. Meedenken met de klant en een idee echt zien landen, dat vind ik het mooiste deel van het werk.",
            "Daarna ging ik schetsen. Eerst wireframes en de functies die er sowieso op moesten. Toen de huisstijl, want ook die was er nog niet: typografie, kleuren, knoppen, hiërarchie, ik mocht het helemaal zelf bepalen. Om zeker te weten dat de look-and-feel klopte met wat zij in hun hoofd hadden, maakte ik twee richtingen. Ze kozen versie A, en daarmee ontwierp ik de rest van de site.",
            "Voor de twee kanten van het platform gaf ik elke doelgroep een eigen kleur. Groen voor de oppassers, bruin voor de ouders. Zo zie je meteen op welke kant je zit en maak je minder snel een verkeerde klik.",
            "Ik werkte alle schermen uit voor mobiel en desktop, en voor de secties die lastig meebewegen ook een iPad-versie. Alles leverde ik aan als PDF zodat ze overal op konden schieten, met een sitemap en styleguide erbij zodat de stijl vastlag. Bij elke fase liet ik secties tussentijds zien en vroeg ik wat ze ervan vonden, zodat we snel konden bijsturen en door-itereren.",
            "Toen mijn ontwerp stond, pakte Lucas door. Hij bouwde de front-end en maakte het hele platform aan de achterkant werkend. De flow van die achterkant bedachten we samen, en ik ontwierp een paar schermen om ook de binnenkant er verzorgd uit te laten zien.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Van een idee op een zaterdagochtend naar een werkend platform dat ouders en oppassers bij elkaar brengt. Er staat nu een compleet merk waar eerst niets was, en een site die op elk scherm klopt, van de eerste schets tot de laatste knop.",
            "Voor mij een van de leukste projecten die ik voor mijn eigen bedrijf heb mogen doen. We konden goed met elkaar praten, gingen samen los op hun idee, en het eindresultaat mag er zijn.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Heb je een idee in je hoofd dat nog nergens staat? Vertel me over je project, dan kijk ik met je mee. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Homepage", gradient: "from-primary/70 via-primary-700/50 to-[#8E5CE0]/60" },
        { label: "Huisstijl", gradient: "from-[#8E5CE0]/60 via-primary/40 to-primary-800" },
        { label: "Twee kanten", gradient: "from-primary-400/60 via-[#8E5CE0]/40 to-primary-900" },
        { label: "Responsive schermen", gradient: "from-primary/60 via-primary-800 to-[#8E5CE0]/40" },
      ],
    },
  },
  {
    title: "De-Stock",
    description:
      "Huisstijl en website voor groothandel De-Stock, opgebouwd vanaf één logo en gericht op één stap: voorraad aanbieden.",
    tags: ["Branding", "Webdesign", "UX"],
    href: "https://de-stock.nl/",
    accent: "secondary",
    detail: {
      company: "De-Stock",
      role: "Branding & webdesign",
      year: "2025",
      type: "Web",
      overview:
        "De-Stock koopt restpartijen en overtollige voorraad van bedrijven op. Ze kwamen bij me met precies één ding: een logo. Geen huisstijl, geen site, geen structuur. Daar ontwierp ik een complete website omheen, van merk tot live pagina's, met één actie in het middelpunt: je voorraad aanbieden. Rustig en strak, en gemaakt om vertrouwen te wekken bij een bedrijf dat je nog niet kent.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "Een nieuw bedrijf in een markt die er online vaak rommelig uitziet. Kijk naar de meeste opkopers en je ziet volgestampte pagina's, muren van tekst en een verkooppraatje dat over je heen komt. De-Stock moest er vanaf dag één staan als een partij die je durft te bellen met een volle vrachtwagen incourante voorraad. Betrouwbaar en professioneel, zonder poeha. En het belangrijkste: iemand met stilstaande voorraad moest die in een paar stappen kunnen aanbieden, zonder te verdwalen.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "Eerst de structuur. Samen met Sjoerd bouwde ik de sitemap: welke pagina's, welke volgorde, en hoe iemand van binnenkomst naar het aanbiedformulier loopt. Korte lijntjes, snel schakelen. Hij leverde de content, ik zorgde dat alles op de juiste plek belandde.",
            "Daarna het merk. Van dat ene logo maakte ik een volledige huisstijl: kleur, typografie, knoppen, de hele look. Strak en professioneel, zodat een onbekend bedrijf meteen serieus overkomt.",
            "Voor de vorm koos ik een bento-grid. Losse blokken in een rustig raster, waarin de belangrijkste info direct te scannen is. Geen muur van tekst zoals bij de concurrent, wel een pagina die je in één oogopslag snapt.",
            "En de kern: het formulier waarmee bedrijven hun voorraad aanbieden. Dat is waar het werk binnenkomt, dus dat kreeg de hoofdrol. Elke pagina duwt de bezoeker naar die ene stap, van de homepage tot de aparte opkoper-pagina's per type partij.",
            "De techniek pakte ik samen met developer Lucas op. Hij bouwde de front-end en back-end en maakte het formulier en het menu werkend. Ik hield het concept, de branding en de flow in handen: hoe de site eruitziet en hoe je erdoorheen loopt.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Waar De-Stock begon met alleen een logo, staat er nu een compleet merk en een werkende website. De vorm is rustig en professioneel, en de hele opzet leidt de bezoeker naar één stap: zijn voorraad aanbieden. Elk type partij heeft een eigen opkoper-pagina, dus de site groeit mee met wat er binnenkomt zonder dat het rommelig wordt.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Begin je met niet meer dan een logo, of loopt je huidige site achter op wat je bedrijf nodig heeft? Vertel me over je project, dan kijk ik met je mee. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Homepage", gradient: "from-secondary/70 via-secondary-700/50 to-primary-900" },
        { label: "Huisstijl", gradient: "from-secondary-400/60 via-secondary/40 to-[#8E5CE0]/50" },
        { label: "Aanbiedformulier", gradient: "from-primary/50 via-secondary/50 to-secondary-800" },
        { label: "Opkoper-pagina", gradient: "from-secondary-800 via-secondary/40 to-primary-900" },
      ],
    },
  },
  {
    title: "Ziggo Dome",
    description:
      "Mobile-first herontwerp van de Ziggo Dome-website. De belangrijkste acties liggen onder je duim, de agenda vooraan.",
    tags: ["Mobile-first", "UX-research", "Responsive"],
    href: "https://www.ziggodome.nl",
    accent: "mix",
    detail: {
      company: "Ziggo Dome",
      role: "Mobile-first",
      year: "2024",
      type: "Web",
      overview:
        "77% van de bezoekers kwam binnen op een telefoon. De site kwam uit 2015, werd in 2020 nog uitgeroepen tot beste website van het jaar, maar was nooit voor die telefoon gebouwd. Dat verschil los je niet op met een likje verf. Ik pakte de Ziggo Dome website aan als een compleet mobile-first website redesign: opnieuw opgebouwd vanaf het scherm waar de meeste mensen echt op zitten.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "Een geliefde site die stilletjes veroudert. De techniek onder de motorkap liep achter, features haperden, de laadtijd zakte weg. En al die tijd groeide het mobiele verkeer door op een fundament dat daar niet op was berekend.",
            "De doelgroep maakte het scherper. De grootste groep zit tussen de 25 en 34, maar het opvallende was dat écht elke leeftijd op mobiel binnenkwam, tot de oudere bezoeker aan toe. Geen kleine niche om voor te ontwerpen, wel de meerderheid. Dus daar begon het.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "Eerst luisteren. Ik sprak met medewerkers, met de organisatie en met bezoekers die maandelijks of jaarlijks kaarten kopen. Daaruit kwamen de keuzes die het redesign sturen.",
            "Mobile-first, letterlijk vanaf de duim. In tien jaar zijn telefoonschermen verdubbeld, waardoor de bovenkant onbereikbaar werd zonder je hand te verleggen. Ik verplaatste de belangrijkste acties naar een bottom-navigatie, binnen de zone die je duim moeiteloos haalt. De secundaire dingen schoven naar boven. Navigeren voelt daardoor rustig in één hand.",
            "De agenda werd het hart van de site. Events komen prominenter op de homepage, de eventpagina's zijn persoonlijker. Daaromheen een interface in de stijl van Netflix en Videoland: grote beelden die overgaan in video, dynamic scrolling, card-transitions, dark mode en micro-interacties die precies laten zien dat je actie is aangekomen. Geen los opgeplakte trends, wel bewegingen die de flow soepeler maken.",
            "Voor bezoekers die de zaal nog niet kennen bouwde ik een interactieve 3D-plattegrond. Drie verdiepingen, met gestures door de Ziggo Dome heen, van de begane grond tot het uitzicht vanaf de tribune op het podium. Rondkijken voordat je een kaartje koopt.",
            "Wireframes toetste ik wekelijks met de developers van Touch Creative, zodat elke keuze ook echt te bouwen was. Alle regels legde ik vast in een styleguide: kleuren, typografie, iconen, knoppen en hun hover-states, de micro-animaties. Eén document waar het team zonder ruis mee verder kon. Responsive was daarbij geen sluitstuk maar het uitgangspunt: consistent en bruikbaar op elk formaat.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Een site die doet wat de bezoeker verwacht op de plek waar hij hem gebruikt. De belangrijkste acties liggen onder je duim, de agenda duwt de eerstvolgende events naar voren en de 3D-plattegrond laat je binnenlopen voordat je koopt. Waar de oude site tegenwerkte op mobiel, werkt deze mee.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Loopt jouw site achter op je bezoekers? Vertel me over je project, dan kijk ik met je mee. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Mobile-first home", gradient: "from-primary/60 via-[#8E5CE0]/50 to-secondary/50" },
        { label: "Bottom-navigatie", gradient: "from-primary-800 via-primary/40 to-secondary/40" },
        { label: "Agenda", gradient: "from-[#8E5CE0]/50 via-primary-700/40 to-primary/60" },
        { label: "3D-plattegrond", gradient: "from-primary/50 via-[#8E5CE0]/40 to-secondary/50" },
      ],
    },
  },
  {
    title: "New Edition",
    description:
      "Nieuwe huisstijl doorvertaald naar een B2B-website, met een heldere route naar de Order Portal voor verkooppunten.",
    tags: ["Huisstijl", "Webdesign", "UX-onderzoek"],
    href: "https://www.newedition.nl/en/",
    accent: "primary",
    detail: {
      company: "New Edition",
      role: "Webdesign",
      year: "2023",
      type: "Web",
      overview:
        "De nieuwe merkidentiteit stond. Nu moest de website hem waarmaken. Ik ontwierp de site die de frisse huisstijl van New Edition doorvertaalt naar het scherm, met een heldere route naar de Order Portal voor bestaande en nieuwe verkooppunten. Twee latere projecten bouwden voort op dit webdesign.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "New Edition ontwikkelt al tien jaar woon- en lifestyleproducten voor merken als Pip Studio en VT Wonen. Servies, bestek, tassen, loungewear. Een klein team dat wereldwijd concepten neerzet, gedreven door hun passie voor wonen.",
            "Na tien jaar paste het oude merk niet meer bij wie ze waren geworden. De uitstraling was strak en zakelijk, terwijl het bedrijf juist persoonlijk werkt. De website moest daarin mee: geen digitaal visitekaartje, wel een toegangspoort voor verkooppunten die in een paar klikken bij de Order Portal uitkomen. En de bezoekers zoeken niet hetzelfde. De een wil bedrijfsinformatie, de ander wil meteen de beeldbank in.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "De identiteit kwam eerst. Het team van Touch Creative herontwierp het logo en de huisstijl van strak en zakelijk naar verfijnd en persoonlijk, met de ampersand als kern: het symbool voor Niels en Wouter, de twee mannen achter het bedrijf. Neutrale kleuren houden de aandacht bij de merken waarvoor ze werken, zonder zelf de show te stelen. Om het verhaal echt te maken schoten we op kantoor, zodat je de mensen en het proces achter de collecties ziet.",
            "Toen die identiteit goedgekeurd was, begon mijn deel: de website. Ik startte met gebruikersonderzoek om de verschillende bezoekers in kaart te brengen. Daaruit ontwierp ik een navigatie die simpel blijft, of je nu op laptop, tablet of telefoon kijkt. De wireframes liepen via een strak schema, elke fase afgesloten met één gerichte feedbackronde, zodat we snel en helder bleven.",
            "Alles legde ik vast in een uitgebreide styleguide. De afronding lag bij externe developers, dus die gids moest hún leidraad zijn: kleuren, typografie, componenten, één bron waar geen twijfel over bestaat. Verder voegde ik een productpagina toe die eerdere projecten laat zien. Geen verhaal over kwaliteit, maar het bewijs ervan, meteen zichtbaar voor een potentiële klant.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Een website die de nieuwe identiteit vasthoudt en tegelijk werkt als toegangspoort. Verkooppunten vinden hun weg naar de Order Portal zonder zoeken, de navigatie blijft rustig op elk scherm en de productpagina laat direct zien wat New Edition kan. Wat het bedrijf op kantoor uitstraalt, straalt de site nu ook uit.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Heb je een frisse huisstijl die nog niet online tot leven komt? Vertel me over je project, dan vertaal ik hem door naar een site die klopt. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Homepage", gradient: "from-primary/60 via-primary-800 to-[#8E5CE0]/40" },
        { label: "Logo & ampersand", gradient: "from-[#8E5CE0]/50 via-primary/40 to-primary-900" },
        { label: "Responsive navigatie", gradient: "from-primary-400/50 via-primary/30 to-primary-900" },
        { label: "Order Portal", gradient: "from-primary/50 via-[#8E5CE0]/40 to-secondary/40" },
        { label: "Productpagina", gradient: "from-primary-800 via-primary/40 to-[#8E5CE0]/50" },
      ],
    },
  },
  {
    title: "Kiln Coffee",
    description:
      "E-commerce voor een speciality-branderij, gebouwd rond verhaal en vakmanschap.",
    tags: ["E-commerce", "Shopify", "Brand"],
    href: "#",
    accent: "secondary",
    detail: {
      company: "Kiln",
      role: "E-commerce design",
      year: "2023",
      type: "E-commerce",
      overview:
        "Een e-commerce-ervaring waarin het verhaal vooropstaat: elke zak bonen krijgt de herkomst en het vakmanschap dat hij verdient.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Loopt jouw project ergens vast? Vertel me erover, dan kijk ik met je mee. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Productpagina", gradient: "from-secondary/70 via-secondary-800 to-primary-900" },
        { label: "Abonnement", gradient: "from-secondary-400/60 via-secondary/30 to-[#8E5CE0]/40" },
      ],
    },
  },
  {
    title: "Orbit Analytics",
    description:
      "Datavisualisatie voor een groei-analyseplatform.",
    tags: ["Data Viz", "Product", "TypeScript"],
    href: "#",
    accent: "mix",
    detail: {
      company: "Orbit",
      role: "Data-visualisatie",
      year: "2022",
      type: "Web",
      overview:
        "Datavisualisatie-schermen voor een groei-analyseplatform: dashboards die het verhaal achter de cijfers laten zien, niet alleen de cijfers.",
      body: [
        {
          heading: "De uitdaging",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          ],
        },
        {
          heading: "De aanpak",
          paragraphs: [
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          ],
        },
        {
          heading: "Het resultaat",
          paragraphs: [
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
          ],
        },
        {
          heading: "Zelf zoiets?",
          paragraphs: [
            "Loopt jouw project ergens vast? Vertel me erover, dan kijk ik met je mee. Een vrijblijvend gesprek is zo gepland.",
          ],
        },
      ],
      slides: [
        { label: "Dashboards", gradient: "from-primary/50 via-[#8E5CE0]/40 to-secondary/50" },
        { label: "Grafiek-kit", gradient: "from-secondary/50 via-primary-700/40 to-primary/50" },
      ],
    },
  },
];

export const skills = [
  {
    title: "Product Design",
    body: "UX research, IA, wireframes, high-fidelity design, prototyping.",
    icon: "Sparkles",
  },
  {
    title: "Design Systems",
    body: "Token architectures, component libraries, documentation.",
    icon: "Layers",
  },
  {
    title: "Front-end Engineering",
    body: "React, Next.js, TypeScript, Tailwind, Framer Motion.",
    icon: "Code2",
  },
  {
    title: "Brand & Identity",
    body: "Logos, typography systems, and visual language.",
    icon: "Palette",
  },
  {
    title: "Motion",
    body: "Micro-interactions, scroll choreography, and product delight.",
    icon: "Wand2",
  },
  {
    title: "Prototyping",
    body: "From Figma flows to working code prototypes in days, not weeks.",
    icon: "Zap",
  },
];

export const experience = [
  {
    role: "UX & UI Designer",
    company: "ShopCommerce",
    period: "2024 — heden",
    location: "Alkmaar",
  },
  {
    role: "UX & UI Designer",
    company: "Touch Creative",
    period: "2023 — 2024",
    location: "Amsterdam",
  },
  {
    role: "Allround Designer",
    company: "yourdutchmedia",
    period: "2021 — 2023",
    location: "Zwaag, Hoorn",
  },
  {
    role: "UX Designer stage",
    company: "Brick Zero",
    period: "2020 — 2020",
    location: "Castricum",
  },
];

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/timdisseldorp/",
    icon: "Linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/timdisseldorp/",
    icon: "Instagram",
  },
];

/**
 * Contact form — real submissions go to formsubmit.co and forward to `site.email`.
 * NOTE: the very first submission triggers a confirmation email from formsubmit.co
 * to info@disseldesign.com — click the link in that email to activate the endpoint,
 * after that every submission lands directly in your inbox.
 */
export const contact = {
  endpoint: "https://formsubmit.co/ajax/info@disseldesign.com",
  projectTypes: [
    { value: "Branding", label: "Branding" },
    { value: "Web design", label: "Web design" },
    { value: "Development", label: "Development" },
    { value: "Anders", label: "Anders" },
  ],
};
