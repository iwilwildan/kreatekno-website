import { Composition } from "remotion";
import { HeroScene } from "./HeroScene";

const FPS = 30;
const DURATION = 240; // 8 seconds

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Hero-16x9"
        component={HeroScene}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ portrait: false }}
      />
      <Composition
        id="Hero-9x16"
        component={HeroScene}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ portrait: true }}
      />
    </>
  );
};
