import React from "react";
import { DottedGlowBackground } from "../../components/ui/dotted-glow-background";
import Nav from "../../components/Nav";
import Hero from "./Hero";
import Aims from "./Aims";

export default function Home() {
  return (
    <>
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
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
      <div className="flex flex-col gap-y-28 w-full px-10">
        <Nav />
        <main className="flex flex-col gap-y-36 items-center mt-24">
          {/* <Hero /> */}
          {/* <Aims /> */}
        </main>
      </div>
    </>
  );
}
