#!/usr/bin/env bash
# Controleert wat AI-agents van de site verwachten (is-agentic.com-scan).
# Gebruik: npm run check:agents [-- https://dev.disseldesign.com]
set -u
BASE="${1:-https://disseldesign.com}"
FOUT=0
ok()   { echo "✓ $1"; }
fout() { echo "❌ $1"; FOUT=1; }
# headers + body van één request, Accept als tweede argument
haal() { curl -sS -L -i -H "Accept: $2" "$BASE$1"; }

r=$(haal / text/markdown)
echo "$r" | grep -qi '^content-type: text/markdown' && ok "/ geeft Markdown bij Accept: text/markdown" || fout "/ geeft geen text/markdown"
echo "$r" | tr -d '\r' | grep -iE '^vary:' | grep -qiE '(:|,) *accept *(,|$)' && ok "Vary: Accept op /" || fout "Vary mist Accept op /"
echo "$r" | grep -q '^# DisselDesign' && ok "Markdown-body begint met # DisselDesign" || fout "Markdown-body ontbreekt"

r=$(haal / text/html)
echo "$r" | grep -qi '^content-type: text/html' && ok "/ geeft HTML bij Accept: text/html" || fout "/ geeft geen HTML meer"
echo "$r" | grep -q 'property="og:image"' && ok "og:image op /" || fout "og:image ontbreekt"
echo "$r" | grep -q 'property="og:type"' && echo "$r" | grep -q 'rel="canonical"' && echo "$r" | grep -q '<html lang="nl"' && ok "canonical, lang en og:type op /" || fout "canonical/lang/og:type ontbreekt"
echo "$r" | grep -q '"contactPoint"' && ok "contactPoint in JSON-LD" || fout "contactPoint ontbreekt"

r=$(haal /__bestaat-niet-$$ text/markdown)
echo "$r" | grep -q '^HTTP/[0-9.]* 404' && echo "$r" | grep -qi '^content-type: text/markdown' && echo "$r" | grep -q 'llms.txt' && ok "404 met Markdown-body en link" || fout "404 geeft geen Markdown"
r=$(haal /__bestaat-niet-$$ text/html)
echo "$r" | grep -q '^HTTP/[0-9.]* 404' && echo "$r" | grep -qi '^content-type: text/html' && ok "404 met HTML voor browsers" || fout "404 HTML kapot"

r=$(haal /llms.txt '*/*')
echo "$r" | grep -qi '(when to use)' && ok "llms.txt heeft when-to-use" || fout "llms.txt mist when-to-use"
echo "$r" | grep -qi '^content-type: text/plain' && ok "llms.txt als tekst in de browser" || fout "llms.txt niet als text/plain"

exit $FOUT
