# Asset prompts — Hero "AI that grows your team"

Story: `../../hero-story.md`. Work through the files in order. Each step uses the approved output of the step before as its reference.

| File | What it makes | Tool (Higgsfield) |
|---|---|---|
| `00-style.md` | Shared style block + negative prompt (paste into every prompt) | — |
| `01-characters.md` | Character sheets: boss, employee, colleague | Image model |
| `02-office-set.md` | Office reference (empty set) | Image model |
| `03-key-frames.md` | 4 beat images × 2 aspect ratios | Image model |
| `04-video-segments.md` | 3 chained video segments (start/end frames) | Seedance |

## Saving outputs

Save generated files in `Assets/` with this naming scheme so prompts and files match up:

```
Assets/
  characters/   boss-sheet-v1.png, employee-sheet-v1.png, colleague-sheet-v1.png
  set/          office-v1.png
  keyframes/    beat1-16x9-v1.png, beat1-9x16-v1.png, ... beat4-9x16-v1.png
  video/        seg1-16x9-v1.mp4, seg2-16x9-v1.mp4, ... seg3-9x16-v1.mp4
  final/        hero-16x9.mp4, hero-9x16.mp4 (stitched)
```

- Bump the version (`-v2`, `-v3`) when you regenerate. Keep the old one until the new one is approved.
- When a generation is approved, note the tool, model version, seed (if shown) and any prompt changes in the **Log** section at the bottom of the matching prompt file.

## Consistency rules

1. Always paste the **style block** from `00-style.md`.
2. Always attach the **approved character sheets** as references, using the tool's character/image-reference feature (in Higgsfield: attach the approved sheet as the reference image).
3. Keep outfits identical in every image. Don't let the tool "restyle" clothes.
4. Generate 16:9 and 9:16 **separately**. Never crop one into the other.
5. No text, logos or UI inside the images or video. Overlays and headlines are added later in Remotion and HTML.
