"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/content";
import { usePresence } from "@/lib/usePresence";
import { ProjectDetailPanel } from "./ProjectDetailPanel";

/** Moet gelijk lopen met de uit-animatie in globals.css. */
const EXIT_MS = 200;

/**
 * Losse laag om de case-drawer, zodat `Projects` hem via `next/dynamic` kan
 * inladen en het hele paneel buiten de eerste bundel blijft. Het komt pas
 * binnen zodra iemand een case opent.
 *
 * Dit component blijft daarna gemount: het houdt het paneel in de pagina tot
 * de uit-animatie klaar is. Vandaar dat `project` hier `null` mag zijn in
 * plaats van dat de aanroeper het component weghaalt.
 *
 * Default export, want dat verwacht `next/dynamic`.
 */
export default function ProjectDetailOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { mounted, state } = usePresence(project !== null, EXIT_MS);
  // Tijdens het sluiten is `project` al null, maar het paneel moet zijn
  // inhoud nog even houden om weg te kunnen animeren.
  const [laatste, setLaatste] = useState<Project | null>(project);

  useEffect(() => {
    if (project) setLaatste(project);
  }, [project]);

  if (!mounted || !laatste) return null;

  return (
    <ProjectDetailPanel project={laatste} onClose={onClose} state={state} />
  );
}
