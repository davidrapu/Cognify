import GameLayout from "@/components/GameLayout";
import { Play } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const buttonStyles = "duration-300 ease-in-out";

export default function GameIntroPage({
  includeLevelSelector = false,
  gameLevel,
  setGameLevel,
  playGame,
  instructions = []
}: {
  includeLevelSelector?: boolean;
  gameLevel?: "easy" | "medium" | "hard";
  setGameLevel?: (level: "easy" | "medium" | "hard") => void;
  playGame: () => void;
  instructions?: string[]
}) {
  return (
    <GameLayout>
      <div className="flex-2 bg-primary rounded-2xl flex items-center justify-center">
        <h1 className="md:text-6xl font-bold text-primary-foreground font-family-heading tracking-widest">
          Instructions
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {instructions.map((instruction: string, index: number) => (
          <Card key={index} className="p-2 gap-y-0">
            <CardHeader>
              <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
                {index + 1}.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{instruction}</p>
            </CardContent>
          </Card>
        ))}
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
          {includeLevelSelector && setGameLevel && gameLevel && (
            <div className="flex gap-x-4">
              <Button
                onClick={() => setGameLevel && setGameLevel("easy")}
                className={cn(
                  buttonStyles,
                  gameLevel === "easy" && "scale-120",
                )}
              >
                Easy
              </Button>
              <Button
                onClick={() => setGameLevel("medium")}
                className={cn(
                  buttonStyles,
                  gameLevel === "medium" && "scale-120",
                )}
              >
                Medium
              </Button>
              <Button
                onClick={() => setGameLevel("hard")}
                className={cn(
                  buttonStyles,
                  gameLevel === "hard" && "scale-120",
                )}
              >
                Hard
              </Button>
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  );
}
