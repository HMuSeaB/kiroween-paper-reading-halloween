# Hooks

Kiro agent hooks for this repo. Enable agent hooks in Kiro IDE and this
repo's hooks run automatically.

## format-on-save.json

- **Trigger:** any save of `*.html`, `*.css`, `*.js`, `*.md`.
- **Action:** run `bash scripts/check.sh` (60 s timeout).
- **On failure:** notify the agent; nothing is auto-fixed.

## What `scripts/check.sh` checks

1. `node --check app.js` — JavaScript syntax.
2. No placeholder-image patterns in the source (`placehold.co`,
   `placeholder`, `via.placeholder`, `picsum.photos` as an image source).
   Link cards are allowed; fake images are not.
3. `.kiro/` exists at the repo root (Devpost requires it for judging).
4. `index.html`, `styles.css`, `app.js`, `README.md`, `LICENSE` all exist.
5. The five highlight classes (`hl-argument`, `hl-concept`,
   `hl-evidence`, `hl-concession`, `hl-method`) are defined in
   `styles.css`, and the five types are listed in `app.js`
   (the class name is built as `'hl-' + type` at render time).

Run it by hand any time:

```bash
bash scripts/check.sh
```
