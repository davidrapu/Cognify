import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GameAction, GameState } from "@/hooks/useGameReducer";
import { cn } from "@/lib/utils";
import generatePatternQuestion from "@/utils/generatePattern";
import { useEffect, useRef, useState } from "react";

export default function Active({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}) {
  const [userInput, setUserInput] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number>(12); // 6 - 12 decreasing the number will increase the difficulty, as there will be more colors in the pattern and more possible answers for the missing color
  const [patternData, SetPatternData] = useState(() =>
    generatePatternQuestion(difficulty)
  );
  const reactionTimeRef = useRef<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const reaction = Date.now() - reactionTimeRef.current;
    const correct = userInput?.trim().toLowerCase() === patternData.answer;
    // console.log(`Reaction time: ${reaction} ms`); // For debugging: logs the reaction time
    dispatch({
      type: "addTimeTaken",
      payload: { time: reaction, correct },
    });
    dispatch({ type: "increaseAttempts" });
    if (correct) {
      dispatch({ type: "incrementCorrect" });
      setStreak((prev) => prev + 1);
      console.log(`Current streak: ${streak + 1}, Difficulty: ${difficulty}`); // For debugging: logs the current streak and difficulty
      if ((streak + 1) % 3 === 0) {
        setDifficulty((prev) => Math.max(prev - 1, 6)); // Increase difficulty, min 6
      }
      if (streak + 1 > state.highestConsecutiveCorrect)
        dispatch({ type: "setHighestConsecutiveCorrect", payload: streak + 1 });
    } else {
      dispatch({ type: "incrementIncorrect" });
      setStreak(0);
    }
    setUserInput(null);
    SetPatternData(generatePatternQuestion(difficulty));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (userInput) handleSubmit();
  };

  useEffect(() => {
    if (state.totalIncorrect >= state.totalAllowedTries) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalIncorrect, state.totalAllowedTries, dispatch]);

  useEffect(() => {
    inputRef.current?.focus();
    console.log(patternData.fullPattern); // For debugging: shows the full pattern in the console
    reactionTimeRef.current = Date.now(); // reset reaction time on new pattern
  }, [patternData]);

  return (
    <>
      <GameLayout>
        <div className="flex flex-col flex-2 rounded-lg bg-primary p-3 gap-y-8">
          <div className="">
            <HeartDisplay
              numberOfFilledHearts={
                state.totalAllowedTries - state.totalIncorrect
              }
              innerColor="var(--destructive)"
              outerColor="var(--destructive)"
              length={state.totalAllowedTries}
            />
          </div>
          <div className="flex flex-1 flex-wrap justify-center items-center gap-x-4">
            {patternData.pattern.map((color, index) => (
              <div
                key={index}
                className={cn(
                  "w-20 h-30 rounded-2xl shadow-lg/20",
                  color === "?"
                    ? "bg-muted/90 flex items-center justify-center"
                    : patternData.COLOR_CLASSES[color],
                )}
              >
                {color === "?" && (
                  <span className="text-muted-foreground text-2xl font-bold">
                    ?
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-secondary rounded-2xl flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <Input
              ref={inputRef}
              onKeyDown={handleEnter}
              type="text"
              placeholder="Enter the missing color"
              className=" h-12 w-150 bg-muted border-primary border-2 "
              value={userInput || ""}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button className="self-end" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </GameLayout>
    </>
  );
}
