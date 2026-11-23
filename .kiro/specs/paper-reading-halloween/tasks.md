# Tasks — Paper Reading, Halloween Costume Edition

Status: scaffold complete in `~/workspace/kiroween-paper-reading-halloween/`.
Items marked [x] are done in this scaffold; [ ] items are the remaining
work before Devpost submission (see README for the full list).

## Phase 1 — Scaffold (done)

- [x] 1.1 Create standalone static app: `index.html` + `styles.css` + `app.js`
- [x] 1.2 Pre-load a 5-paragraph sample paper (bilingual, all five highlight
        colours, one link-card media example)
- [x] 1.3 Dual-column reader: left original + translation, right notes,
        logic skeleton below
- [x] 1.4 Five-colour highlights + per-colour filter chips + "show all"
- [x] 1.5 Original-only mode switch
- [x] 1.6 Favourites + personal notes, persisted in localStorage
- [x] 1.7 Paste-to-import paper text (blank-line paragraph splitting)
- [x] 1.8 Lightweight tweet / short-post import (main post only + one-sentence summary)
- [x] 1.9 Media support: YouTube official embed, image/video inline, link cards,
        never placeholder images
- [x] 1.10 Halloween costume: one-click night theme (pumpkin orange, dark
         background), CSS bat / moon / pumpkin animations, theme persisted
- [x] 1.11 Spec files: requirements.md, design.md, tasks.md (this file)
- [x] 1.12 Steering: `.kiro/steering/product.md`
- [x] 1.13 Hook: `.kiro/hooks/` format + link check on save
- [x] 1.14 README.md (run instructions, features, Kiro write-up placeholder)
- [x] 1.15 MIT LICENSE

## Phase 2 — Polish with Kiro (before submission)

- [ ] 2.1 Run the app in Kiro IDE; fix any rendering issue on mobile width
        (760px breakpoint) and in original-only mode
- [ ] 2.2 Tune the night theme: check highlight contrast in both themes
        with a real paper, not just the sample
- [ ] 2.3 Add one more sample: a short tweet import pre-loaded as an
        example short-post card (optional — only if it stays lightweight)
- [ ] 2.4 Fill in the "How Kiro was used" section of README.md with real
        usage (IDE / CLI / Crew, specs, steering, hooks, MCP — only what
        was actually used)
- [ ] 2.5 Run `scripts/check.sh` (see `.kiro/hooks/README.md`) before each commit

## Phase 3 — Ship (Devpost submission, deadline 2026-12-05 06:00 Beijing)

- [ ] 3.1 Create the public GitHub repo and push this directory
        (do NOT add `.kiro/` to `.gitignore`; the root must contain it)
- [ ] 3.2 Deploy the static files to a public URL (Cloudflare Pages /
        GitHub Pages / Vercel) and verify the live link
- [ ] 3.3 Record a demo video (< 3 min, public on YouTube) showing:
        the sample paper, the costume switch, a colour filter,
        original-only mode, and one import
- [ ] 3.4 Write the Devpost submission: category Costume Contest,
        public repo URL, working app URL, text description, demo video
        URL, and the Kiro write-up (how Kiro was used)
- [ ] 3.5 Redeem the 4000 Kiro credits (if the credit email arrives) before
        2026-12-04 and confirm `Bonus credits → kiroween2026 = 4000`
        on the Kiro usage page
