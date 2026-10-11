import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { Character, type Pose } from "./Character";
import { blendFace, blink, hop, kf } from "./timeline";

// Timeline (30fps, 240 frames):
//   0–72    walk in from the left, turn to camera
//   84–120  wave (happy)
//   125–160 thinking (look up, hand raised, thought bubble)
//   165–185 surprised (hop, "!")
//   190–225 celebrate (two jumps, confetti)
//   225–240 settle to idle

const CONFETTI_COLORS = ["#14B8A6", "#F59E0B", "#6366F1", "#F43F5E", "#22C55E"];

const ThoughtBubble: React.FC<{ amount: number; frame: number }> = ({ amount, frame }) => (
  <group position={[0.85, 2.95, 0.3]}>
    {[0, 1, 2].map((i) => {
      const s = Math.max(0.001, Math.min(1, amount * 3 - i)) * (1 + Math.sin(frame * 0.2 + i) * 0.05);
      return (
        <mesh key={i} position={[i * 0.22, i * 0.28, 0]} scale={s}>
          <sphereGeometry args={[0.07 + i * 0.08, 24, 16]} />
          <meshStandardMaterial color="white" roughness={0.4} />
        </mesh>
      );
    })}
  </group>
);

const Exclamation: React.FC<{ amount: number }> = ({ amount }) => {
  const s = Math.max(0.001, amount);
  return (
    <group position={[0.75, 3.15, 0.3]} scale={s} rotation={[0, 0, -0.2]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.14, 0.4, 0.14]} />
        <meshStandardMaterial color="#F59E0B" />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshStandardMaterial color="#F59E0B" />
      </mesh>
    </group>
  );
};

const Confetti: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const t = (frame - start) / 30;
  if (t < 0 || t > 1.6) return null;
  return (
    <group>
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = random(`a${i}`) * Math.PI * 2;
        const speed = 1.5 + random(`s${i}`) * 2;
        const x = Math.cos(angle) * speed * t;
        const z = Math.sin(angle) * speed * t * 0.4;
        const y = 2.6 + (3 + random(`v${i}`) * 2) * t - 4.9 * t * t;
        const spin = t * (4 + random(`r${i}`) * 6);
        return (
          <mesh key={i} position={[x, y, z]} rotation={[spin, spin * 0.7, 0]} scale={Math.min(1, (1.6 - t) * 2)}>
            <boxGeometry args={[0.1, 0.1, 0.02]} />
            <meshStandardMaterial color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]} />
          </mesh>
        );
      })}
    </group>
  );
};

export const HeroScene: React.FC<{ portrait: boolean }> = ({ portrait }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Landscape leaves the left side free for the headline; portrait leaves the top free
  const endX = portrait ? 0 : 1.9;
  const startX = endX - 7.5;

  // Behavior weights
  const walk = kf(frame, [[0, 1], [62, 1], [76, 0]]);
  const wave = kf(frame, [[80, 0], [90, 1], [116, 1], [124, 0]]);
  const think = kf(frame, [[122, 0], [132, 1], [158, 1], [166, 0]]);
  const surprise = kf(frame, [[163, 0], [167, 1], [182, 1], [190, 0]]);
  const celebrate = kf(frame, [[188, 0], [196, 1], [222, 1], [232, 0]]);

  const x = kf(frame, [[0, startX], [74, endX]]);
  const yaw = kf(frame, [[0, 1.15], [60, 1.15], [84, portrait ? 0.2 : -0.25]]);

  const hops = [hop(frame, 168, 12, 0.35), hop(frame, 197, 13, 0.75), hop(frame, 211, 13, 0.75)];
  const jumpY = hops.reduce((a, h) => a + h.y, 0);
  const stretch = hops.reduce((a, h) => a + h.stretch, 0);

  const waving = Math.sin(frame * 0.55) * 0.35 * wave;
  const pump = Math.sin(frame * 0.45) * 0.25 * celebrate;

  const pose: Pose = {
    walkPhase: frame * 0.42,
    walk,
    armL: { x: 0, z: 0.08 + surprise * 0.9 + celebrate * 2.7 + pump },
    armR: { x: think * -2.35 - wave * 0.35, z: -0.08 - wave * 2.25 + waving + think * 0.3 - surprise * 0.9 - celebrate * 2.7 - pump },
    head: {
      x: think * -0.25 - surprise * 0.12 + Math.sin(frame * 0.08) * 0.02,
      y: think * 0.25,
      z: think * 0.16 + wave * 0.08 * Math.sin(frame * 0.2),
    },
    lean: walk * 0.06 - surprise * 0.08,
  };

  const face = blendFace({
    happy: Math.max(wave, celebrate, walk * 0.6),
    thinking: think,
    surprised: surprise,
  });

  // Idle breathing
  const breathe = Math.sin(frame * 0.1) * 0.012;

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #E0F2FE 0%, #F0FDFA 60%, #FEF9EE 100%)" }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: portrait ? [0, 2.4, 13] : [0, 1.7, 10], rotation: [0, 0, 0], fov: 30 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 8, 6]} intensity={2.2} />
        <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#BAE6FD" />

        <group position={[x, 0, 0]}>
          {/* soft ground shadow, shrinks as the character jumps */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} scale={1 - jumpY * 0.35}>
            <circleGeometry args={[0.75, 48]} />
            <meshBasicMaterial color="#0F172A" transparent opacity={0.12} />
          </mesh>

          <group position={[0, jumpY, 0]} scale={[1 - stretch * 0.6, 1 + stretch + breathe, 1 - stretch * 0.6]}>
            <group rotation={[0, yaw, 0]}>
              <Character pose={pose} face={face} blink={blink(frame)} />
            </group>
          </group>

          <ThoughtBubble amount={think} frame={frame} />
          <Exclamation amount={surprise} />
          <Confetti frame={frame} start={196} />
        </group>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
