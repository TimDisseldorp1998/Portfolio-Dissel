/**
 * Zet structured data als `<script type="application/ld+json">` in de
 * server-HTML. `<` wordt ge-escaped, zodat een `</script>` in een tekstveld
 * het script-blok nooit voortijdig kan sluiten.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
