import GameLayout from "@/components/GameLayout";
import { Play } from "@/components/icons";
import { type CardMatchAction, type CardMatchState } from "@/hooks/useCardMatchReducer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const buttonStyles = "duration-300 ease-in-out";


export default function Intro({
  dispatch,
  state
}: {
  dispatch: React.Dispatch<CardMatchAction>;
  state: CardMatchState;
}) {
  const setGameLevel = (level: "easy" | "medium" | "hard") => {
    dispatch({ type: "setGameLevel", payload: level });
  }
  return (
    <GameLayout>
      <div className="flex-2 bg-primary rounded-2xl flex items-center justify-center">
        <h1 className="md:text-6xl font-bold text-primary-foreground font-family-heading tracking-widest">
          Instructions
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              1.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>Every card is faced up for a few seconds.</li>
              <li>Try to memorize them in the correct order.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              2.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>
                After the cards are faced down, click on them in the correct order
              </li>
              <li>
                The more attempts you take, the lower your score will be.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="p-2 gap-y-0">
          <CardHeader>
            <CardTitle className="flex flex-col text-xl text-primary font-family-heading tracking-wider">
              3.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4">
              <li>
                The game ends when you find all the matches or exceed the maximum
                number of attempts.
              </li>
            </ul>
          </CardContent>
        </Card>
        <div className="flex gap-y-4 flex-col items-center justify-around">
          <span
            onClick={() => {
              dispatch({ type: "playGame" });
            }}
            className="bg-primary rounded-xl aspect-video h-20 flex items-center justify-center cursor-pointer"
          >
            <Play
              fill="var(--primary-foreground)"
              size={40}
              className="text-primary-foreground"
            />
          </span>
          <div className="flex gap-x-4">
            <Button  onClick={() => setGameLevel('easy')} className={cn(buttonStyles, state.gameLevel === "easy" && "scale-120")} >
              Easy
            </Button>
            <Button onClick={() => setGameLevel('medium')}  className={cn(buttonStyles, state.gameLevel === "medium" && "scale-120")} >
              Medium
            </Button>
            <Button onClick={() => setGameLevel('hard')}  className={cn(buttonStyles, state.gameLevel === "hard" && "scale-120")} >
              Hard
            </Button>
          </div>
        </div>
      </div>
    </GameLayout>
  );
}
