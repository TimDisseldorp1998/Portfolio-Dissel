import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client.
 *
 * De site is een statische export (next.config.js: output "export"), dus er is
 * geen server-runtime. Alle Supabase-communicatie loopt daarom vanuit de
 * browser, met de publieke publishable key. De database is beveiligd met RLS:
 * anonieme bezoekers mogen alleen inserten (formulieren indienen), niet lezen.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
