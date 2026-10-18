import { Coffee } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Het vaste icoon voor "plan een kennismaking": Tim nodigt mensen uit voor een
 * kop koffie. Alleen bij die actie gebruiken, andere acties houden hun pijl.
 *
 * - `size`: "md" = 20px in knoppen, "sm" = 16px naast tekstlinks.
 * - `stoom="hover"`: de drie stoomlijntjes zijn in rust weg en stijgen op bij
 *   hover of focus op de ouder. Die ouder heeft dan `group` nodig. De
 *   animatie staat in globals.css onder `.koffie-stoom`.
 * - Kleur via currentColor; altijd aria-hidden, want er staat tekst naast of
 *   de ouder heeft een aria-label.
 */
export function KoffieIcoon({
  size = "md",
  stoom = "altijd",
  className,
}: {
  size?: "md" | "sm";
  stoom?: "altijd" | "hover";
  className?: string;
}) {
  const px = size === "md" ? 20 : 16;
  return (
    <Coffee
      size={px}
      strokeWidth={2}
      aria-hidden
      className={cn("shrink-0", stoom === "hover" && "koffie-stoom", className)}
    />
  );
}
