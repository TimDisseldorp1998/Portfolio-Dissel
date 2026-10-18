import { Clock, Euro, KeyRound, User, type LucideIcon } from "lucide-react";
import { site } from "@/lib/content";
import { Container } from "./ui/Container";

// Zelfde volgorde als site.hero.feiten.
const iconen: LucideIcon[] = [Euro, User, Clock, KeyRound];

/**
 * Smalle strook tussen de hero en de diensten met de vier feiten die een
 * klant vooraf weet. Staat los van de hero, zodat die rustig blijft.
 */
export function Feitenstrook() {
  return (
    <div className="border-t border-white/[0.08] bg-surface-dark text-white">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4 lg:py-8">
          {site.hero.feiten.map((feit, i) => {
            const Icon = iconen[i];
            return (
              <li key={feit} className="flex items-center gap-3 text-sm leading-snug text-white/75 sm:text-[15px]">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-primary">
                  <Icon size={17} strokeWidth={2} aria-hidden />
                </span>
                {feit}
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
