import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "light" | "alt" | "dark";
}

const variantClasses: Record<NonNullable<SectionProps["variant"]>, string> = {
  light: "bg-surface",
  alt: "bg-surface-alt",
  dark: "bg-surface-dark text-white",
};

export function Section({
  className,
  variant = "light",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        // Alle secties delen dezelfde donkere achtergrond, dus tussen twee
        // secties lees je de padding van beide als één leeg vlak: 2x deze
        // waarde. Op 128px was dat 256px, ruim een kwart beeldscherm zonder
        // iets erin. 96px houdt de lucht, maar halveert de leegte niet.
        "relative w-full py-20 md:py-24",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
