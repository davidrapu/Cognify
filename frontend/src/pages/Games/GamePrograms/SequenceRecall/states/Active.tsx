import ClusteredNumbers from "@/components/ClusteredNumbers";
import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { GameAction, GameState } from "@/hooks/useGameReducer";
import { generateRandomDigits } from "@/utils/generateRandomDigits";
import { useEffect, useRef, useState } from "react";

const getSequence = (length: number): string[] => {
  const sequence = generateRandomDigits(length).split("");
  const newSequence = sequence.join(" ").split("");
  return newSequence;
};

export default function Active({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}) {
  const [difficulty, setDifficulty] = useState<number>(3);
  const [numberList, setNumberList] = useState<string[]>(
    getSequence(difficulty),
  );
  const [displayedNumberIndex, setDisplayedNumberIndex] = useState(0);
  const [display, setDisplay] = useState(true);
  const [userInput, setUserInput] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [lossStreak, setLossStreak] = useState(0);
  const reactionTimeRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const correct: boolean = userInput === numberList.join("").split(" ").join("");

    const reaction = Date.now() - reactionTimeRef.current; //eslint-disable-line

    dispatch({ type: "increaseAttempts" });
    dispatch({ type: "addTimeTaken", payload: { time: reaction, correct } });
    if (correct) {
      dispatch({ type: "incrementCorrect" });
      setStreak((prev) => prev + 1);
      setLossStreak(0);
      if ((streak + 1) % 4 === 0) {
        // every 4 consecutive correct answers, increase the difficulty
        setDifficulty((prev) => prev + 1);
      }
      if (streak + 1 > state.highestConsecutiveCorrect) {
        dispatch({ type: "setHighestConsecutiveCorrect", payload: streak + 1 });
      }
      reset();
    } else {
      dispatch({ type: "incrementIncorrect" });
      setStreak(0);
      setLossStreak((prev) => prev + 1);
      if ((lossStreak + 1) % 3 === 0) {
        // every 3 consecutive incorrect answers, decrease the difficulty
        setDifficulty((prev) => Math.max(3, prev - 1));
      }
      reset();
    }
  };
  const reset = () => {
    setNumberList(getSequence(difficulty));
    setDisplayedNumberIndex(0);
    setUserInput(null);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (userInput) submit();
  };

  useEffect(() => {
    inputRef.current?.focus();
    // Display each number for 1 second, then move to the next
    if (displayedNumberIndex >= numberList.length) return; // so you dont go past the end of the array

    if (display) {
      // display the number for 1 second, then hide it for 300ms before showing the next number
      const timer = setTimeout(() => {
        setDisplayedNumberIndex((prev) => prev + 1);
        setDisplay(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedNumberIndex((prev) => prev + 1);
        setDisplay(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [displayedNumberIndex, numberList.length, display]);

  // watching for when the user runs out of tries or completes the game
  useEffect(() => {
    if (state.totalAllowedTries - state.totalIncorrect <= 0) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalAllowedTries, state.totalIncorrect, dispatch]);

  // for watching users reaction time
  useEffect(() => {
    if (displayedNumberIndex < numberList.length) return; // only start the timer once the full sequence has been displayed

    reactionTimeRef.current = Date.now();

  });

  return (
    <GameLayout>
      <div className=" flex-1 p-2 flex font-(family-name: --headings) rounded-lg text-primary-foreground bg-primary">
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          {displayedNumberIndex < numberList.length ? (
            <p className="text-[60px]">{numberList[displayedNumberIndex]}</p>
          ) : (
            <div className="w-full">
              <FieldGroup onKeyDown={handleEnter} className="flex">
                <Field>
                  <FieldLabel
                    htmlFor="input-field-for-number"
                    className="text-xl"
                  >
                    Enter number
                  </FieldLabel>
                  <Input
                    id="input-field-for-number"
                    inputMode="numeric"
                    type="number"
                    className="h-10 bg-card text-card-foreground rounded-xl caret-primary"
                    value={userInput ?? ""}
                    onChange={(e) => setUserInput(e.target.value)}
                    ref={inputRef}
                  />
                </Field>
                {userInput && (
                  <Field className="w-fit self-end">
                    <Button
                      type="button"
                      variant="secondary"
                      className="self-end cursor-pointer animate-in fade-in duration-300"
                      onClick={submit}
                    >
                      Submit
                    </Button>
                  </Field>
                )}
              </FieldGroup>
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-end ">
          <HeartDisplay
            numberOfFilledHearts={state.totalAllowedTries - state.totalIncorrect}
            innerColor="var(--destructive)"
            outerColor="var(--destructive)"
            length={state.totalAllowedTries}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ClusteredNumbers
          setUserInput={setUserInput}
          disabled={displayedNumberIndex < numberList.length}
        />
      </div>
    </GameLayout>
  );
}
