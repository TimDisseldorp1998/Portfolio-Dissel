import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/70 border border-black/[0.06] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}
