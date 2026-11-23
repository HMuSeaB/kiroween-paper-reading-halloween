# Optimization notes — 2026-11-23 (before Devpost submission)

Local-only changes; NOT pushed to GitHub, NOT submitted, NOT uploaded.

## What changed

### `styles.css`
- **Night-theme argument highlight darkened** `#8a6d00` → `#7a6000`.
  It was the weakest of the five night colours (white-text contrast 4.92,
  vs 6.45–7.55 for the others). Now 6.00, in line with the rest. The
  overall palette is unchanged; the other four night colours and all five
  day colours were left alone.
- **Mobile topbar tightened**: at ≤760 px the brand title is 1.25 rem
  (was 1.5 rem) and the pumpkin mark 1.6 rem; at ≤480 px main padding is
  14 px / 12 px, top-action buttons get tighter padding, paragraph
  padding drops to 14 px / 16 px. No layout structure changed.

### `app.js`
- **One pre-loaded short-post example** (`SAMPLE_SHORT_POSTS`): a
  tweet-style card about melatonin / DNMT (main post only + one-sentence
  Chinese summary), shown below the importer. It is seeded only when the
  `prh-shortposts` localStorage key does not exist yet — once the key
  exists (even as an empty list after deleting the example), it is never
  re-seeded, so deleting it is permanent. It does not touch the sample
  paper flow: paragraph count is still 5 on load.

### `.kiro/specs/paper-reading-halloween/tasks.md`
- Phase 2 items 2.1–2.5 marked done; Phase 3 items 3.1–3.3 marked done
  (repo pushed, Pages live, video public — all completed earlier on
  2026-11-23), with notes that the Phase 2 files still need pushing and
  Pages re-verifying after that push.

## Verification (real headless Chromium 157, Puppeteer, file:// load)

Baseline audit ran before the changes, full audit again after them.
Zero console errors in both runs.

| Check | 390 px | 760 px | 1280 px |
|---|---|---|---|
| Horizontal overflow | none | none | none |
| Dual columns | stacked (1 col) | stacked (1 col) | 2 col (639 + 399 px) |
| Original-only mode | notes + translation hidden, no overflow | same | same |
| Day highlight contrast (white/dark text) | 7.41–9.41 | 7.41–9.41 | 7.41–9.41 |
| Night highlight contrast (white text) | 6.00–7.55 | 6.00–7.55 | 6.00–7.55 |
| Topbar height (before → after) | 171 → 163 px | 147 → 80 px | 95 px (unchanged) |

Feature checks after the changes (all passed):
- Costume switch toggles `body.halloween`, button label flips.
- Colour filter: clicking a chip dims that colour's marks; "全部显示" restores all.
- Favourite: toggles `.fav` on the paragraph, persists to localStorage.
- Personal note: typed text persists to localStorage.
- Paste-import: two pasted paragraphs added, count 5 → 7.
- Tweet import: adds a short-post card.
- Seeded short post: 1 card on fresh load with the correct summary;
  delete → 0 cards; reload → still 0 (no re-seeding).

`bash scripts/check.sh` → **OK: all checks passed**.

## Demo video

`demo/kiroween-demo.mp4` (59 s) **still accurately shows the app** and does
not need re-recording: none of the flows it demonstrates (costume switch,
colour filter, original-only mode, paste-import) changed in behaviour.
The new pre-loaded short-post card appears only below the importer area,
which the video does not show. Re-recording is optional.

## Still to do before submitting

1. Push the Phase 2 changes (styles.css, app.js, tasks.md, OPTIMIZATION.md)
   to `HMuSeaB/kiroween-paper-reading-halloween` on main.
2. Re-verify the GitHub Pages URL after the push.
3. Submit on Devpost (Costume Contest) before 2026-12-05 06:00 Beijing.
