# Kreatekno Website Rebuild — Plan

_Last updated: 2026-10-11 (milestones added)_

## Goal

Rebuild kreatekno.com from scratch as a **mobile-first, motion-rich website** that highlights real client use cases. All existing copywriting and the "AI employee" personas (Dana Wang, etc.) are dropped.

**Scope for v1:** an animated hero starring a **Pixar-style 3D character** (delivered as video) + light motion everywhere else. No CMS.

---

## Decisions so far

| Topic           | Decision                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero visual     | **Pixar-style 3D cartoon character, made with AI image → AI video**. No Blender, no live WebGL in v1                                                                                                                                        |
| Delivery format | **Scroll-scrubbed hero**: AI video → image sequence (WebP) drawn on a canvas, driven by scroll (16:9 desktop + 9:16 mobile sets). Text/CTAs as real HTML on top. Plain MP4 loops used elsewhere                                             |
| Compositing     | **Remotion** (React → MP4) to add text, chat bubbles, UI cards and logo around AI clips. **Free License applies** (for-profit with up to 3 employees; Kreatekno = 3). Re-check if the team grows beyond 3 → Company License at remotion.pro |
| AI generation   | **Higgsfield** with **Seedance** for video; image model inside Higgsfield (pick the one that keeps faces most consistent)                                                                                                                   |
| Use cases       | Generic capabilities on Home; real projects on the Portfolio page                                                                                                                                                                                                                                 |
| Build order     | **Website first** (2026-10-13). Hero and section backgrounds are **clean brand-color fills** for now; the scroll video frames get stitched in later. All AI assets will be regenerated after the site is built |
| CMS             | None — content lives in code (typed data files)                                                                                                                                                                                             |
| Copy & branding | Rebuilt from scratch                                                                                                                                                                                                                        |

**Rejected (2026-10-11):** Blender (no in-house need), code-built blocky character (looked too cheap — see `character-prototype/` for the test), live 3D hero in v1.

---

## Tech stack

| Layer             | Choice                                                                        | Why                                                                        |
| ----------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Framework         | **Next.js (App Router) + TypeScript**, statically generated (SSG)             | SEO: fully rendered HTML per page, metadata API, sitemap, fast first paint |
| Hero              | Pinned section + `<canvas>` image-sequence scrubber (GSAP ScrollTrigger)      | Smooth on iOS Safari (video seeking is not); frame-exact scroll control    |
| Motion            | **GSAP + ScrollTrigger**, **Lenis** smooth scroll                             | Industry standard, mobile-safe                                             |
| Video compositing | **Remotion** (already set up in `character-prototype/`)                       | Same React/TS as the site; renders both aspect ratios from one project     |
| Encoding          | ffmpeg (bundled with Remotion)                                                | H.264 MP4 + optional AV1/WebM                                              |
| Video hosting     | Vercel/Netlify static at first; Cloudflare R2 or Bunny CDN if bandwidth grows | Video bandwidth costs                                                      |
| Hosting           | Vercel or Netlify                                                             | Edge CDN, preview deploys                                                  |

---

## Character video pipeline (AI image → AI video)

### Tools (decided)

- **Platform:** Higgsfield
- **Video:** Seedance (image-to-video). Start & End Frame on Higgsfield requires the **Pro or Ultimate plan**; confirm the Seedance model shows an end-frame slot before committing
- **Image:** an image model inside Higgsfield (test which keeps the 3 characters most consistent)

### Steps

