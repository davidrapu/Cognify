import GameLayout from "@/components/GameLayout";
import { ArrowBigLeft, ArrowBigRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const getRandomArrow = (): "left" | "right" => {
  const randomArrows = Array.from({ length: 10 }, () =>
    Math.random() < 0.5 ? "left" : "right",
  );
  return randomArrows[Math.floor(Math.random() * randomArrows.length)];
};

export default function Active() {
  const [displayedState, setDisplayedState] = useState<
    "left" | "wait" | "right" | "reset"
  >("wait");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q" || event.key === "Q") {
        event.preventDefault();
        console.log("Q pressed - Left");
        // Handle left arrow press
        if (displayedState === "left") {
          setScore((prev) => prev + 1);
          setDisplayedState("wait");
        } else if (displayedState === "right") {
          console.log("Wrong key!");
          setScore(0);
          setDisplayedState("reset");
        }
      } else if (event.key === "e" || event.key === "E") {
        event.preventDefault();
        console.log("E pressed - Right");
        // Handle right arrow press
        if (displayedState === "right") {
          setScore((prev) => prev + 1);
          setDisplayedState("wait");
        } else if (displayedState === "left") {
          console.log("Wrong key!");
          setScore(0);
          setDisplayedState("reset");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayedState]);

  const handleReset = () => {
    setScore(0);
    setDisplayedState("wait");
  }

  useEffect(() => {
    if (displayedState === "wait") {
      const timer = setTimeout(() => {
        setDisplayedState(getRandomArrow());
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [displayedState]);

  return (
    <GameLayout>
      <div className="relative flex-1 bg-card border-2 border-primary rounded-2xl flex justify-center items-center">
        <div className="absolute top-6 right-6 text-2xl flex flex-col items-center gap-y-3">
          <p className="font-semibold">
            Score: <span className="text-primary">{score}</span>
          </p>
          {displayedState === "reset" && (
            <Button
              className="animate-in fade-in-20 slide-in-from-right-20"
              variant="destructive"
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
        </div>
        {displayedState === "left" && (
          <ArrowBigLeft
            fill="var(--destructive)"
            color="var(--destructive)"
            size={160}
          />
        )}
        {displayedState === "right" && (
          <ArrowBigRight
            fill="var(--acceptive)"
            color="var(--acceptive)"
            size={160}
          />
        )}
      </div>
    </GameLayout>
  );
}
