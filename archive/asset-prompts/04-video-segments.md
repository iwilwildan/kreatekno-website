# 04 — Video segments (image-to-video)

Three segments chained with **start and end frames** make one continuous shot.

**Tool:** Higgsfield → Image-to-Video → **Seedance**. Start & End Frame needs the Pro or Ultimate plan. If the Seedance picker has no end-frame slot, generate from the start frame only and use the last frame of each clip as the next start frame. Higgsfield's tip: start at 720p for tests, and change either the prompt or the image between attempts, not both. Generate each segment for 16:9 and again for 9:16, using the matching key frames.

| Segment | Start frame | End frame | Length |
|---|---|---|---|
| 1 | `beat1` | `beat2` | ~3 s |
| 2 | `beat2` | `beat3` | ~3–4 s |
| 3 | `beat3` | `beat4` | ~3 s |

**Settings:** the smoothest/highest quality mode, no sound, a slow camera. If the tool has a motion-strength setting, keep it low to medium.

**Motion rules (scrolling plays it backwards too):** slow, continuous movements only. No cuts, no fast gestures, no handshakes, no objects falling, no doors.

---

## Segment 1 — Grind → helper arrives

```
Slow, smooth camera dolly backward and slightly upward. The woman in the dusty-rose hijab types tiredly, then slows down as a small soft glowing orb of warm-white and teal light gently fades in and floats beside her monitor. She stops typing, leans back and looks at it with curiosity, a small smile appearing. The paper stacks on her desk gently tidy themselves. The bearded boss behind her, slightly out of focus, tilts his head with interest. Lighting shifts from cool to neutral. Steady, cinematic, Pixar-style animation, consistent characters.
```

## Segment 2 — Helper → moving up

```
Continue the slow camera dolly backward and upward. The woman in the dusty-rose hijab calmly stands up from her now-tidy desk, picks up her notebook and walks a few steps to the whiteboard, where the young man with glasses in a light-blue shirt greets her with a smile. She begins pointing at the board and they discuss ideas together. The small glowing orb stays quietly by her monitor. In the mid-ground, the bearded boss in a navy batik shirt watches and slowly begins to smile. Sunlight gradually warms the room. Smooth, gentle motion, consistent characters.
```

## Segment 3 — Moving up → together

```
Continue the slow camera pull-back and rise to a wide shot. The bearded boss in a navy batik shirt walks calmly over to the whiteboard and joins the woman in the dusty-rose hijab and the young man with glasses, gently resting a hand on her shoulder. All three smile and talk together, relaxed and proud. Warm golden-hour sunlight fills the tidy, lively office. Slow, steady, cinematic camera, Pixar-style animation, consistent characters.
```

---

## If a segment drifts

| Problem | Fix |
|---|---|
| Faces change mid-clip | Shorten the clip, lower motion strength, or add the character reference (Higgsfield's character/reference feature, if available) |
| Mustache appears on the boss | Add "clean-shaven upper lip, no mustache" to the prompt; regenerate |
| Camera cuts or jumps | Add "single continuous shot, no cuts"; make sure the start and end frames have similar framing |
| Text appears on the whiteboard or screens | Add "blank whiteboard with only abstract shapes, no writing"; fix it in post if needed |
| The end frame doesn't match the next segment | Use the last frame of the generated clip (not the key frame) as the next segment's start frame |

## After generation

1. Stitch the segments in order (ffmpeg or Remotion), crossfading 2–4 frames at each join if needed.
2. Color-match the joins.
3. Add the icon-only ✓ overlays in Remotion (beat 2).
4. Export: `Assets/final/hero-16x9.mp4` and `hero-9x16.mp4`, then extract the scroll frame sequences (see PLAN.md, "Scroll hero specs").

## Log

| Asset | File | Tool / model | Settings | Notes |
|---|---|---|---|---|
| | | | | |