1. **Character design** — iterate on the image tool until the character is final. Style: Pixar-like 3D cartoon, big expressive eyes, soft rounded features, subsurface skin, soft studio light.
2. **Character sheet** — front / side / back + 4–5 expressions (happy, thinking, surprised, celebrating, neutral). This is the master reference for every clip.
3. **Key poses** — generate a start frame per scene in both 16:9 and 9:16 (generate natively per ratio; don't crop).
4. **Animate** — image-to-video from those start frames, one motion per clip (walk in + wave, thinking, surprised, celebrate). Always start from the master reference / character-reference feature to keep the character consistent.
5. **Select & clean** — pick best takes, trim, color-match across clips.
6. **Composite in Remotion** — add use-case story elements (WhatsApp chat bubbles, workflow nodes, result metrics, logo). Keep headline/CTA text **out** of the video — it stays HTML.
7. **Hero = one continuous shot** (5–8 s) with motion that reads well forwards _and_ backwards (slow orbit, walk toward camera, turn, gestures — no cuts or fast moves). Story beats line up with headline lines.
8. **Export** — frame sequence for the scroll hero + MP4 loops for other sections; see specs below.

### Consistency rules

- Same reference image + same style prompt block for every generation
- Same background color/lighting across clips (or a plain background for easy compositing)
- Keep a prompt log in `Assets/asset-prompts/` so any clip can be regenerated

### Folders

- `Assets/` — generated assets (character images, video clips, final exports)
- `Assets/asset-prompts/` — the prompts used for each asset, saved alongside so any asset can be regenerated

### Ownership

- Generate our own character; never use stock images (e.g. pngtree) beyond style reference
- Check the chosen tools' commercial-use terms on the paid plan

---

## Scroll hero specs

|                   | Desktop                       | Mobile                       |
| ----------------- | ----------------------------- | ---------------------------- |
| Frames            | 120–150, 16:9, ~1600×900 WebP | 90–120, 9:16, ~720×1280 WebP |
| Per frame / total | ~50–80 KB / ≤ 8 MB            | ~30–50 KB / ≤ 5 MB           |
| Scroll length     | pinned ~250–300vh             | pinned ~200–250vh            |

- Extract: `ffmpeg -i hero.mp4 -vf "fps=20,scale=720:-2" -c:v libwebp -quality 70 frames/%04d.webp`
- **Progressive loading**: poster → every 4th frame (scrubbing works immediately) → fill in remaining frames
- Canvas draws with `object-fit: cover` math; DPR capped at 1.5–2
- Fallbacks: `prefers-reduced-motion` → static poster, no pin; Save-Data / slow connection → reduced frame set

## Video specs (other sections, MP4 loops)

|               | Desktop              | Mobile                         |
| ------------- | -------------------- | ------------------------------ |
| Aspect / size | 16:9, 1920×1080      | 9:16, 720×1280 (1080×1920 max) |
| File size     | ≤ 3–5 MB             | ≤ 1.5–2 MB                     |
| Length        | 6–10 s seamless loop | same                           |
| Audio         | removed              | removed                        |

- Encode: `ffmpeg -i in.mov -an -c:v libx264 -crf 28 -preset slow -movflags +faststart out.mp4` (optional AV1/WebM for smaller size)
- Markup: `<video autoplay muted loop playsinline preload="metadata" poster=...>` with `<source media="(max-width: 767px)">` for the mobile file
- Compose so the headline area stays calm (left side on desktop, top on mobile); add a gradient overlay if needed for text contrast

---

## Use cases: animated workflow diagrams (from n8n)

Each use case shows **how the apps connect and where AI sits in the chain**, generated from the client's n8n workflow JSON.

**Pipeline**

1. Drop the exported workflow into `Assets/workflows/<case>.json`. **Raw JSON is never published** — it can hold credential IDs, webhook URLs, API keys and client data.
2. A build script **sanitizes** it down to node types, names and connections only → `content/workflows/<case>.json`.
3. A **story layer** (hand-edited, ID + EN) groups the real nodes into 4–7 plain-language steps, e.g. _WhatsApp message → AI understands & replies → Order saved to Sheets → Team notified_. Helper nodes (Set, IF, Merge, Code) are folded into their step.
4. Node types map to **app icons** (WhatsApp, Gmail, Google Sheets, OpenAI/Claude, Slack, etc. via Simple Icons) and a special **AI node** style.

**Rendering (live on the site, not video)**

- React + **SVG**, animated with GSAP — sharp on every screen, a few KB, text crawlable
- **Auto-layout** (elkjs/dagre): left→right on desktop, **top→bottom on mobile** (n8n's own positions are ignored)
- Scroll-triggered: steps light up in order, data "packets" travel along the lines, the AI node pulses while "thinking", and the chain **ends at a person** (team notified / approves) — echoing the hero message
- Reduced motion → static diagram with all steps visible
- Same data can render to MP4 via Remotion for social posts

## Next.js + video + SEO architecture

- **Server components by default**: all text, headings, use-case content and CTAs render as static HTML, so they're crawlable and fast.
- **Poster first**: a `next/image` poster (first frame of the video) is the LCP element; the video starts after.
- **Video is decorative**: `aria-hidden`, no essential information only in the video.
- **Static generation**: `generateStaticParams` for `/use-cases/[slug]`; content from typed data files in `/content`.
- **SEO**: `generateMetadata` per page (title, description, canonical, Open Graph), `app/sitemap.ts`, `app/robots.ts`, dynamic OG images via `next/og` (can use character stills), JSON-LD (`Organization`, `Service`, and case-study `Article` on use-case pages).
- **Bilingual (decided)**: `/id/...` (default) and `/en/...` routes with `hreflang` alternates and a language switch in the header; copy lives in per-language content files.
- **Fonts**: `next/font` (self-hosted, no layout shift).

---

## Mobile performance budget (non-negotiable)

- **LCP < 2.5s** on 4G mid-range Android; Lighthouse mobile ≥ 85
- Scroll hero frame set within the limits above; only the matching (mobile/desktop) set downloads, progressively
- All text and CTAs are **real HTML**, never inside the video
- Poster shows instantly; video autoplays after
- **Fallbacks**: `prefers-reduced-motion` → poster only; iOS Low Power Mode (autoplay blocked) → poster looks finished on its own
- Pause videos / stop canvas work when off-screen (IntersectionObserver)

---

## Agent skills — role assignment

| Phase                      | Skill                                                                                               | Install                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Art direction & layout     | **Taste** — `high-end-visual-design` / `design-taste-frontend` (VARIANCE ~7, MOTION ~5, DENSITY ~3) | `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` |
| Hero direction exploration | **Emil** — `prototype`                                                                              | `npx skills add emilkowalski/skill`                                                      |
| UI micro-motion & reveals  | **Emil** — `animate`, `find-animation-opportunities`                                                | (same)                                                                                   |
| QA & polish                | **Impeccable** — `audit`, `critique`, `polish`                                                      | `/plugin marketplace add pbakaus/impeccable`                                             |
| Motion QA                  | **Emil** — `review-animations`                                                                      | (same)                                                                                   |
| Device testing             | Playwright / Chrome MCP (already available)                                                         | —                                                                                        |

---

## Site structure (v1)

Full page and section spec: **`SITE-BRIEF.md`** (decided 2026-10-13).

```
/  (ID default, EN under /en)
  Home: story stage (Hero -> Problem -> How AI helps, pinned, video later)
        -> Capabilities -> Process -> Why us -> Client logos -> FAQ -> Final CTA
/portofolio, /portofolio/[slug]     Portfolio (real projects, workflow diagrams)
/artikel, /artikel/[slug]           Articles (MDX, SEO)
/tentang                            About (Founder + 2 Co-founders)
/kebijakan-privasi                  Privacy policy
```

Primary CTA: WhatsApp click-to-chat (prefilled per section). Secondary: meet face to face in Pekanbaru. No forms in v1.

---

## Milestones

_Status: ✅ Done · 🟡 In progress · ⬜ Not started · ⛔ Blocked. Update this table as work moves._

| #   | Milestone                                 | Key steps                                                                                                              | Owner                                  | Depends on   | Status           |
| --- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ | ---------------- |
| M1  | Planning & direction                      | Plan, stack, hero direction; code-built character tested and rejected                                                  | Claude + Kreatekno                     | —            | ✅               |
| M2  | Hero story refinement                     | Approve beats & cast in `hero-story.md`; pick the final headline (ID/EN); sanity-check the message with 1–2 SME owners | Kreatekno (Claude drafts)              | M1           | 🟡 Draft v3      |
| M3  | Asset prompting                           | Prompt set in `Assets/asset-prompts/`; refine after the first generations                                              | Claude                                 | M2           | 🟡 v1 written    |
| M4  | AI tool setup                             | Higgsfield (Pro/Ultimate for start & end frames); confirm Seedance end-frame support; check commercial-use terms       | Kreatekno                              | —            | 🟡 Tool chosen   |
| M5  | Character generation                      | Portraits → turnarounds → expressions for boss, Nadia, Raka; group check; log in `01-characters.md`                    | Kreatekno (Claude reviews consistency) | M3, M4       | ⬜               |
| M6  | Office set & key frames                   | Office reference (16:9 + 9:16); 4 beats × 2 ratios = 8 key frames; checklist pass                                      | Kreatekno (Claude reviews)             | M5           | ⬜               |
| M7  | Video generation                          | 3 chained segments × 2 ratios; fix drift; pick best takes                                                              | Kreatekno (Claude reviews)             | M6           | ⬜               |
| M8  | Hero post-production                      | Stitch + color-match; icon-only ✓ overlays in Remotion; export MP4 + scroll frame sequences                            | Claude                                 | M7           | ⬜               |
| M9  | Brand & content                           | Logo + colors kept (`Assets/brand/`); fonts; positioning & copy (ID/EN); 3 use cases + n8n JSON in `Assets/workflows/`       | Kreatekno (Claude drafts copy)         | —            | ⬜               |
| M10 | Web scaffold                              | Next.js + i18n (ID/EN) + SEO baseline + scroll hero with placeholder frames + MP4 loop component                       | Claude                                 | M1           | ⬜ Can start now |
| M11 | Workflow diagram prototype                | Sanitize script, story layer, animated SVG diagram (desktop + mobile layouts) from 1 real workflow                     | Claude                                 | 1 n8n JSON   | ⬜               |
| M12 | Pages & light motion                      | Home sections, use-case detail pages, contact; visual design pass (Taste); motion pass (Emil)                          | Claude                                 | M9, M10, M11 | ⬜               |
| M13 | Hero integration & device test (go/no-go) | Swap in real frames; test on mid-range Android + iPhone; text contrast; size budget                                    | Claude + Kreatekno                     | M8, M10      | ⬜               |
| M14 | QA & launch                               | Impeccable audit/polish, Lighthouse, accessibility, analytics + WhatsApp tracking, deploy + DNS                        | Claude + Kreatekno                     | M12, M13     | ⬜               |

**Parallel tracks:** asset generation (M4→M8) runs alongside the web build (M10→M12) and content (M9). They meet at M13.

---

## Phases

### Phase 0 — Inputs (owner: Kreatekno)

- [ ] 3 use cases: client (or anonymized), problem, solution, result metric, any visuals
- [x] Brand assets: logo + colors reused from the current site (`Assets/brand/`); fonts still open
- [x] Character brief — boss, employee in hijab, 1 colleague (`hero-story.md`)
- [ ] Sign up for one AI image tool + one AI video tool (API key optional — lets Claude script generation)
- [ ] Domain/hosting access, WhatsApp number, analytics account

### Phase 1 — Brand, story & character

- [ ] Positioning statement and new tagline
- [ ] Copy for hero, 3 use cases, process, CTA
- [ ] Moodboard + type/color system (Taste skill)
- [ ] Character design → approved character sheet (pipeline steps 1–2)
- [ ] Hero storyboard: one continuous 5–8 s shot, beats mapped to scroll positions and headline lines — draft in `hero-story.md`

### Phase 2 — Setup

- [ ] Install skills (Taste, Emil, Impeccable)
- [ ] Scaffold Next.js (App Router, TS) + GSAP + Lenis
- [ ] Design tokens, base layout, typed content files for use cases
- [ ] Scroll hero component: pinned canvas image-sequence scrubber, progressive frame loading, text beats, reduced-motion fallback (placeholder frames from `character-prototype/out`)
- [ ] Responsive MP4 loop component for other sections
- [ ] SEO baseline: metadata, sitemap, robots, OG image route, JSON-LD

### Phase 3 — Hero video production (go/no-go gate)

- [ ] Generate clips (pipeline steps 3–5), both aspect ratios
- [ ] Composite + loop in Remotion (steps 6–7), export to spec
- [ ] Test on a **real mid-range Android** + iPhone (autoplay, size, text contrast)
- [ ] Approve final hero

### Phase 4 — Pages & light motion

- [ ] Home sections, 3 use-case detail pages, contact
- [ ] Workflow diagram component + n8n sanitize script + story layer for the 3 use cases
- [ ] Character stills/short clips for use-case sections
- [ ] Motion pass with Emil `find-animation-opportunities` + `animate` (scroll reveals, counters for result metrics, hover/tap states)

### Phase 5 — QA & launch

- [ ] Impeccable `audit` → `critique` → `polish`
- [ ] Emil `review-animations`
- [ ] Lighthouse mobile, real-device testing, accessibility check
- [ ] SEO meta, OG images, sitemap, analytics, WhatsApp CTA tracking
- [ ] Deploy + DNS cutover

---

## Later (v2 candidates)

- Interactive live mascot (AI image → Meshy/Tripo 3D model with auto-rig, or Rive) running in React Three Fiber
- Per-use-case character videos
- More use cases (possibly add a lightweight CMS at that point)

---

## Open questions

1. What are the 3 use cases (details + metrics)? → also the n8n workflow JSON for each, in `Assets/workflows/`
2. ~~Keep current brand identity or full rebrand?~~ Keep the current logo and colors — see `Assets/brand/README.md`. Fonts still open
3. ~~Who is the character?~~ Decided — see `hero-story.md` (boss, employee in hijab, 1 colleague)
4. ~~Which AI tools?~~ Decided — Higgsfield + Seedance
5. Target launch date?
6. Primary SEO keywords / target search terms (e.g. "jasa otomasi AI", "chatbot WhatsApp bisnis")? — _deferred, ask again later_
