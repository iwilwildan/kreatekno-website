import { Easing, interpolate } from "remotion";

// Piecewise keyframes with ease-in-out between each pair: [[frame, value], ...]
export const kf = (frame: number, keys: [number, number][]) =>
  interpolate(
    frame,
    keys.map((k) => k[0]),
    keys.map((k) => k[1]),
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

// Parabolic hop: returns height and squash/stretch amount
export const hop = (frame: number, start: number, dur: number, height: number) => {
  const t = (frame - start) / dur;
  if (t < -0.25 || t > 1.35) return { y: 0, stretch: 0 };
  if (t < 0) return { y: 0, stretch: -0.12 * (1 - Math.abs(t) / 0.25) }; // crouch before take-off
  if (t > 1) return { y: 0, stretch: -0.14 * (1 - (t - 1) / 0.35) }; // landing squash
  return { y: height * 4 * t * (1 - t), stretch: 0.1 * Math.abs(Math.cos(Math.PI * t)) };
};

export type Face = {
  eyeOpen: number; // vertical scale of round eyes
  happyEyes: number; // 0 = round eyes, 1 = ^ ^ eyes
  smile: number;
  mouthO: number;
  browLift: number;
  browTilt: number; // + = worried/curious asymmetric tilt
  lookX: number;
  lookY: number;
};

const NEUTRAL: Face = { eyeOpen: 1, happyEyes: 0, smile: 0.35, mouthO: 0, browLift: 0, browTilt: 0, lookX: 0, lookY: 0 };
const HAPPY: Face = { eyeOpen: 1, happyEyes: 1, smile: 1, mouthO: 0, browLift: 0.04, browTilt: 0, lookX: 0, lookY: 0 };
const THINKING: Face = { eyeOpen: 0.85, happyEyes: 0, smile: 0, mouthO: 0, browLift: 0.03, browTilt: 0.35, lookX: 0.06, lookY: 0.06 };
const SURPRISED: Face = { eyeOpen: 1.35, happyEyes: 0, smile: 0, mouthO: 1, browLift: 0.1, browTilt: 0, lookX: 0, lookY: 0 };

// Blend expressions by weight on top of neutral
export const blendFace = (w: { happy: number; thinking: number; surprised: number }): Face => {
  const out = { ...NEUTRAL };
  for (const key of Object.keys(NEUTRAL) as (keyof Face)[]) {
    out[key] =
      NEUTRAL[key] +
      (HAPPY[key] - NEUTRAL[key]) * w.happy +
      (THINKING[key] - NEUTRAL[key]) * w.thinking +
      (SURPRISED[key] - NEUTRAL[key]) * w.surprised;
  }
  return out;
};

export const blink = (frame: number) => {
  for (const b of [44, 102, 150, 228]) {
    const d = frame - b;
    if (d >= 0 && d < 6) return Math.abs(d - 3) / 3; // close then open
  }
  return 1;
};
