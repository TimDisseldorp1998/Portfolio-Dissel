"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Timings for the type / hold / delete cycle. */
const HOLD_MS = 3200;
const TYPE_MS = 75;
const DELETE_MS = 40;

type Phase = "holding" | "deleting" | "typing";

/**
 * Cycles through `phrases` with a typewriter effect: types a phrase, holds it,
 * deletes it, then types the next — looping forever. The first phrase is the
 * initial state, so it renders complete on the server (good for SEO and no-JS).
 * The animated text is aria-hidden and a stable copy is exposed to screen
 * readers, so assistive tech reads one clean heading instead of every keystroke.
 * Honours prefers-reduced-motion by staying on the first phrase.
 */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    if (prefersReducedMotion || phrases.length < 2) return;

    let timer: number;
    if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      } else {
        timer = window.setTimeout(() => setText((t) => t.slice(0, -1)), DELETE_MS);
      }
    } else {
      const target = phrases[index];
      if (text.length === target.length) {
        setPhase("holding");
      } else {
        timer = window.setTimeout(
          () => setText(target.slice(0, text.length + 1)),
          TYPE_MS
        );
      }
    }
    return () => window.clearTimeout(timer);
  }, [phase, text, index, phrases, prefersReducedMotion]);

  return (
    <span>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="caret-blink ml-1.5 inline-block h-[0.78em] w-[0.055em] translate-y-[0.06em] rounded-full bg-primary align-baseline"
      />
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
