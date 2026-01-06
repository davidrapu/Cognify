import React from "react";
import { DottedGlowBackground } from "../../components/ui/dotted-glow-background";
import Nav from "../../components/Nav";
import Hero from "./Hero";
import Aims from "./Aims";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <DottedGlowBackground
        className="pointer-events-none absolute inset-0 z-0 mask-radial-to-90% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        speedMin={0.3}
        speedMax={1}
        speedScale={0.8}
      />
      <div className="relative z-10 flex flex-col gap-y-10 w-full px-10">
        <Nav />
        <main className="flex flex-col gap-y-36 items-center mt-24">
          <Hero />
          <Aims />
        </main>
      </div>
    </div>
  );
}
