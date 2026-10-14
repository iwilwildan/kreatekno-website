# Kreatekno Website Rebuild: Plan

_Last updated: 2026-10-14. The previous plan (including the hero video and AI asset pipeline) is archived in `archive/PLAN.md`._

## Goal

Rebuild kreatekno.com from scratch as a **mobile-first, scroll-story website** that explains what Kreatekno does for SMEs and turns visitors into WhatsApp conversations.

## Documents

| File | What it holds |
|---|---|
| `SITE-BRIEF.md` | What the site says and how it behaves: references, review preferences, audience, conversion, every Home section, other pages, look and feel, SEO |
| `COPY.md` | All copy in Indonesian and English, plus SEO titles and descriptions |
| `STACK.md` | Libraries, folder structure, content model, routing, implementation notes, deploy |
| `prototype/` | Working Home prototype (`home.src.html` → `build.py` → `kreatekno-home.html`), published at https://claude.ai/artifact/Ruu3y62oZoj8Jhtd4Nqqm8 |
| `Assets/brand/` | Logo files and brand colours |
| `Assets/workflows/` | Raw n8n exports for the portfolio (never published as-is) |
| `archive/` | Old plan, old hero story, old asset prompts and generated assets. Kept for reference only |

## Decisions

| Topic | Decision |
|---|---|
| Pages | Home, Portofolio, Artikel, Tentang, Kebijakan Privasi. Use cases, FAQ and CTAs are Home sections |
| Languages | Indonesian default (`/`), English (`/en`) |
| Main action | WhatsApp click-to-chat; secondary "Ketemu langsung" |
| Prices | Not shown |
| Brand | Current logo and colours kept; fonts Bricolage Grotesque + Plus Jakarta Sans |
| Home | Pinned 6-beat story stage, then capabilities, client logos, FAQ, final CTA |
| Story background | Clean colour fill for now. The stage has a full-bleed media slot; its content will be defined by the Kreatekno team later |
| CMS | None. Copy in message files, articles and portfolio in MDX |
| Stack | Next.js 16 + Tailwind 4 + GSAP + next-intl, static, on Vercel (see `STACK.md`) |

## Milestones

_Status: ✅ Done · 🟡 In progress · ⬜ Not started · ⛔ Blocked_

| # | Milestone | Key steps | Owner | Depends on | Status |
|---|---|---|---|---|---|
| M1 | Planning and direction | Brief, pages, audience, references | Claude + Kreatekno | — | ✅ |
| M2 | Home prototype | Story stage, capabilities, FAQ, CTA, ID/EN, mobile layout; review rounds | Claude (Kreatekno reviews) | M1 | 🟡 In review |
| M3 | Copy review | Review and approve `COPY.md`; write copy for Portofolio, Artikel, Tentang, Privasi | Kreatekno (Claude drafts) | M2 | 🟡 Home copy drafted |
| M4 | Next.js scaffold | `site/` app, i18n routing, tokens, fonts, layout, SEO baseline, deploy to a Vercel preview | Claude | M1 | ⬜ Can start now |
| M5 | Home build | Port the prototype into components; messages from `COPY.md`; analytics; reduced-motion version; Playwright beats | Claude | M2, M4 | ⬜ |
| M6 | Workflow diagram | Sanitize script, story layer, animated SVG diagram from 1 real workflow | Claude | 1 n8n JSON | ⬜ |
| M7 | Other pages | Portofolio list + detail, Artikel list + detail (3 starter articles), Tentang, Kebijakan Privasi | Claude + Kreatekno | M3, M4, M6, inputs | ⬜ |
| M8 | Story media | Plug the Kreatekno team's media into the story stage's media slot; check contrast and size budget on real phones | Kreatekno + Claude | M5, team's media | ⬜ |
| M9 | QA and launch | Impeccable audit and polish, motion review, Lighthouse, accessibility, analytics check, deploy, DNS | Claude + Kreatekno | M5, M7 | ⬜ |

M4 → M5 can run while copy (M3) and inputs are still coming in. M8 can happen any time after M5.

## Inputs needed from Kreatekno

See `SITE-BRIEF.md` section 11: WhatsApp number, full address, founder names/bios/photos, client logos + permission, 2–3 portfolio projects with n8n JSON, social links, analytics choice, domain/DNS access, and whether to keep the "first in Pekanbaru" claim.

## Open questions

1. Target launch date?
2. GA4 in addition to Vercel Analytics (needs a cookie banner)?
3. Who writes and approves articles after launch?
