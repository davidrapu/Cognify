import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import { ArrowBigLeft, ArrowBigRight } from "@/components/icons";
import type { GameAction, GameState } from "@/hooks/useGameReducer";
import { useEffect, useRef, useState } from "react";

const getRandomArrow = (): "left" | "right" => {
  const randomArrows = Array.from({ length: 10 }, () =>
    Math.random() < 0.5 ? "left" : "right",
  );
  return randomArrows[Math.floor(Math.random() * randomArrows.length)];
};

export default function Active({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}) {
  const [displayedState, setDisplayedState] = useState<
    "left" | "wait" | "right"
  >("wait");
  const streakRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const gameStateRef = useRef<GameState>(state);

  useEffect(() => {
    gameStateRef.current = state;
  }, [state]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      const keyPressed = event.key.toUpperCase();

      if (keyPressed !== "Q" && keyPressed !== "E") return;
      if (displayedState === "wait") return;
      

      dispatch({ type: "increaseAttempts" });
      const reaction = Date.now() - startTimeRef.current;

      if (displayedState === "left") {

        dispatch({ type: "addTimeTaken", payload: { time: reaction, correct: keyPressed === "Q" } })

        if (keyPressed === "Q") {
          dispatch({ type: "incrementCorrect" });
          streakRef.current += 1;
          if (streakRef.current > gameStateRef.current.highestConsecutiveCorrect) {
            dispatch({ type: "setHighestConsecutiveCorrect", payload: streakRef.current });
          }
        } else if (keyPressed === "E") {
          dispatch({ type: "incrementIncorrect" });
          streakRef.current = 0;
        }
      } else if (displayedState === "right") {
        dispatch({ type: "addTimeTaken", payload: { time: reaction, correct: keyPressed === "E" } })
        if (keyPressed === "E") {
          dispatch({ type: "incrementCorrect" });
          streakRef.current += 1;
          if (streakRef.current > gameStateRef.current.highestConsecutiveCorrect) {
            dispatch({ type: "setHighestConsecutiveCorrect", payload: streakRef.current });
          }
        } else if (keyPressed === "Q") {
          dispatch({ type: "incrementIncorrect" });
          streakRef.current = 0;
        }
      }else {
        dispatch({ type: "addTimeTaken", payload: { time: reaction, correct: false } });
        dispatch({ type: "incrementIncorrect" });
        streakRef.current = 0;
      }
      setDisplayedState("wait");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayedState, dispatch]);

  useEffect(() => {
    if (state.totalIncorrect >= state.totalAllowedTries) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalIncorrect, state.totalAllowedTries, dispatch]);

  useEffect(() => { // reaction time
    if (displayedState === "wait") return

    startTimeRef.current = Date.now();


  }, [displayedState])

  useEffect(() => {
    if (displayedState !== "wait") return

    const timer = setTimeout(() => {
      setDisplayedState(getRandomArrow());
    }, 200);

    return () => clearTimeout(timer);
  }, [displayedState]);

  useEffect(() => {
    if (state.totalIncorrect >= state.totalAllowedTries) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalIncorrect, state.totalAllowedTries, dispatch]);

  return (
    <GameLayout>
      <div className="relative flex-1 bg-card border-2 border-primary rounded-2xl flex justify-center items-center">
        <div className="absolute right-5 top-5 text-center space-y-3">
          <HeartDisplay
            numberOfFilledHearts={
              state.totalAllowedTries - state.totalIncorrect
            }
            innerColor="var(--destructive)"
            outerColor="var(--destructive)"
            length={state.totalAllowedTries}
          />
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
