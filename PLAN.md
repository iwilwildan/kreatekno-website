# Kreatekno Website Rebuild: Plan

_Last updated: 2026-10-27. The previous plan (including the old hero video and AI asset pipeline) is archived in `archive/PLAN.md`._

## Goal

Rebuild kreatekno.com from scratch as a **mobile-first, scroll-story website** that explains what Kreatekno does for SMEs and turns visitors into WhatsApp conversations.

## Documents

| File | What it holds |
|---|---|
| `SITE-BRIEF.md` | What the site says and how it behaves: references, review preferences, audience, conversion, other pages, look and feel, SEO. Its Home sections (2, 4, 5) still describe the old 6-beat story; see `STORY-STAGE.md` until they are rewritten |
| `STORY-STAGE.md` | The Home story stage, the handoff between web and video: the 18 beats and 19 keyframes, camera moves, empty-scroll beats, prop positions for desktop and phone (copy cards on phones), surface lines and light per keyframe, what the HTML draws vs what the footage draws |
| `PORTFOLIO.md` | Portfolio plan (proposal, 2026-10-25): two modes per project (Tonton motion graphic, Baca case study) from one data file, scene types, 3 sample projects, n8n → page pipeline, phases |
| `COPY.md` | All copy in Indonesian and English, plus SEO titles and descriptions. Home copy still the old version; the current Home copy is in `site/messages/` (taken from the storyboard via the prototype) |
| `STACK.md` | Libraries, folder structure, content model, routing, implementation notes, deploy |
| `site/` | The Next.js app (see `site/README.md`). Home is the 18-beat story stage; the other pages are placeholders |
| `prototype/` | Home prototype (`home.src.html` → `build.py` → `kreatekno-home.html`), published at https://claude.ai/artifact/Ruu3y62oZoj8Jhtd4Nqqm8. Still the 16-beat version; the Next.js app is now the reference |
| `Assets/brand/` | Logo files and brand colours |
| `Assets/workflows/` | Raw n8n exports for the portfolio (never published as-is) |
| `archive/` | Old plan, old hero story, old asset prompts and generated assets. Kept for reference only |

The team's documents are kept by the Kreatekno team: the current one is "Kreatekno · Cerita & Copy Home (one take) · Revisi" (2026-10-25), with the story, 18 beats, 19 keyframes and the Home copy; the location masters are in "Kreatekno · Prompt Master Lokasi". The first storyboard (@heru, 2026-10-14) is superseded.

## Decisions

| Topic | Decision |
|---|---|
| Pages | Home, Portofolio, Artikel, Tentang, Kebijakan Privasi. Services, use cases, how it works, testimonials, articles, FAQ, about and the CTA are beats of the Home story |
| Languages | Indonesian default (`/`), English (`/en`) |
| Main action | "Konsultasi gratis" (WhatsApp click-to-chat); secondary "Ketemu langsung". Visible text never names a platform; only the SEO title and description keep "WhatsApp" |
| Prices | Not shown |
| Brand | Current logo and colours kept; fonts Bricolage Grotesque + Plus Jakarta Sans |
| Home | One continuous camera take in 18 beats, from the team's revised document (25 Oct): Hero → Layanan → Use case → Cara kerja → Testimoni → Artikel → FAQ → Tentang → sky and training → Praktik → CTA → Footer. Beats 2, 5a, 9a, 10, 11, 12 and 15 are empty scroll. The page opens on K0 with the hero on the billboard; nothing autoplays |
| Copy in the story | On desktop every piece of copy is an HTML prop in the scene (billboard on the roof, leaflet in an acrylic stand, ring binder, white shop panels, corkboard...). It takes the keyframe's light and moves with the camera. On phones (decision of 26 Oct) most copy is an HTML card in the empty bottom band of the 9:16 frame; the hero stays on the billboard and the journey steps stay on the shop panels |
| Story media | Stylised 3D animation in the look of GTA 5, one take, 16:9 and 9:16 versions with the same flow (each beat has its own 9:16 keyframe and clip). Made by the Kreatekno team. The prototype's sky and ground are placeholders that mark surface lines and light (see `STORY-STAGE.md`) |
| CMS | None. Copy in message files, articles and portfolio in MDX |
| Stack | Next.js 16 + Tailwind 4 + GSAP + Lenis + next-intl, static, on Vercel (see `STACK.md`) |

