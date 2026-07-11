import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "light" | "alt";
}

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
        variant === "alt" ? "bg-surface-alt" : "bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
