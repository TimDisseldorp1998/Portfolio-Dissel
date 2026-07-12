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
        "relative w-full py-24 md:py-32",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
