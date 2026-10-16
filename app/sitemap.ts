import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { alleCases } from "@/lib/werk";
import { SITE_URL } from "@/lib/structured-data";

// Statische export: wordt bij de build één keer als out/sitemap.xml geschreven.
export const dynamic = "force-static";

const APP = path.join(process.cwd(), "app");

/**
 * Elke map in app/ met een page.tsx is een route. Zo komt een nieuwe pagina
 * (fase 2: /diensten/ en de dienstpagina's) vanzelf in de sitemap. Mappen met
 * [slug] slaan we hier over; die routes komen uit hun eigen content.
 * page.dev.tsx telt niet mee: die bestaat alleen lokaal.
 */
function vasteRoutes(map = APP, pad = ""): string[] {
  const routes: string[] = [];
  for (const item of fs.readdirSync(map, { withFileTypes: true })) {
    if (item.isFile() && item.name === "page.tsx") routes.push(`${pad}/`);
    if (item.isDirectory() && !item.name.startsWith("[") && !item.name.startsWith("_")) {
      // Route-groepen als (site) tellen niet mee in de URL.
      const deel = item.name.startsWith("(") ? "" : `/${item.name}`;
      routes.push(...vasteRoutes(path.join(map, item.name), pad + deel));
    }
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cases = await alleCases();
  const routes = [...vasteRoutes(), ...cases.map((c) => `/werk/${c.slug}/`)];
  return routes.sort().map((route) => ({ url: `${SITE_URL}${route}` }));
}
