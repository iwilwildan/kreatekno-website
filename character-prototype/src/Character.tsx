import { RoundedBox } from "@react-three/drei";
import type { Face } from "./timeline";

export const PALETTE = {
  skin: "#F2C29B",
  hair: "#3B2A22",
  hoodie: "#14B8A6",
  hoodieDark: "#0F9488",
  pants: "#334155",
  shoes: "#1E293B",
  face: "#1F1A17",
  cheek: "#F49A8C",
};

export type Pose = {
  walkPhase: number;
  walk: number; // 0..1 walk amount
  armL: { x: number; z: number };
  armR: { x: number; z: number };
  head: { x: number; y: number; z: number };
  lean: number;
};

type BoxProps = {
  size: [number, number, number];
  position?: [number, number, number];
  color: string;
  radius?: number;
};

const Box: React.FC<BoxProps> = ({ size, position, color, radius = 0.08 }) => (
  <RoundedBox args={size} radius={radius} smoothness={4} position={position} castShadow>
    <meshStandardMaterial color={color} roughness={0.65} />
  </RoundedBox>
);

const FaceFeatures: React.FC<{ face: Face; blink: number }> = ({ face, blink }) => {
  const z = 0.51;
  const roundEyeScale = Math.max(0.001, face.eyeOpen * (1 - face.happyEyes) * blink);
  const happyScale = Math.max(0.001, face.happyEyes);
  const flat = Math.max(0.001, (1 - face.smile) * (1 - face.mouthO));
  const eyeY = 0.02 + face.lookY;

  return (
    <group position={[face.lookX * 0.6, 0, z]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.2, eyeY, 0]}>
          {/* round eye */}
          <group scale={[1, roundEyeScale, 1]}>
            <RoundedBox args={[0.13, 0.19, 0.03]} radius={0.06} smoothness={4}>
              <meshStandardMaterial color={PALETTE.face} roughness={0.4} />
            </RoundedBox>
            <mesh position={[0.025, 0.04, 0.02]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>
          {/* happy ^ eye */}
          <mesh scale={happyScale} position={[0, -0.03, 0]}>
            <torusGeometry args={[0.07, 0.022, 8, 24, Math.PI]} />
            <meshStandardMaterial color={PALETTE.face} />
          </mesh>
          {/* brow */}
          <mesh
            position={[0, 0.2 + face.browLift + (side === 1 ? face.browTilt * 0.12 : 0), 0]}
            rotation={[0, 0, side * face.browTilt * 0.4]}
          >
            <boxGeometry args={[0.16, 0.035, 0.03]} />
            <meshStandardMaterial color={PALETTE.hair} />
          </mesh>
          {/* cheek blush */}
          <mesh position={[side * 0.1, -0.17, -0.005]}>
            <circleGeometry args={[0.06, 20]} />
            <meshBasicMaterial color={PALETTE.cheek} transparent opacity={0.25 + face.happyEyes * 0.45} />
          </mesh>
        </group>
      ))}
      {/* mouth: smile arc, flat line, or "O" */}
      <group position={[0, -0.24, 0]}>
        <mesh scale={Math.max(0.001, face.smile)} rotation={[0, 0, Math.PI]} position={[0, 0.06, 0]}>
          <torusGeometry args={[0.09, 0.022, 8, 24, Math.PI]} />
          <meshStandardMaterial color={PALETTE.face} />
        </mesh>
        <mesh scale={[flat, 1, 1]}>
          <boxGeometry args={[0.14, 0.03, 0.03]} />
          <meshStandardMaterial color={PALETTE.face} />
        </mesh>
        <mesh scale={Math.max(0.001, face.mouthO)} position={[0, -0.02, 0]}>
          <torusGeometry args={[0.055, 0.022, 8, 24]} />
          <meshStandardMaterial color={PALETTE.face} />
        </mesh>
      </group>
    </group>
  );
};

// Limb that pivots at its top (shoulder / hip)
const Limb: React.FC<{
  pivot: [number, number, number];
  rotation: [number, number, number];
  upper: { size: [number, number, number]; color: string };
  end: { size: [number, number, number]; color: string };
}> = ({ pivot, rotation, upper, end }) => (
  <group position={pivot} rotation={rotation}>
    <Box size={upper.size} position={[0, -upper.size[1] / 2, 0]} color={upper.color} />
    <Box size={end.size} position={[0, -upper.size[1] - end.size[1] / 2 + 0.04, 0]} color={end.color} />
  </group>
);

export const Character: React.FC<{ pose: Pose; face: Face; blink: number }> = ({ pose, face, blink }) => {
  const swing = Math.sin(pose.walkPhase) * 0.7 * pose.walk;
  const bob = Math.abs(Math.sin(pose.walkPhase)) * 0.06 * pose.walk;

  return (
    <group position={[0, bob, 0]} rotation={[pose.lean, 0, 0]}>
      {/* legs */}
      <Limb
        pivot={[0.2, 0.78, 0]}
        rotation={[swing, 0, 0]}
        upper={{ size: [0.34, 0.6, 0.36], color: PALETTE.pants }}
        end={{ size: [0.36, 0.22, 0.42], color: PALETTE.shoes }}
      />
      <Limb
        pivot={[-0.2, 0.78, 0]}
        rotation={[-swing, 0, 0]}
        upper={{ size: [0.34, 0.6, 0.36], color: PALETTE.pants }}
        end={{ size: [0.36, 0.22, 0.42], color: PALETTE.shoes }}
      />
      {/* torso */}
      <Box size={[0.86, 0.86, 0.5]} position={[0, 1.2, 0]} color={PALETTE.hoodie} radius={0.12} />
      <Box size={[0.5, 0.18, 0.06]} position={[0, 1.02, 0.25]} color={PALETTE.hoodieDark} radius={0.03} />
      {/* arms */}
      <Limb
        pivot={[0.58, 1.55, 0]}
        rotation={[-swing * 0.85 + pose.armL.x, 0, pose.armL.z]}
        upper={{ size: [0.28, 0.6, 0.3], color: PALETTE.hoodie }}
        end={{ size: [0.26, 0.2, 0.28], color: PALETTE.skin }}
      />
      <Limb
        pivot={[-0.58, 1.55, 0]}
        rotation={[swing * 0.85 + pose.armR.x, 0, pose.armR.z]}
        upper={{ size: [0.28, 0.6, 0.3], color: PALETTE.hoodie }}
        end={{ size: [0.26, 0.2, 0.28], color: PALETTE.skin }}
      />
      {/* head, pivoting at the neck */}
      <group position={[0, 1.66, 0]} rotation={[pose.head.x, pose.head.y, pose.head.z]}>
        <group position={[0, 0.5, 0]}>
          <Box size={[1, 1, 1]} color={PALETTE.skin} radius={0.18} />
          {/* hair: top cap + back + fringe */}
          <Box size={[1.06, 0.3, 1.06]} position={[0, 0.4, -0.01]} color={PALETTE.hair} radius={0.13} />
          <Box size={[1.06, 0.8, 0.3]} position={[0, 0.08, -0.4]} color={PALETTE.hair} radius={0.12} />
          <Box size={[0.5, 0.14, 0.12]} position={[0.22, 0.27, 0.48]} color={PALETTE.hair} radius={0.05} />
          <FaceFeatures face={face} blink={blink} />
        </group>
      </group>
    </group>
  );
};
