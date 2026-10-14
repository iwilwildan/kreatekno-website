# Hero Story — "AI that grows your team"

_Draft v3 — 2026-10-11_

## The message

**AI is not here to replace your people. It takes over the repetitive work so your team can do more important work, and your company runs better because of it.**

Many Indonesian SME owners are proud of the jobs they create. The hero must show that **the employee is still there, doing more valuable work**, and that the boss is happy because the company runs more efficiently.

### Tone rules (apply to every frame and line)

| Do | Don't |
|---|---|
| Keep **humans in the center** of every frame | Show empty desks, people leaving, or "replaced" roles |
| Show AI as a **small, friendly helper** in the background (glow, floating cards, organized messages) | Show AI as a humanoid robot doing a person's job |
| Show the employee **moving up** to more meaningful work | Show the employee idle, or the boss alone with a computer |
| Make the story feel **warm and local** (Indonesian office, faces, details) | Use cold, futuristic, sci-fi imagery |
| End with the **team together** | Use words like "replace", "automate your staff" or "cut headcount" |

---

## Decisions

| Topic | Decision |
|---|---|
| Setting | **Office**: a small, modern, warm Indonesian SME office (plants, wooden desks, a whiteboard, natural light) |
| Cast | **Boss** (mid-40s man, beard, no mustache) + **employee** (young woman in hijab) + **1 colleague** (beats 3–4) |
| Ending | **The team together** |
| Metrics | **None** in the hero |
| Language | **ID / EN switch**. Indonesian is the default; the headline copy swaps, the video stays the same (no text inside the video) |

---

## Cast

- **Boss (owner):** an Indonesian man in his mid-40s, **full beard, no mustache**, short neat hair, friendly and caring eyes. Smart-casual (for example, a batik shirt or a simple collared shirt). Pixar style.
  - Role in the story: watches his team with concern at first, then is proud and relieved by the end.
- **Employee (main "hero" of the change):** an Indonesian woman in her mid-20s wearing a neat hijab, bright expressive eyes, smart-casual office wear (a long-sleeved blouse or blazer). Pixar style.
  - Role in the story: stuck on repetitive work, then moves up to meaningful work.
- **Colleague (beats 3–4):** an Indonesian man in his mid-20s, clean-shaven, glasses, short tidy hair, a long-sleeved shirt with sleeves rolled up. He's the one at the whiteboard the employee joins.
- **AI helper:** **not a person.** A small soft glowing companion (a floating light, or a friendly chat-bubble icon) plus organized UI cards. It stays smaller than the people, always.

---

## Story beats (mapped to scroll)

One continuous camera move: start **close on the employee at their desk**, slowly **pull back and rise** to reveal the boss and the whole office. Lighting moves from **cool and cluttered** to **warm and golden**.

| Scroll | Beat | What we see (AI video) | Overlay (Remotion, inside the frames) | Headline (HTML) |
|---|---|---|---|---|
| **0–20%** | **Stuck in the grind** | Close-up: the employee at the desk, surrounded by paper stacks, typing fast, tired. The boss is softly out of focus behind them, looking on with concern. Cool light. | Messy, overlapping chat bubbles, invoice icons, spreadsheet rows and "Reminder!" notifications popping up | **"Tim terbaik Anda, terjebak di pekerjaan berulang."**<br>_Your best people, stuck in repetitive work._ |
| **20–45%** | **A helper arrives** | A small glowing helper appears beside the employee's monitor. The employee notices it and leans back, curious. | The mess **sorts itself** into neat stacks: "Chat dibalas ✓", "Invoice terkirim ✓", "Laporan siap ✓" | **"AI mengurus pekerjaan berulang."**<br>_AI takes care of the repetitive work._ |
| **45–75%** | **Moving up** | The employee stands, picks up a notebook and joins a colleague at the whiteboard, sketching ideas and pointing, engaged. The camera pulls back. The boss, now in focus, sees this and starts to smile. The light warms. | A few small "✓" cards float quietly in the background | **"Tim Anda fokus pada yang penting — klien, strategi, dan ide baru."**<br>_Your team focuses on what matters: clients, strategy and new ideas._ |
| **75–100%** | **Growing together** | Wide shot: the boss walks over and joins the team at the whiteboard or meeting table, resting a hand on the employee's shoulder, everyone smiling and talking. Busy, lively office in golden light. | Clean, no UI | **"AI membantu tim Anda naik kelas, bukan menggantikan mereka."**<br>_AI that helps your team level up instead of replacing them._<br>**[Konsultasi gratis via WhatsApp]** |

### Why the beats work forwards and backwards

Scrolling back up reverses the pull-back. The team drifts back to the desk and the work piles up again. Every action is slow and readable both ways: standing up, walking, smiling, the camera move. There are no doors slamming, no fast gestures and no handshakes.

---

## Copy set

| | Bahasa Indonesia | English |
|---|---|---|
| Beat 1 | Tim terbaik Anda, terjebak di pekerjaan berulang. | Your best people, stuck in repetitive work. |
| Beat 2 | Kenalkan asisten AI yang bekerja 24 jam untuk bisnis Anda. | Meet the AI assistant that works around the clock for your business. |
| Beat 3 | Tim Anda fokus ke pelanggan, strategi, dan ide baru. | Your team focuses on customers, strategy and new ideas. |
| Beat 4 | AI membantu tim Anda naik kelas, bukan menggantikan mereka. | AI that helps your team level up instead of replacing them. |
| CTA | Konsultasi gratis via WhatsApp | Free consultation on WhatsApp |

