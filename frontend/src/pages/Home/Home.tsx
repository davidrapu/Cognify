import React from "react";
import { DottedGlowBackground } from "../../components/ui/dotted-glow-background";

export default function Home() {
  return (
    <>
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-80"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        speedMin={0.3}
        speedMax={1.6}
        speedScale={0.8}
      />
      <div className="">

      </div>
    </>
  );
}
