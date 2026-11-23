# Product — Paper Reading, Halloween Costume Edition

Steering for Kiro (and any agent working on this repo). These are the
product's standing rules; follow them unless the user explicitly overrides
one for a specific change.

## What this product is

A dual-column annotated paper reader. Left: bilingual original + translation.
Right: paragraph-by-paragraph notes. Bottom: full-text logic skeleton.
Five highlight colours with fixed meanings: argument, concept, evidence,
concession, method. The Kiroween submission adds one thing only: a
one-click Halloween costume (night theme + animations). It does not
redesign the reader.

## Rules that never change

1. **Original first.** The author's words come first and are never
   rewritten. Highlights mark the author's words only.
2. **Notes are not the author's words.** Annotations are the reader's or
   AI's inference. Keep them in the right column, labelled, and never
   merge them into the highlighted text.
3. **Five colours, five meanings.** Never invent a sixth colour or reuse
   a colour for a different meaning. The legend is the contract.
4. **No placeholder media.** If media cannot be fetched, show a link
   card. Never render a fake image, a grey box pretending to be a
   figure, or a stock photo in place of the real media.
5. **Tweets stay lightweight.** Import the main post only; do not chase
   replies or comments. One-sentence summary, nothing more.
6. **The costume is presentation only.** The Halloween theme changes
   colours and decoration. It must never change, hide, or reorder
   reading content. Every feature works in both themes.
7. **Keep it static.** No build step, no backend, no accounts. A new
   contributor must be able to open `index.html` and read a paper.
8. **Don't oversell Kiro usage.** The README's "How Kiro was used"
   section must describe only what was actually used. If a feature
   (specs, hooks, MCP, Crew) was not used, do not claim it was.

## Tone of the code

- Plain, readable JavaScript; no framework, no cleverness.
- CSS variables for every colour; a new theme is a new set of variables,
  never a rewrite of the layout.
- Every user-facing string that explains a feature should be short
  enough to read at a glance.

## Definition of done (per change)

- Works from a local file and from a static host.
- Works in both themes and in original-only mode.
- `scripts/check.sh` passes (format + link check, see `.kiro/hooks/`).
- No placeholder images introduced; no highlight colour redefined.
