import GameLayout from "@/components/GameLayout";
import { Play } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const buttonStyles = "duration-300 ease-in-out bg-primary/70";

export default function GameIntroPage({
  includeLevelSelector = false,
  gameLevel,
  isMobile,
  setGameLevel,
  playGame,
  instructions = [],
}: {
  includeLevelSelector?: boolean;
  gameLevel?: "easy" | "medium" | "hard";
  isMobile?: boolean;
  setGameLevel?: (level: "easy" | "medium" | "hard") => void;
  playGame: () => void;
  instructions?: string[];
}) {
  return (
    <GameLayout className="flex flex-col justify-around">
      <Card className="p-2 h-fit w-fit gap-y-0">
        <CardHeader>
          <CardTitle className="flex flex-col text-xl md:text-2xl text-primary font-family-heading tracking-wider">
          Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc space-y-1 pl-2">
            {instructions.map((instruction: string, index: number) => (
              <li key={index} className="text-sm md:text-lg">
                {instruction}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
        <div className="flex gap-y-4 flex-col items-center justify-around">
          <span
            onClick={playGame}
            className="bg-primary rounded-xl aspect-video h-20 flex items-center justify-center cursor-pointer"
          >
            <Play
              fill="var(--primary-foreground)"
              size={40}
              className="text-primary-foreground"
            />
          </span>
          {!isMobile && includeLevelSelector && setGameLevel && gameLevel && (
            <div className="flex gap-x-4">
              <Button
                onClick={() => setGameLevel && setGameLevel("easy")}
                className={cn(
                  buttonStyles,
                  gameLevel === "easy" && "scale-120 bg-primary",
                )}
              >
                Easy
              </Button>
              <Button
                onClick={() => setGameLevel("medium")}
                className={cn(
                  buttonStyles,
                  gameLevel === "medium" && "scale-120 bg-primary",
                )}
              >
                Medium
              </Button>
              <Button
                onClick={() => setGameLevel("hard")}
                className={cn(
                  buttonStyles,
                  gameLevel === "hard" && "scale-120 bg-primary",
                )}
              >
                Hard
              </Button>
            </div>
          )}
        </div>
    </GameLayout>
  );
}
