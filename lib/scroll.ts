/**
 * Gedeelde scroll-logica voor de anchor-links in de navbar en de footer.
 * Staat bewust buiten de componenten zodat er één implementatie is.
 */

/**
 * Custom rAF smooth-scroll. Scrolls each frame with `behavior: "instant"`, so
 * it bypasses the CSS `scroll-behavior: smooth` on <html> — the native
 * `scrollTo({ behavior: "smooth" })` silently fails over long distances when
 * both are set, which made "back to top" feel broken. Fixed duration keeps it
 * fast and consistent regardless of how far the target is.
 */
let scrollRAF = 0;

/**
 * True while a programmatic smooth-scroll is running. The navbar's scroll
 * listener reads it to skip the compact-while-scrolling shrink — tapping a nav
 * item should keep the pill at its resting size; only a real finger/wheel
 * scroll compacts it.
 */
let programmaticScroll = false;

export function isProgrammaticScroll() {
  return programmaticScroll;
}

export function animateScrollTo(targetY: number, duration = 600) {
  cancelAnimationFrame(scrollRAF);
  programmaticScroll = true;
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
    programmaticScroll = false;
    return;
  }
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo({
      top: startY + distance * easeOutCubic(t),
      behavior: "instant" as ScrollBehavior,
    });
    if (t < 1) {
      scrollRAF = requestAnimationFrame(step);
    } else {
      // Let the last settling scroll events flush before re-arming the
      // gesture-driven shrink, so the tail of the scroll doesn't blip the pill.
      window.setTimeout(() => {
        programmaticScroll = false;
      }, 80);
    }
  }
  scrollRAF = requestAnimationFrame(step);
}

/**
 * Smooth-scroll a nav target into view: center the section when it fits the
 * viewport, otherwise put its heading just below the top (40px on mobile
 * where the pill sits at the bottom, ~90px on desktop to clear the top pill).
 * This keeps the previous section (e.g. the blue hero) from peeking in.
 */
export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  prefersReducedMotion: boolean | null
) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const goTo = (y: number) =>
    prefersReducedMotion
      ? window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior })
      : animateScrollTo(y);

  if (id === "top") {
    e.preventDefault();
    goTo(0);
    history.replaceState(null, "", window.location.pathname);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();

  const rect = el.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const vh = window.innerHeight;
  const isDesktop = window.innerWidth >= 1024;
  const topClearance = isDesktop ? 90 : 40;

  let target: number;
  if (rect.height <= vh) {
    // Fits — center the block in the viewport.
    target = absoluteTop - (vh - rect.height) / 2;
  } else {
    // Taller than the viewport — heading near the top.
    const heading = el.querySelector("h2") ?? el;
    const headingTop = window.scrollY + heading.getBoundingClientRect().top;
    target = headingTop - topClearance;
  }

  goTo(Math.max(0, target));
  history.replaceState(null, "", href);
}
