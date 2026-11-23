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

- [x] 2.1 Mobile rendering fixed and verified in real headless Chromium
        (2026-11-23): no horizontal overflow at 390 / 760 / 1280 px;
        dual columns already stacked at ≤760 px; tightened the topbar
        (smaller brand at ≤760 px) and paddings at ≤480 px. Topbar height
        390 px: 171 → 163 px; 760 px: 147 → 80 px. Original-only mode
        verified at all three widths (translation + notes hidden, no overflow).
- [x] 2.2 Night-theme contrast tuned (2026-11-23): measured all five
        highlight colours in both themes. Day ratios 7.41–9.41 (unchanged).
        Night argument was the weakest at 4.92, so its gold was darkened
        #8a6d00 → #7a6000 (white-text ratio 4.92 → 6.00, now in line with
        the other night colours 6.45–7.55). Palette otherwise unchanged.
- [x] 2.3 Pre-loaded short-post example added (2026-11-23): one tweet-style
        card (melatonin / DNMT, main post only + one-sentence summary),
        seeded only when no short-posts key exists in localStorage; deleting
        it is permanent (verified: delete → 0 cards, reload → still 0).
        It lives below the importer and does not touch the sample paper flow
        (paragraph count still 5 on load).
- [x] 2.4 "How Kiro was used" section of README.md filled in (2026-11-23,
        spec / steering / hooks as they exist in .kiro/; no unused CLI /
        Crew / MCP claims).
- [x] 2.5 `scripts/check.sh` run after the changes: OK, all checks passed
        (2026-11-23). See OPTIMIZATION.md for the full verification log.

## Phase 3 — Ship (Devpost submission, deadline 2026-12-05 06:00 Beijing)

- [x] 3.1 Public GitHub repo created and pushed:
        https://github.com/HMuSeaB/kiroween-paper-reading-halloween
        (main, commit 3b067c7, 14 text files incl. .kiro/; demo mp4 is
        binary and was not pushed). NOTE: the Phase 2 changes in this
        round (styles.css / app.js / tasks.md / OPTIMIZATION.md) are
        local only and have NOT been pushed yet — push before submitting.
- [x] 3.2 Deployed to a public URL and verified:
        https://hmuseab.github.io/kiroween-paper-reading-halloween/
        (GitHub Pages, verified 2026-11-23 16:43). NOTE: Pages serves the
        last pushed commit, so re-verify after pushing the Phase 2 changes.
- [x] 3.3 Demo video recorded (< 3 min, public on YouTube):
        https://www.youtube.com/watch?v=mCnUCNSYZaQ (59 s).
        NOTE: the video still accurately shows the app — the Phase 2
        changes do not alter any flow it demonstrates (costume switch,
        colour filter, original-only, import all unchanged in behaviour);
        the new pre-loaded short-post card appears only below the importer
        and is not shown in the video. Re-recording is optional.
- [ ] 3.4 Write the Devpost submission: category Costume Contest,
        public repo URL, working app URL, text description, demo video
        URL, and the Kiro write-up (how Kiro was used)
- [ ] 3.5 Redeem the 4000 Kiro credits (if the credit email arrives) before
        2026-12-04 and confirm `Bonus credits → kiroween2026 = 4000`
        on the Kiro usage page