## Milestones

_Status: ✅ Done · 🟡 In progress · ⬜ Not started · ⛔ Blocked_

| # | Milestone | Key steps | Owner | Depends on | Status |
|---|---|---|---|---|---|
| M1 | Planning and direction | Brief, pages, audience, references | Claude + Kreatekno | — | ✅ |
| M2 | Home prototype | One take, props that move with the camera, light per keyframe, desktop and phone layouts, ID/EN, "Area video" tool; review rounds | Claude (Kreatekno reviews) | M1 | ✅ Superseded by the Next.js stage, which follows the 25 Oct revision |
| M3 | Copy review | Bring `COPY.md` and `SITE-BRIEF.md` in line with the storyboard; review and approve; write copy for Portofolio, Artikel, Tentang, Privasi | Kreatekno (Claude drafts) | M2 | 🟡 Home copy taken from the storyboard; docs not updated yet |
| M4 | Next.js scaffold | `site/` app, i18n routing, tokens, fonts, layout, SEO baseline, deploy to a Vercel preview | Claude | M1 | 🟡 App scaffolded and building; Vercel preview not set up yet |
| M5 | Home build | Port the prototype into components; messages from `COPY.md`; analytics; reduced-motion version; Playwright beats | Claude | M2, M4 | 🟡 Stage moved to the 18-beat revision and checked; Playwright tests and analytics review still to do |
| M6 | Workflow diagram | Sanitize script, story layer, animated SVG diagram from 1 real workflow | Claude | 1 n8n JSON | ⬜ |
| M7 | Other pages | Portofolio list + detail, Artikel list + detail (3 starter articles), Tentang, Kebijakan Privasi | Claude + Kreatekno | M3, M4, M6, inputs | ⬜ |
| M8 | Story media | Keyframes K0–K16 plus K5a and K9a, and footage in 16:9 and 9:16, following `STORY-STAGE.md`; then plug them into the stage, retune prop positions and light, switch off HTML parts the footage already has; check contrast and size budget on real phones | Kreatekno + Claude | Storyboard ✅, `STORY-STAGE.md` ✅ | 🟡 Beat 1 footage (16:9 and 9:16) in the stage since 2026-10-27; the other beats still on the placeholder |
| M9 | QA and launch | Impeccable audit and polish, motion review, Lighthouse, accessibility, analytics check, deploy, DNS | Claude + Kreatekno | M5, M7, M8 | ⬜ |

