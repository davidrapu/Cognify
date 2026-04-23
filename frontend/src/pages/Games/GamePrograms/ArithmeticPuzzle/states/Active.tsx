import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GameAction, GameState } from "@/hooks/useGameReducer";
import generateArithmeticQuestion from "@/utils/generateArithmeticPuzzle";
import { useEffect, useRef, useState } from "react";

export default function Active({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}) {
  const [userInput, setUserInput] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(5); // 5 - 20
  const [patternData, SetPatternData] = useState(() =>
    generateArithmeticQuestion(difficulty),
  );
  const reactionTimeRef = useRef<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const reaction = Date.now() - reactionTimeRef.current;
    const correct = Number(userInput) === patternData.answer;
    // console.log(`Reaction time: ${reaction} ms`); // For debugging: logs the reaction time
    dispatch({
      type: "addTimeTaken",
      payload: { time: reaction, correct },
    });
    dispatch({ type: "increaseAttempts" });
    if (correct) {
      dispatch({ type: "incrementCorrect" });
      setStreak((prev) => prev + 1);
      // console.log(`Current streak: ${streak + 1}, Difficulty: ${difficulty}`); // For debugging: logs the current streak and difficulty
      if ((streak + 1) % 4 === 0) {
        setDifficulty((prev) => Math.min(prev + 1, 20)); // Increase difficulty, max 20
      }
      if (streak + 1 > state.highestConsecutiveCorrect)
        dispatch({ type: "setHighestConsecutiveCorrect", payload: streak + 1 });
    }
    else {
      dispatch({ type: "incrementIncorrect" });
      setStreak(0);
    }
    setUserInput('');
    SetPatternData(generateArithmeticQuestion(difficulty));
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
    // console.log(patternData); // For debugging: shows the full pattern in the console
    reactionTimeRef.current = Date.now(); // reset reaction time on new pattern
  }, [patternData]);

  return (
    <>
      <GameLayout className="gap-6">
        <div className="flex flex-col flex-2 rounded-lg bg-primary p-3 gap-y-8 max-w-220">
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
          <div className="flex flex-1 flex-wrap justify-center items-center gap-4 mb-3">
            {patternData.pattern.map((number, index) => (
              <div
                key={index}
                className={
                  "min-w-15 min-h-15 md:min-w-20 md:min-h-20 lg:min-w-30 lg:min-h-30  rounded-2xl shadow-lg/20 bg-muted flex flex-wrap items-center justify-center text-2xl font-semibold text-muted-foreground"
                }
              >
                {number === -1 ? "?" : number}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-secondary rounded-2xl flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <Input
              ref={inputRef}
              onKeyDown={handleEnter}
              type="number"
              placeholder="Enter the missing number"
              className=" w-80 h-12 bg-muted border-primary border-2 "
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
