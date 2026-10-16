import type { MDXComponents } from "mdx/types";
import { Beeld } from "@/components/werk/Beeld";

/**
 * Opmaak voor de MDX-casebestanden in content/werk/. Verplicht bestand voor
 * @next/mdx in de App Router. Koppen, alinea's en lijsten krijgen hier de
 * site-stijl, zodat een casebestand alleen tekst en <Beeld> bevat.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-14 font-heading text-2xl font-semibold leading-tight text-white first:mt-0 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-heading text-lg font-semibold text-white">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 max-w-[68ch] leading-relaxed text-white/75">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="ml-5 mt-4 max-w-[68ch] list-disc space-y-2 leading-relaxed text-white/75 marker:text-white/30">
        {children}
      </ul>
    ),
    Beeld,
    ...components,
  };
}
