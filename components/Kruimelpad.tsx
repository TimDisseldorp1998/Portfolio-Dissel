import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/structured-data";

export type Kruimel = { naam: string; href: string };

/**
 * Breadcrumb op elke subpagina, met dezelfde stappen als BreadcrumbList in
 * JSON-LD. De laatste kruimel is de huidige pagina: zichtbaar als tekst,
 * in het schema wel met URL.
 */
export function Kruimelpad({ kruimels }: { kruimels: Kruimel[] }) {
  const alle: Kruimel[] = [{ naam: "Home", href: "/" }, ...kruimels];
  return (
    <>
      <nav aria-label="Kruimelpad" className="text-sm text-white/50">
        <ol className="flex flex-wrap items-center gap-2">
          {alle.map((k, i) => {
            const laatste = i === alle.length - 1;
            return (
              <li key={k.href} className="flex items-center gap-2">
                {laatste ? (
                  <span aria-current="page" className="text-white/80">
                    {k.naam}
                  </span>
                ) : (
                  <>
                    <a
                      href={k.href}
                      className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {k.naam}
                    </a>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: alle.map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: k.naam,
            item: `${SITE_URL}${k.href}`,
          })),
        }}
      />
    </>
  );
}
