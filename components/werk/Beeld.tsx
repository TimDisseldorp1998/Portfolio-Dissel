/**
 * Beeld in een casebestand: `<Beeld src="…" alt="…" bijschrift="…" />`.
 * Standaardmaat 3840×2740 is die van alle huidige mockups; zet `breedte` en
 * `hoogte` als een beeld een andere verhouding heeft, anders verspringt de
 * pagina tijdens het laden.
 */
export function Beeld({
  src,
  alt,
  bijschrift,
  breedte = 3840,
  hoogte = 2740,
}: {
  src: string;
  alt: string;
  bijschrift?: string;
  breedte?: number;
  hoogte?: number;
}) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={breedte}
        height={hoogte}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-3xl bg-white/[0.04]"
      />
      {bijschrift && (
        <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-white/50">
          {bijschrift}
        </figcaption>
      )}
    </figure>
  );
}
