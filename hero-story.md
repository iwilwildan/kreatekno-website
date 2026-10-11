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
| **20–45%** | **A helper arrives** | A small glowing helper appears beside the employee's monitor. The employee notices it and leans back, curious. | The mess **sorts itself** into neat stacks: "Chat dibalas ✓", "Invoice terkirim ✓", "Laporan siap ✓" | **"AI mengurus yang berulang."**<br>_AI takes care of the repetitive work._ |
| **45–75%** | **Moving up** | The employee stands, picks up a notebook and joins a colleague at the whiteboard, sketching ideas and pointing, engaged. The camera pulls back. The boss, now in focus, sees this and starts to smile. The light warms. | A few small "✓" cards float quietly in the background | **"Tim Anda fokus pada yang penting — klien, strategi, dan ide baru."**<br>_Your team focuses on what matters: clients, strategy and new ideas._ |
| **75–100%** | **Growing together** | Wide shot: the boss walks over and joins the team at the whiteboard or meeting table, resting a hand on the employee's shoulder, everyone smiling and talking. Busy, lively office in golden light. | Clean, no UI | **"AI yang membesarkan tim Anda, bukan menggantikannya."**<br>_AI that grows your team, not replaces it._<br>**[Konsultasi gratis via WhatsApp]** |

### Why the beats work forwards and backwards

Scrolling back up reverses the pull-back. The team drifts back to the desk and the work piles up again. Every action is slow and readable both ways: standing up, walking, smiling, the camera move. There are no doors slamming, no fast gestures and no handshakes.

---

## Copy set

| | Bahasa Indonesia | English |
|---|---|---|
| Beat 1 | Tim terbaik Anda, terjebak di pekerjaan berulang. | Your best people, stuck in repetitive work. |
| Beat 2 | AI mengurus yang berulang. | AI takes care of the repetitive work. |
| Beat 3 | Tim Anda fokus pada yang penting — klien, strategi, dan ide baru. | Your team focuses on what matters: clients, strategy and new ideas. |
| Beat 4 | AI yang membesarkan tim Anda, bukan menggantikannya. | AI that grows your team, not replaces it. |
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

- **Desktop (16:9):** the action on the **right two-thirds**, headline on the left.
- **Mobile (9:16):** the action in the **lower 60%**, headline at the top. In beat 4, keep the boss and employee close enough that their faces read on a phone.

### Fallbacks

- Reduced motion: show the beat 4 key image with the final headline and CTA.
- While loading: the beat 1 key image is the poster.

---

## Overlay text and language

The ✓ cards in beat 2 ("Chat dibalas ✓"…) are composited in Remotion, so they can be **rendered once per language** (two frame sets), or kept language-neutral (icons + ✓ only) to ship one set. **Recommendation:** icons-only cards in v1, so there's one frame set per screen size.

Prompts for all assets: `Assets/asset-prompts/`.
