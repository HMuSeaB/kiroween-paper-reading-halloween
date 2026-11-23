# Kiroween 2026 — Demo Video Script

**Video:** `kiroween-demo.mp4`
**Duration:** 59.0 seconds (limit: under 3 minutes ✓)
**Resolution:** 1280 × 720, H.264, 30 fps
**File size:** 1,542,450 bytes (~1.5 MB)
**Audio:** none (captions only — no narration)

## How it was made

Real screen captures of the app, nothing AI-generated:

1. The app was driven in a real headless Chromium (via Puppeteer) with real
   mouse clicks: costume switch, colour-filter chips, original-only toggle,
   and a real paste-import that added paragraph §6.
2. Every click was verified in the browser before recording (see
   `verify.json` / `shots-verify.json` in the build notes): 5 sample
   paragraphs render, costume switch sets `body.halloween`, filter leaves
   exactly 1 bright "evidence" highlight and 4 dimmed ones, original-only
   hides the translation + notes column, import grows the count from
   "共 5 段" to "共 6 段". Zero console errors.
3. The video is assembled from those real screenshots with ffmpeg, plus a
   1.7 s clip of the real day → night theme fade captured by CDP screencast.
   On-screen captions (Chinese + English) are burned in with ffmpeg drawtext
   (Noto Sans CJK SC).

Suggested YouTube title: **论文阅读 · 万圣节换装版 — Paper Reading, Halloween Costume | Kiroween 2026**
Suggested description: Dual-column paper reader with bilingual text,
five-colour highlights and paragraph notes — with a one-click Halloween
costume. Built for Kiroween 2026, Costume Contest, with Kiro (spec-driven:
`.kiro/specs/paper-reading-halloween/`). MIT License.

## On-screen script (exact captions, in order)

| Time | Caption (as burned in) | What is shown |
|------|------------------------|---------------|
| 0:00–0:06 | 论文阅读 · 万圣节换装版 \| Paper Reading — Halloween Costume | Day theme, top of page, §1–§2 |
| 0:06–0:14 | 双栏批注 · 双语对照 · 五色高亮 \| Dual-column notes, bilingual text, five-colour highlights | Sample paper reading view (day) |
| 0:14–0:16 | 一键换装 \| One-click Halloween costume | Real recording of the day → night fade after clicking 🎃 万圣节换装 |
| 0:16–0:21 | 万圣节夜晚模式：月亮、蝙蝠、南瓜灯 \| Halloween night theme | Night theme top view — moon, bats, floating pumpkin |
| 0:21–0:27 | 逐段评注与全文逻辑骨架 \| Paragraph notes and logic skeleton | Night-theme reader, notes column |
| 0:27–0:35 | 按颜色筛选：只看「证据」\| Filter by colour — evidence only | Only the 证据 chip active; other highlights dimmed |
| 0:35–0:42 | 原文模式：只看原文 \| Original-only mode | Translation + notes column hidden, English only |
| 0:42–0:46 | 粘贴导入新段落 \| Paste to import | Import box with the new paragraph typed in |
| 0:46–0:53 | 新段落 §6 已加入，共 6 段 \| New paragraph §6 added — 6 paragraphs | Imported §6 + logic skeleton |
| 0:53–0:59 | Kiroween 2026 · Costume Contest \| Built with Kiro · MIT | Night theme, top of page (outro) |

## Upload checklist (for the user)

1. Upload `kiroween-demo.mp4` to YouTube, visibility **Public**.
2. Paste the video URL into the Devpost submission (demo video field).
3. The video is 59 s — well under the 3-minute limit.
