# Requirements — Paper Reading, Halloween Costume Edition

Kiroween 2026 · Costume Contest. Source feature set: the existing
paper-reading space (slug `lun-wen-yue-du`): dual-column annotated reading,
bilingual original + translation, five-colour highlights, paragraph-by-
paragraph notes, full-text logic skeleton, original-only mode, per-colour
filtering, favourites, personal notes, lightweight tweet/short-post import,
media support. New work: a one-click Halloween costume (night theme +
animations) that changes the look without changing the reading.

## 1. Core reading (must keep working)

- REQ-01: The reader shows paragraphs in two columns: left = original
  (English) + Chinese translation; right = paragraph-by-paragraph notes.
- REQ-02: Five highlight colours with fixed meanings — argument, concept,
  evidence, concession, method — applied only to the author's own words.
- REQ-03: Notes are shown separately from highlights and are labelled as
  the reader's / AI's inference, never presented as the author's words.
- REQ-04: A full-text logic skeleton (ordered list of the argument's steps)
  is shown below the reader.
- REQ-05: An original-only mode hides translation and the notes column and
  shows the original text alone.
- REQ-06: Per-colour filtering: toggling a colour dims its highlights;
  "show all" restores them. Filtering never deletes content.
- REQ-07: Each paragraph can be favourited and can hold a personal note;
  favourites and notes persist across reloads (localStorage).
- REQ-08: The app ships with a sample paper pre-loaded (5 paragraphs)
  so it is demoable without pasting anything.

## 2. Import

- REQ-09: Paste paper text; it is split into paragraphs on blank lines and
  appended as new paragraphs. No PDF upload (text paste only).
- REQ-10: Lightweight tweet / short-post import: paste a link or the post
  text; only the main post is taken (no replies / comments are chased);
  the result is a short-post card with a one-sentence summary.
- REQ-11: Media per paragraph: a YouTube URL renders the official embed;
  an image/video direct link renders inline; any other URL renders as a
  link card. Never use a placeholder image for media that could not be
  fetched.

## 3. Halloween costume (the new work)

- REQ-12: One-click costume switch toggles a Halloween night theme:
  dark night background, pumpkin-orange accents, readable contrast in
  both themes.
- REQ-13: The night theme adds Halloween animation (moon, flying bats,
  floating pumpkin) using CSS only; animations must not block reading
  or overlap text.
- REQ-14: All reading features (REQ-01–REQ-11) work identically in both
  themes. The costume changes presentation only.
- REQ-15: The chosen theme persists across reloads (localStorage).

## 4. Delivery constraints (Devpost / Kiroween rules)

- REQ-16: The project is a standalone static app: `index.html` +
  `styles.css` + `app.js`, no build step, no backend, no network
  dependency except user-added YouTube embeds.
- REQ-17: The repo root contains a `.kiro/` directory (specs, steering,
  hooks) showing Kiro usage; it must NOT be added to `.gitignore`.
- REQ-18: The repo is public and open source (MIT, see `LICENSE`).
- REQ-19: The app must be demoable from a static host and from a local
  file / local HTTP server.

## Non-goals

- No PDF parsing, no server-side annotation, no accounts, no AI
  generation inside the app itself (annotation content is authored
  or pasted by the user).
- No new reading features beyond the costume; the point of this
  submission is the costume, not a redesign of the reader.
