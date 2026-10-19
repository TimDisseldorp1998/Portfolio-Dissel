/**
 * De duik in een case: het beeld van een kaart maakt zich los, vliegt naar de
 * plek van de hero bovenaan de casepagina, de pagina erachter zakt weg, en de
 * nieuwe pagina neemt de foto naadloos over. Gebruikt door de vorige/volgende-
 * kaarten (CaseNavigatie) en de grote kaarten op home (CaseKaart).
 *
 * Voorwaarden: het beeld (`bron`) is een direct kind van de kaart (de
 * startrechthoek en hoekradius komen van `bron.parentElement`), en het is
 * hetzelfde bestand als de hero van de case (heroBeeld in lib/werk.ts).
 *
 * De overlay hangt direct aan <body>, buiten React. Zo overleeft hij de
 * navigatie. Alleen aanroepen vanuit een client component.
 */

/** Van de kaart naar de hero, en daarna het donker laten wegzakken. */
const IN_MS = 750;
const UIT_MS = 650;
const EASE_IN = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_UIT = "cubic-bezier(0.22, 1, 0.36, 1)";

let bezig = false;

/** Waar de hero van de casepagina staat: bovenaan, volle breedte, 75svh
 *  met een minimum van 22rem. Zelfde maten als in app/werk/[slug]/page.tsx. */
function heroDoel() {
  const h = Math.max(window.innerHeight * 0.75, 22 * 16);
  return { left: 0, top: 0, width: window.innerWidth, height: h };
}

type Rect = { left: number; top: number; width: number; height: number };
const px = (r: Rect, radius: string) => ({
  left: `${r.left}px`,
  top: `${r.top}px`,
  width: `${r.width}px`,
  height: `${r.height}px`,
  borderRadius: radius,
});

function laag(stijl: Partial<CSSStyleDeclaration>) {
  const el = document.createElement("div");
  Object.assign(el.style, { position: "absolute", inset: "0", ...stijl });
  return el;
}

export function trekIn(
  bron: HTMLImageElement,
  href: string,
  navigeer: (url: string) => void,
  /** Hoe donker de kaart over de foto ligt bij de start (CaseNavigatie 0.5,
   *  de grote kaart op home 0). */
  { waas = 0.5 }: { waas?: number } = {}
) {
  if (bezig) return;
  bezig = true;

  const kaart = bron.parentElement!;
  const r = kaart.getBoundingClientRect();
  const radius = getComputedStyle(kaart).borderRadius;
  const html = document.documentElement;
  // De body is licht; zonder dit zie je lichte randen als de pagina wegzakt.
  const oudeBody = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#0a0a0f";

  // Achtergrond: het scherm wordt donker, zodat onder de hero niets van de
  // oude pagina overblijft.
  const achter = document.createElement("div");
  achter.setAttribute("aria-hidden", "true");
  Object.assign(achter.style, {
    position: "fixed",
    inset: "0",
    zIndex: "99",
    pointerEvents: "none",
    background: "#0a0a0f",
    opacity: "0",
  });

  // Het frame groeit van de kaart naar de plek van de hero. De foto zit er
  // met object-fit: cover in, dus de uitsnede klopt aan begin en eind
  // precies met de kaart en met de hero.
  const frame = document.createElement("div");
  frame.setAttribute("aria-hidden", "true");
  Object.assign(frame.style, {
    position: "fixed",
    overflow: "hidden",
    zIndex: "100",
    pointerEvents: "none",
    ...px(r, radius),
  });
  const foto = bron.cloneNode() as HTMLImageElement;
  const beeldSrc = bron.getAttribute("src");
  foto.removeAttribute("loading");
  Object.assign(foto.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "none",
    transform: "scale(1.04)",
  });
  // De donkere lagen van de kaart lossen op, het verloop van de hero komt op.
  const kaartWaas = laag({ background: "#0a0a0f", opacity: String(waas) });
  const kaartVerloop = laag({
    background: "linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0) 100%)",
  });
  const heroVerloop = laag({
    top: "50%",
    bottom: "-1px",
    background: "linear-gradient(to top, #0a0a0f, rgba(10,10,15,0))",
    opacity: "0",
  });
  frame.append(foto, kaartWaas, kaartVerloop, heroVerloop);
  document.body.append(achter, frame);

  const opties = { duration: IN_MS, easing: EASE_IN, fill: "forwards" as const };
  const main = document.getElementById("main");
  const wegzakken = main?.animate(
    [
      { transform: "scale(1)", filter: "blur(0px)" },
      { transform: "scale(0.94)", filter: "blur(6px)" },
    ],
    opties,
  );
  achter.animate([{ opacity: 0 }, { opacity: 1 }], opties);
  frame.animate([px(r, radius), px(heroDoel(), "0px")], opties);
  foto.animate([{ transform: "scale(1.04)" }, { transform: "scale(1)" }], opties);
  kaartWaas.animate([{ opacity: waas }, { opacity: 0 }], opties);
  kaartVerloop.animate([{ opacity: 1 }, { opacity: 0 }], opties);
  heroVerloop.animate([{ opacity: 0 }, { opacity: 1 }], opties);

  const oudScroll = html.style.scrollBehavior;

  window.setTimeout(() => {
    // Geen zacht scrollen naar boven onder de overlay door, en de tekst van
    // de nieuwe pagina wacht met opkomen tot de foto geland is.
    html.style.scrollBehavior = "auto";
    html.setAttribute("data-case-overgang", "");
    navigeer(href);

    // Met timers in plaats van animatieframes: een tabblad op de achtergrond
    // pauzeert die, en dan zou de overlay blijven liggen.
    const start = performance.now();
    const wacht = () => {
      // De URL verandert al voordat de nieuwe pagina staat. Klaar is hij als
      // de hero van de nieuwe case er is, met hetzelfde beeld als de kaart.
      // (Niet op de h1 letten: op home verandert die door de typemachine.)
      const heroImg = document.querySelector<HTMLImageElement>("[data-case-hero] img");
      const klaar = window.location.pathname === href && heroImg?.getAttribute("src") === beeldSrc;
      if (!klaar && performance.now() - start < 4000) {
        window.setTimeout(wacht, 30);
        return;
      }
      wegzakken?.cancel();
      window.scrollTo(0, 0);
      html.style.scrollBehavior = oudScroll;

      // Kleine correctie als de echte hero net anders valt dan berekend
      // (adresbalk op mobiel), daarna neemt de pagina het over.
      const hero = document.querySelector("[data-case-hero]")?.getBoundingClientRect();
      if (hero) frame.animate([px(heroDoel(), "0px"), px(hero, "0px")], { duration: 200, easing: EASE_UIT, fill: "forwards" });

      window.setTimeout(() => {
        // De hero ligt nu exact onder het frame. Het donker zakt weg en de
        // tekst komt op.
        html.removeAttribute("data-case-overgang");
        achter.animate([{ opacity: 1 }, { opacity: 0 }], { duration: UIT_MS, easing: EASE_UIT, fill: "forwards" });
        window.setTimeout(() => {
          frame.remove();
          achter.remove();
          document.body.style.backgroundColor = oudeBody;
          bezig = false;
        }, UIT_MS + 50);
      }, hero ? 200 : 0);
    };
    window.setTimeout(wacht, 30);
  }, IN_MS);
}
