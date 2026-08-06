"use client";

import { AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/content";
import { ProjectDetailPanel } from "./ProjectDetailPanel";

/**
 * Losse laag om de case-drawer, zodat `Projects` hem via `next/dynamic` kan
 * inladen en framer-motion plus het hele paneel buiten de eerste bundel
 * blijven. Ze komen pas binnen zodra iemand een case opent.
 *
 * Dit component blijft daarna gemount: `AnimatePresence` heeft de wrapper
 * nodig om de sluit-animatie nog te kunnen draaien. Vandaar dat `project` hier
 * `null` mag zijn in plaats van dat de aanroeper het component weghaalt.
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
  return (
    <AnimatePresence>
      {project && (
        <ProjectDetailPanel project={project} onClose={onClose} />
      )}
    </AnimatePresence>
  );
}