Alternative final lines to test:
- "Lebih sedikit kerja berulang. Lebih banyak ruang untuk tim Anda berkembang." (_Less repetitive work. More room for your team to grow._)
- "Teknologi untuk tim Anda, bukan sebagai pengganti tim Anda." (_Technology for your team, not instead of it._)
- "Perusahaan lebih efisien. Tim lebih berdaya." (_A more efficient company. A more empowered team._)

---

## How we'll produce it

AI video tools make clips of about 5–10 seconds, so the single shot is built from **3–4 chained segments**:

1. **Character sheets first:** the boss and the employee, each with front, side and 3–4 expressions, in the same style. Then a **set reference** image of the office.
2. **Key image per beat:** same characters, same office, same style. These also serve as the poster and fallback images.
3. **Generate each segment** with the **start frame = the previous segment's last frame** (Higgsfield Start & End Frame with Seedance), so the cuts are invisible.
4. **Stitch** into one continuous clip (~6–10 s), then color-match it.
5. **Add the overlays** (bubbles, ✓ cards) in Remotion.
6. **Export the frame sequences** for scrolling: desktop 16:9 and mobile 9:16, each generated in its own aspect ratio rather than cropped.

### Composition per screen

- **Desktop (16:9):** the action on the **right two-thirds**, headline on the left. **Exception, beat 2 (the helper arrives):** the camera favours the **left side**, so the action sits in the left ~58% and the right ~42% stays calm for the headline. The move to the left and back must be slow, because the scroll can play it backwards.
- **Mobile (9:16):** the action in the **lower 60%**, headline at the top. In beat 4, keep the boss and employee close enough that their faces read on a phone.

### Fallbacks

- Reduced motion: show the beat 4 key image with the final headline and CTA.
- While loading: the beat 1 key image is the poster.

---

## Overlay text and language

The ✓ cards in beat 2 ("Chat dibalas ✓"…) are composited in Remotion, so they can be **rendered once per language** (two frame sets), or kept language-neutral (icons + ✓ only) to ship one set. **Recommendation:** icons-only cards in v1, so there's one frame set per screen size.

Prompts for all assets: `Assets/asset-prompts/`.

---

## Draft v4 (2026-10-13): six beats, with the Kreatekno team and the process

The web prototype now has six beats. This is the proposed video for the full shot. It is still **one continuous camera move**, built from chained segments (start frame = previous segment's last frame).

**New cast:** the **Kreatekno team**, 3 people (Founder + 2 co-founders), drawn in the same Pixar style. They share one **brand color accent** (purple polo, lanyard or laptop sticker) so viewers can tell them apart from the client's staff at a glance. They need their own character sheets, generated from photos of the real founders if they agree.

| # | Beat (web text) | Scroll | Video | Camera / composition (desktop) |
|---|---|---|---|---|
| 1a | Problem headline | 0–10% | Close on the employee at a cluttered desk, typing, tired. Boss blurred behind. Cool light | Action right, calm left |
| 1b | Problem cards | 10–32% | Same shot, the pile grows: phone buzzing, papers. Slow push-in | Action right |
| 2 | "Kenalkan asisten AI…" | 32–56% | A small glowing helper appears **on the left** of the desk. The employee turns toward it, curious; the mess starts sorting itself | Camera drifts **left**; action left, calm right |
| 3 | "Tim Anda fokus ke pelanggan…" | 56–80% | The employee stands and joins a colleague at the whiteboard; the boss notices and smiles. Light warms | Camera centres and **tilts down/pulls out**: action in the lower half, calm wall/ceiling at the top behind the centred headline |
| 4 | "Tim kecil dari Pekanbaru…" | 80–~88% | **The Kreatekno team (3)** is already seated at the meeting table beside the whiteboard, laptop open. The boss walks over and sits with them: client team and Kreatekno side by side | Action in the **upper right** (table); the lower-left stays calm behind the navy caption card |
| 5 | "Kami dampingi di setiap langkah…" | ~88–95% | Around the same table, quick readable actions in order: talking with coffee (Ngobrol), a Kreatekno member sketches a flow on the whiteboard (Petakan), the employee tries it on her phone and nods (Bangun & uji / Luncurkan), a laptop shows a calm dashboard with check marks (Dampingi) | Action in the **middle band**; top and bottom stay calm (headline top, steps band bottom). Steps happen left to right to match the 5 HTML steps |
| 6 | "AI membantu tim Anda naik kelas…" | 95–100% | Final wide shot in golden light: everyone at the table laughing, the boss's hand on the employee's shoulder, the helper glowing quietly on the desk | Wide shot with everyone in the **upper ~58%**; the floor/table front stays calm behind the big bottom-centre statement |

**Production notes**
- 6 beats ≈ **6 chained segments** per screen size (12 total), about 20–25 seconds of footage. All motion stays slow so it reads when scrolled backwards.
- Beat 5 has the most action. If one segment can't hold all four actions cleanly, keep two (whiteboard sketch + employee testing on her phone). The HTML step list carries the rest.
- Frame budget grows with length. Plan ~200 frames desktop / ~160 mobile, still WebP. Keep under ~12 MB / ~7 MB with progressive loading.
- Mobile 9:16: same story. Characters sit in the **lower half** for beats 1, 2, 3 and 5, and in the **upper half** for beats 4 and 6 (the text moves to the bottom there), so the 9:16 camera tilts down for beat 4, back up for beat 5, and down again for the final wide shot. Keep these moves slow.
