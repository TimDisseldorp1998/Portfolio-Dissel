import type { MDXComponents } from "mdx/types";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Opmaak voor de MDX-casebestanden in content/werk/. Verplicht bestand voor
 * @next/mdx in de App Router.
 *
 * Zelfde vorm als de oude case-popup: sectiekoppen als klein kopje in
 * hoofdletters, tekst in één leeskolom. Elk stuk schuift in beeld zodra je
 * erlangs scrollt (zelfde Reveal als op home). De tekst staat ook zonder
 * JavaScript in de HTML; Reveal regelt alleen de zichtbaarheid.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <Reveal y={16} className="mt-10 first:mt-0">
        <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
          {children}
        </h2>
      </Reveal>
    ),
    h3: ({ children }) => (
      <Reveal y={16} className="mt-6">
        <h3 className="font-heading text-lg font-semibold text-white">{children}</h3>
      </Reveal>
    ),
    p: ({ children }) => (
      <Reveal y={16} className="mt-4 first:mt-0">
        <p className="max-w-[68ch] leading-relaxed text-white/75">{children}</p>
      </Reveal>
    ),
    ul: ({ children }) => (
      <Reveal y={16} className="mt-4">
        <ul className="ml-5 max-w-[68ch] list-disc space-y-2 leading-relaxed text-white/75 marker:text-white/30">
          {children}
        </ul>
      </Reveal>
    ),
    ...components,
  };
}
