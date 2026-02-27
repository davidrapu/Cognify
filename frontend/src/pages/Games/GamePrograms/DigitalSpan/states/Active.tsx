import ClusteredNumbers from "@/components/ClusteredNumbers";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  type SpanGameAction,
  type SpanGameState,
} from "@/hooks/useSpanGameReducer";
import { generateRandomDigits } from "@/utils/generateRandomDigits";
import { useRef, useState, useEffect } from "react";
import {Heart} from '@/components/icons'

export default function Active({
  state,
  dispatch,
}: {
  state: SpanGameState;
  dispatch: React.Dispatch<SpanGameAction>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [countDownTimeSpent, setCountDownTimeSpent] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [currentDigits, setCurrentDigits] = useState<string>(
    generateRandomDigits(3),
  );
  const [userInput, setUserInput] = useState<string | null>(null);
  const [refreshConsecutiveCorrect, setRefreshConsecutiveCorrect] =
    useState<number>(0);
  const [consecutiveCorrect, setConsecutiveCorrectValue] = useState<number>(0);
  const [digitsToRemember, setDigitsToRemember] = useState<number>(3);

  const reset = () => {
    setCountDownTimeSpent(0);
    setUserInput(null);
    setTimeTaken(0);
  };

  const submit = () => {
    dispatch({ type: "increaseAttempts" });
    dispatch({ type: "addTimeTaken", payload: timeTaken });

    if (userInput === currentDigits) {
      dispatch({ type: "incrementCorrect" }); // Increment total correct answers

      // Get the current consecutive correct count and refresh consecutive correct count from state
      const newRefreshConsecutiveCorrect = refreshConsecutiveCorrect + 1;
      const newConsecutiveCorrect = consecutiveCorrect + 1;

      // Update the highest consecutive correct count if the new consecutive correct count is greater and set the new consecutive correct count
      if (newConsecutiveCorrect > state.highestConsecutiveCorrect) {
        dispatch({
          type: "setHighestConsecutiveCorrect",
          payload: newConsecutiveCorrect,
        });
      }
      setConsecutiveCorrectValue(newConsecutiveCorrect);

      // If the user has reached 4 consecutive correct answers, increase the digits to remember by 1,
      // reset the refresh consecutive correct count, and generate new digits.
      // Otherwise,just update the refresh consecutive correct count and generate new digits.
      if (newRefreshConsecutiveCorrect === 4) {
        const newDigits = digitsToRemember + 1;
        setDigitsToRemember(newDigits);
        setCurrentDigits(generateRandomDigits(newDigits));
        setRefreshConsecutiveCorrect(0);
      } else {
        setRefreshConsecutiveCorrect(newRefreshConsecutiveCorrect);
        setCurrentDigits(generateRandomDigits(digitsToRemember));
      }
      console.log("Correct!");
    } else {
      // If the answer is incorrect, reduce the total allowed tries by 1, increment total incorrect answers, reset the refresh consecutive correct count and consecutive correct count, and generate new digits.
      dispatch({ type: "reduceAllowedTries" });
      dispatch({ type: "incrementIncorrect" });
      setRefreshConsecutiveCorrect(0);
      setConsecutiveCorrectValue(0);
      setCurrentDigits(generateRandomDigits(digitsToRemember));
      console.log("Incorrect!");
    }
    reset();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (userInput) submit();
  };

  // Start the timer when the digits are displayed and focus the input field
  useEffect(() => {
    if (countDownTimeSpent >= 101) {
      inputRef.current?.focus();
      const timer = setInterval(() => {
        setTimeTaken((prev) => prev + 10);
      }, 10);

      return () => clearInterval(timer);
    }
  }, [countDownTimeSpent]);

  // Count down effect for displaying digits
  useEffect(() => {
    if (countDownTimeSpent < 101) {
      const timer = setTimeout(() => {
        setCountDownTimeSpent((prev) => prev + (10 - digitsToRemember));
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [countDownTimeSpent, digitsToRemember]);

  return (
    <GameLayout>
      <div className=" md:p-4 flex-1 flex rounded-lg min-h-fit text-primary-foreground bg-primary">
        <div className="flex-1"></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          {countDownTimeSpent < 101 ? (
            <>
              <p className="text-[60px] font-family-heading">{currentDigits}</p>
              <Progress
                className="w-full"
                bg="primary-foreground/20"
                color="primary-foreground"
                value={countDownTimeSpent}
              />
            </>
          ) : (
            <>
              <FieldGroup onKeyDown={handleEnter} className="w-full flex">
                <Field>
                  <FieldLabel
                    htmlFor="input-field-for-number"
                    className="text-xl font-family-heading"
                  >
                    Enter number
                  </FieldLabel>
                  <Input
                    id="input-field-for-number"
                    inputMode="numeric"
                    type="number"
                    className="h-10 bg-card text-card-foreground rounded-xl caret-primary font-semibold"
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
            </>
          )}
        </div>
        <div className="flex-1 flex justify-end ">
          <div className="flex gap-x-2 flex-row-reverse">
            {Array.from({ length: 6 }).map((_, index) => (
              <HeartDisplay key={index} filled={index < 6 - state.totalIncorrect} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ClusteredNumbers
          setUserInput={setUserInput}
          disabled={countDownTimeSpent < 101}
        />
      </div>
    </GameLayout>
  );
}

function HeartDisplay({ filled }: { filled: boolean }) {
  return (
    <Heart className='size-7' fill={filled ? "var(--primary-foreground)" : "none"} stroke="var(--primary-foreground)" strokeWidth={2}
    />
  );
}
