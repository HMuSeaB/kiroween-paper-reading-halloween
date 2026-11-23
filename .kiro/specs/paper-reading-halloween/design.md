# Design — Paper Reading, Halloween Costume Edition

## Architecture

Standalone static site, three files, no framework, no build step:

```
index.html   structure + toolbar + import panels
styles.css   day theme + Halloween night theme (CSS variables)
app.js       data + rendering + interactions + localStorage
```

Why no framework: the submission is a costume over an existing reader.
A static app deploys anywhere (Cloudflare Pages / GitHub Pages / Vercel),
loads from a local file, and has nothing that can break at demo time.
The original space is a full TypeScript app; this scaffold is a fresh,
self-contained re-implementation of its reading features, not a copy of
its bundle.

## Theming

- All colours are CSS custom properties on `:root`.
- `body.halloween` redefines the same properties (dark night background
  `#120e1e`, pumpkin orange `#ff8c1a`, muted lavender-grey text).
- Highlight colours are also variables, so the five meanings survive the
  costume: in night mode they become darker, saturated fills with white
  text (`mark` gets `color: #fff` under `body.halloween`).
- Animations are CSS-only (`@keyframes fly`, `@keyframes bob`) on a
  decorative `.halloween-sky` strip that is `display: none` in day mode,
  so the night sky costs nothing in the default theme.

## Data model

```js
paragraph = {
  id: Number,
  en: [{ t: 'argument'|'concept'|'evidence'|'concession'|'method'|null,
         text: String }],
  zh: String,                 // translation
  note: String,               // paragraph-by-paragraph annotation
  media: null | { kind: 'youtube'|'image'|'video'|'link',
                  url: String, label: String }
}
```

- `en` segments carry the highlight type; `t: null` is unhighlighted text.
- Pasted paragraphs arrive with a single unhighlighted segment and a
  placeholder translation note — never fake a translation.
- Short posts are a separate list, rendered as cards with a one-sentence
  summary (first sentence of the pasted text).

## Persistence

`localStorage` keys, all namespaced `prh-`:

| key | value |
| --- | --- |
| `prh-halloween` | boolean — costume on/off |
| `prh-original` | boolean — original-only mode |
| `prh-favourites` | array of paragraph ids |
| `prh-notes` | `{ paragraphId: text }` |
| `prh-shortposts` | array of `{ text, summary, source }` |

No account, no server state. Private-mode failures are swallowed.

## Media handling

`detectMedia(url)` in `app.js`:

1. YouTube URL (watch / embed / shorts / youtu.be) → official
   `youtube-nocookie.com` embed iframe.
2. Image extension (`.png/.jpg/.gif/.webp/.svg`) → inline `<img>`.
3. Video extension (`.mp4/.webm/.mov`) → inline `<video controls>`.
4. Anything else → link card (dashed border, external link).
   Nothing is ever rendered as a placeholder image.

## Accessibility / readability

- Highlight meaning is also available as a `title` attribute and in the
  legend; colour is never the only signal (filter chips are labelled).
- Buttons use `aria-pressed`; the costume button announces its state.
- Night theme keeps body text `#f2ead8` on `#120e1e` for contrast;
  highlights use white text on dark fills.
- Layout collapses to one column under 760px; the notes column stacks
  below the original text.

## What this design deliberately does not do

- No PDF upload/parsing (out of scope, see requirements non-goals).
- No server, no database — the `.kiro/` spec and hooks live in the repo
  as evidence of the Kiro workflow, not as runtime code.
