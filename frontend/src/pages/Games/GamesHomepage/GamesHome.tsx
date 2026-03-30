import { Badge } from "@/components/ui/badge";
import GameRowSection from "./GameRowSection";
import {gamesInfo} from "@/data/gamesInfo";

type GameInfo = {
  title: string;
  description: string;
  domain: string;
  imgLink: string;
  gameLocation: string;
};

export default function GamesHome2() {
  return (
    <main className="mx-auto max-w-6xl min-h-full pt-2 space-y-20">
      <div>
        <Badge
          variant="default"
          className=" text-xs uppercase bg-primary/10 text-primary py-1 tracking-widest"
        >
          COGNITIVE ASSESSMENT MODULE
        </Badge>
        <h1 className="text-4xl font-family-manrope font-extrabold my-3 tracking-wide">
          Cognitive Excercise Library
        </h1>
        <p className=" text-[17px] max-w-2xl text-muted-foreground leading-relaxed">
          Scientifically validated neuro-exercises designed to map, measure, and
          enhance specific cognitive domains through immersive digital therapy.
        </p>
      </div>
      <div className="space-y-10">
        <GameRowSection
          games={gamesInfo.filter((game: GameInfo) => game.domain === "Memory")}
          domain="Memory"
        />
        <GameRowSection
          games={gamesInfo.filter((game: GameInfo) => game.domain === "Attention")}
          domain="Attention"
        />
        <GameRowSection
          games={gamesInfo.filter((game: GameInfo) => game.domain === "Reaction")}
          domain="Reaction"
        />
        <GameRowSection
          games={gamesInfo.filter((game: GameInfo) => game.domain === "Problem Solving")}
          domain="Problem Solving"
        />
      </div>
    </main>
  );
}