Next up: answer the beat 1 points for the video team (`STORY-STAGE.md` section 7, point 7) and check the beat 1 frames on a real phone; then Playwright tests per beat and an analytics check to close M5, a Vercel preview to close M4 (needs Kreatekno's Vercel account), and M7 once copy (M3) and inputs arrive. The keyframes (M8) can start now from `STORY-STAGE.md`.

## Progress log

### 2026-10-27

- Moved the Home stage to the team's revised document of 25 Oct ("Cerita & Copy Home (one take) · Revisi"). The copy did not change; the locations, props, camera moves, light and phone layout did.
- 18 beats and 19 keyframes. Beat 5 is split into 5a (out of the door, no copy) and 5b (the journey). Beat 9 is split into 9a (to the office door, no copy) and 9b (Tentang kami). The zones tool shows K5a and K9a.
- Hero: the copy is now on the billboard on the roof of COMPANY in the first frame (K0). The page opens on that hold and the crane down to the door only starts on scroll; the old autoplay is gone.
- New props, replacing the old ones:
  - Layanan: a flat landscape leaflet in an acrylic stand, instead of the folded leaflet.
  - Use case: the binder is held up by Heru, centre-right.
  - Cara kerja: the white second-floor panels of the shophouses ride a track that slides past with the truck right and slows down at each panel with copy. They replace the street sign and the bamboo banners.
  - Praktik: the small chalkboard is at the left end of the till counter.
  - CTA: the purple folder stands in a document stand.
- Light per keyframe retuned: morning sky for K0, warm morning inside for K2, dusk with lamps on for K13 and K14.
- Phone (decision of 26 Oct): most copy is now a card in the bottom band of the frame, and the cards of one beat stack upwards. The services and the use-case examples swipe sideways; the articles are stacked cards. The hero stays on the billboard, and the journey shows one shop panel per screen.
- Names in the keyframe notes follow the revision: Heru, Wildan, Andi, COMPANY.
- `STORY-STAGE.md` rewritten for the revision. It includes the phone card heights measured at 375×812 and the open points for the video team.
- Checked every beat at 1280×720 and 375×812 in the browser. No console errors; `tsc`, `eslint` and `prettier` pass.
- The ID and EN Home copy both match the revision word for word, so the message files did not change.
- Not checked: the stacked version (reduced motion) and `npm run build`.
- Nothing is committed yet.

**Footage for beat 1 (received the same day, not used yet)**

- Files are in `Assets/footage/`, both H.264, 24 fps, no audio, about 5.5 Mbit/s:

  | File | Size | Length | Frames | Weight |
  |---|---|---|---|---|
  | `B1 desktop.mp4` | 1280×720 | 5.04 s | 121 | 3.5 MB |
  | `B1 mobile.mp4` | 720×1280 | 4.04 s | 97 | 2.8 MB |

- ffmpeg 9.0.2 is installed with winget. A terminal opened before the install doesn't find it on the PATH, and winget made no shim in `WinGet\Links`. Either open a new terminal, or call it by its full path: `C:\Users\wilda\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe` (`ffprobe.exe` sits next to it).
- Not looked at yet: the frames themselves.
- Things to check first:
  - The two versions have different lengths (5 s and 4 s); the document plans 4 s for beat 1. On the web this only changes how many frames one screen of scroll covers.
  - Both are 1280 px on the long side. That is lower than the 1920 the web plan assumed, so check how sharp they look on large screens.
- Agreed approach: an image sequence drawn on a `<canvas>`, scrubbed by the existing GSAP timeline. A `<video>` with `currentTime` was the alternative; it scrubs badly on Safari unless every frame is a keyframe.
- Steps planned for the next session (done the same day, see "Beat 1 footage in the stage" below):
  1. Extract the frames with ffmpeg and check the first and last frame of each file against K0 and K1 in the team's document. K0: a blank billboard, frontal, left of centre, about 48% of the width. K1: the closed door with Heru.
  2. Measure where the billboard face sits in K0 (16:9 and 9:16). Move the hero prop (`desk`/`phone` in `HomeStory.tsx`) onto it, and match the light (`KEYFRAMES.K0`, `K1` in `beats.ts`) to the footage.
  3. Export WebP frames into `site/public/footage/b1/{desk,mobile}/` and add a canvas layer under the props in `StoryStage.tsx`. It draws the frame for the scroll position during beat 1 (hold on frame 0 at K0, then the crane down) and falls back to the placeholder scene where no footage exists yet.
  4. Decide whether the HTML billboard frame, truss and lamps get switched off now that the footage draws them (`STORY-STAGE.md` section 4).
  5. Check at 1280×720 and 375×812, and check the weight of the frames.

**Beat 1 footage in the stage (same day)**

- Checked both clips against the keyframes. The first frame matches K0: an empty billboard, frontal, left of centre. The last frame matches K1: the closed door with Heru.
- Measured the billboard face frame by frame. In 16:9 it starts at x 12–55%, y 30–66% and only slides (no zoom). It leaves the top of the frame about 30 frames into the move. In 9:16 it starts at x 13–86%, y 44–63%.
- Both clips start with about one second where only the birds move, and end on a still. The web holds the keyframes itself, so those frames are left out: frames 22–104 of the 16:9 clip and 19–94 of the 9:16 clip. The source files are unchanged.
- Exported WebP frames at quality 72 into `site/public/footage/b1/{desk,phone}/`:
  - desktop: 83 frames, 2.0 MB;
  - phone: 76 frames, 1.7 MB.
- New `site/components/story/footage.ts`. It draws the frames on a `<canvas>` under the props, scrubbed by the existing timeline.
  - The page holds frame 0 at K0, then the frames run during the crane down.
  - Frames load in passes (first and last, then every 8th, 4th, 2nd, all). The nearest loaded frame stands in until the right one arrives.
  - Frame 0 is preloaded with the page.
  - After K1 the footage fades into the placeholder, because beat 2 has no clip yet.
- Hero, desktop: the copy now sits on the footage's billboard face, and on the way down it follows the billboard along the measured track. Once the footage shows, the HTML frame, truss and lamps switch off (they are only stand-ins until the first frame loads).
- Hero, phone: the 9:16 billboard face is too small for the whole hero (about 330×150 px on a 375×812 screen). The kicker and headline stay on the billboard. The body and the two buttons are a card in the bottom band, like the other beats. The headline follows the billboard on the way down.
- `Prop` takes an optional height (`h`) and a `track`.
- K0 and K1 light retuned from the footage: a low warm sun from the left, not from the right. The colours are sampled from the frames.
- `STORY-STAGE.md` updated: positions, the footage section, and new open points for the video team:
  - the small 9:16 billboard;
  - birds under the header in the first 16:9 frame;
  - 1280 px sharpness on large screens.
- Checked:
  - 1280×720 and 375×812: hold, mid-crane and K1, plus scrolling back to the top;
  - 1440×900 and 1024×768: the hero copy fits on the billboard face;
  - the stacked version (reduced motion) at 390 px.
- `tsc`, `eslint` and `prettier` pass.
- Not checked: `npm run build`, real phones, and sharpness on screens above 1440 px.
- Nothing is committed yet.

### 2026-10-25

- Portfolio plan written in `PORTFOLIO.md`: each project has two modes, Tonton (motion graphic) and Baca (case study), built from one data file. The team decided Tonton is driven by scroll, like the Home stage.
- Portfolio prototype, first pass, one sample project ("Order otomatis dari grup chat", ID only): https://claude.ai/artifact/Aph1ui6sWtmXPSHoZui7yH. Source `prototype/portfolio.src.html`; `build.py` now builds every `*.src.html`. 9 scroll scenes (before → 6 workflow steps → results → CTA) with a workflow rail, plus the Baca case study with a workflow diagram. Checked at 1440×900 and 375×812, and with reduced motion.
- Ported the Home prototype into the Next.js app (M5). Home is now the 16-beat one take: the same props (chalkboard, leaflet, binder, street sign and banners, corkboard, magazine rack, sticky notes, plaque, small chalkboard, purple folder, road footer), the same positions per beat for 16:9 and 9:16, the same light per keyframe, camera moves and in-shot actions.
- All Home copy (ID and EN) moved from the prototype into the message files. The binder tabs and the sticky notes work as before. The FAQ also goes out as `FAQPage` structured data.
- The header links "Layanan" and "Cara kerja" jump to their beat, also when clicked on another page.
- With reduced motion, or without JavaScript, the same props stack as ordinary sections in their own colour bands.
- The "Area video" tool for the video team now opens with `?zones=1` in the URL and is not linked anywhere.
- Checked at 1440×900 and 375×812: each beat's props sit fully inside the screen, and no prop from another beat shows. Checked the stacked version at 390px. `npm run build` still prerenders Home as static HTML in both languages.
- Not ported: the "coming soon" toast. Its links now go to the placeholder pages instead.
- In the stacked version the magazines are full width on phones, as in the prototype. They could become a swipe row later.
- Fixed during the check: the footer language switch on the night road lost its padding, and decorations (sign arm, chalkboard shadows, lamp glow) made the stacked version scroll sideways on phones.
- Nothing is committed yet.

### 2026-10-21

- Scaffolded the Next.js app in `site/` (M4): Next.js 16.4 with Cache Components, Tailwind 4, next-intl 4.14, plus GSAP, Lenis, Phosphor icons, Vercel Analytics and zod installed for the next steps.
- Routing: Indonesian at `/`, English at `/en`, with translated slugs (`/portofolio` ↔ `/en/portfolio`, `/artikel` ↔ `/en/articles`, `/tentang` ↔ `/en/about`, `/kebijakan-privasi` ↔ `/en/privacy-policy`). The language switch keeps the visitor on the same page. Unknown URLs show a 404 page in the visitor's language.
- Tokens and fonts ported from the prototype: brand colours only, Bricolage Grotesque and Plus Jakarta Sans, the same button shapes.
- Layout: floating pill header with links, language switch and the "Konsultasi gratis" button. Under 960px the links move into a full-screen navy menu. Navy footer.
- WhatsApp: every button builds its `wa.me` link from `NEXT_PUBLIC_WA_NUMBER` with the prefilled message in the current language. Each click is tracked with its section name.
- SEO baseline: title and description per page from `COPY.md`, canonical and hreflang, `Organization` + `ProfessionalService` structured data, sitemap, robots (preview deploys are not indexed), generated Open Graph image per language.
- Home and the other pages are placeholders until M5 and M7. `npm run build` prerenders every page as static HTML.
- Still open for M4: connect the repo to Vercel (root `site/`) for preview deploys. This needs Kreatekno's Vercel account.

### 2026-10-17

- Beat 5 (Cara kerja), desktop: the banner cloths start rolled at the top of their bamboo poles. They now unroll one by one as the visitor scrolls, banner 1 to 4, and roll back up when scrolling back. Phones keep one banner per screen.
- Fixed the small in-shot actions (leaflet spreading out, binder page opening, phone banners) losing their starting pose when the page refreshed. Their starting poses now live in CSS.
- Fixed banner 4 missing on phones. GSAP read the banners' CSS starting offset as an extra shift, so banner 4 stayed off screen. Waiting banners are now hidden with opacity instead.
- Reworked the magazines in beat 7. They now read as magazines: masthead, cover art, cover line, standing in a wooden rack behind a front rail. The old skewed page edge and plastic shine were removed. On phones the rack is a swipe row with the next magazine peeking in, instead of three flat stacked bars.
- Wrote `STORY-STAGE.md`: the web and video handoff. It covers the placeholder scene, surface lines and light per keyframe, positions per beat, how props move with each camera move, the HTML vs footage split, readability rules and open points for the video team.

### 2026-10-16

- Studied the team's 16-beat storyboard and rebuilt the Home prototype to it. Header plus 16 beats in one sticky stage, with copy from the storyboard and CTA "Konsultasi gratis" (no platform names in visible text). The old capabilities, logo, FAQ and CTA sections were removed; their content now lives in the beats.
- Desktop 16:9 and phone 9:16 use the same HTML elements, placed in frame percentages so they stay on their surfaces when the footage arrives. Pieces that would be cropped or hidden by the header are shifted together and narrowed to fit. Tested on desktop, a short laptop, a tablet and a phone.
- Made every piece of copy a physical prop in the scene:
  - beat 1 chalkboard on wooden legs on the pavement
  - beat 3 leaflet on the till
  - beat 4 ring binder with plastic tabs
  - beat 5 street sign on an arm and bamboo banners
  - beat 6 polaroids on a corkboard
  - beat 7 magazines on a shelf
  - beat 8 vinyl title and sticky notes on glass
  - beat 9 plaque with lamp light
  - beat 13 small chalkboard
  - beat 14 purple folder on the desk
  - beat 16 footer on the night road
- Each prop takes its keyframe's light. Props come in and go out with the beat's camera move (crane, dolly, truck, arc, through-object, POV) instead of fading. Lenis smooth scrolling was added.
- Added the "Area video" tool. It shows the safe zone, each prop's coordinates, the current beat, its camera move and keyframes, and how much of the frame is cropped.

### 2026-10-14

- Site brief, copy deck, stack and the first Home prototype (6-beat story). The old video plan was archived.

## Inputs needed from Kreatekno

- See `SITE-BRIEF.md` section 11: WhatsApp number, full address, founder names/bios/photos, client logos + permission, 2–3 portfolio projects with n8n JSON, social links, analytics choice, domain/DNS access, and whether to keep the "first in Pekanbaru" claim.
- Real client testimonials with permission (beat 6 shows "CONTOH" cards until then).
- Keyframes and footage for the story stage, plus answers to the open points in `STORY-STAGE.md` section 7.

## Open questions

1. Target launch date?
2. GA4 in addition to Vercel Analytics (needs a cookie banner)?
3. Who writes and approves articles after launch?
