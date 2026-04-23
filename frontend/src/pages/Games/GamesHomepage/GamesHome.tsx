import { Badge } from "@/components/ui/badge";
import GameRowSection from "./GameRowSection";
import { gamesInfo } from "@/assets/data/gamesInfo";
import { useIsMobile } from "@/hooks/use-mobile";

type GameInfo = {
  title: string;
  description: string;
  domain: string;
  imgLink: string;
  gameLocation: string;
};

export default function GamesHome2() {
  const isMobile = useIsMobile();
  return (
    <main className=" ml-2 min-h-full min-w-0 space-y-20">
      <div className="pr-2">
        <Badge
          variant="default"
          className=" text-xs uppercase bg-primary/10 text-primary py-1 tracking-widest"
        >
          COGNITIVE ASSESSMENT MODULE
        </Badge>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-family-manrope font-extrabold my-3 tracking-wide">
          Cognitive Excercise Library
        </h1>
        <p className=" text-md md:text-lg lg:text-xl max-w-md text-muted-foreground leading-relaxed">
          Nine short games designed to measure your memory, attention, reaction
          speed, and problem-solving ability.
        </p>
      </div>
      <div className="space-y-10">
        <GameRowSection
          games={gamesInfo.filter((game: GameInfo) => game.domain === "Memory")}
          domain="Memory"
          isMobile={isMobile}
        />
        <GameRowSection
          games={gamesInfo.filter(
            (game: GameInfo) => game.domain === "Attention",
          )}
          domain="Attention"
          isMobile={isMobile}
        />
        <GameRowSection
          games={gamesInfo.filter(
            (game: GameInfo) => game.domain === "Reaction",
          )}
          domain="Reaction"
          isMobile={isMobile}
        />
        <GameRowSection
          games={gamesInfo.filter(
            (game: GameInfo) => game.domain === "Problem Solving",
          )}
          domain="Problem Solving"
          isMobile={isMobile}
        />
      </div>
    </main>
  );
}
