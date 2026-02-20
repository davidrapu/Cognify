import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const getRandomBoolean = () => {

    const randomValues = Array.from({length: 3}, () => Math.random() < 0.5);

    return randomValues[Math.floor(Math.random() * randomValues.length)];
};

export default function Active() {
  const [selectionState, setSelectionState] = useState<"go" | "wait" | "noGo" | "reset">("wait");
  const [score, setScore] = useState<number>(0);

  // Window-level spacebar listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Space") {
        event.preventDefault();
        if (selectionState === "go") {
          setScore((prev) => prev + 1);
          setSelectionState("wait");
        } else if (selectionState === "noGo") {
          console.log("You clicked when you shouldn't have!");
          setScore(0);
          setSelectionState("reset");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectionState]); // Re-attach when selectionState changes

  const handleReset = () => {
    setScore(0);
    setSelectionState("wait");
  };

  useEffect(() => {
    if (selectionState === "wait") {
      const timer = setTimeout(() => {
        const newIsGo = getRandomBoolean();
        setSelectionState(newIsGo ? "go" : "noGo");
      }, 500);
      return () => clearTimeout(timer);
    } else if (selectionState === "noGo") {
      const timer = setTimeout(() => {
        setSelectionState("wait");
      }, 1000);
      return () => clearTimeout(timer);
    } else if (selectionState === "go") {
      const timer = setTimeout(() => {
        setSelectionState("reset");
        console.log("You didn't click in time!");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectionState]);

  return (
    <GameLayout>
      <div className="relative flex-1 border-2 border-primary rounded-2xl bg-card flex items-center justify-center">
        <div className="absolute right-5 top-5 text-center space-y-3">
          <p className="text-2xl font-medium">
            Score: <span className="text-primary">{score}</span>
          </p>
          {selectionState === "reset" && (
            <Button
              variant="destructive"
              className="animate-in fade-in slide-in-from-right-30 duration-300"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
        {selectionState === "go" && (
          <div className="h-50 aspect-video bg-acceptive rounded-2xl flex items-center justify-center flex-col text-acceptive-foreground">
            <p className="text-4xl font-family-heading">Go</p>
            <p className="text-muted">Click Spacebar</p>
          </div>
        )}
        {selectionState === "noGo" && (
          <div className="h-50 aspect-video bg-destructive rounded-2xl flex items-center justify-center flex-col text-destructive-foreground">
            <p className="text-4xl font-family-heading">No Go</p>
            <p className="text-muted">Do nothing...</p>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
