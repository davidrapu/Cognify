import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import type { GameAction, GameState } from "@/hooks/useGameReducer";
import { useEffect, useRef, useState } from "react";

const getRandomBoolean = () => {

    const randomValues = Array.from({length: 3}, () => Math.random() < 0.5);

    return randomValues[Math.floor(Math.random() * randomValues.length)];
};
export default function Active({ state, dispatch } : {state: GameState, dispatch: React.Dispatch<GameAction>}) {
  
  const [selectionState, setSelectionState] = useState<"go" | "wait" | "noGo">("wait");
  const reactionTimeRef = useRef<number>(0);
  const [streak, setStreak] = useState<number>(0);
  
  const gameStateRef = useRef(state)
  const stateRef = useRef(selectionState)
  
  useEffect(() => {
    gameStateRef.current = state
  }, [state])
  
  useEffect(() => {
    stateRef.current = selectionState;
  })

  // Window-level spacebar listener
  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Space") return

      event.preventDefault();
      const reaction = Date.now() - reactionTimeRef.current;
      dispatch({type: "increaseAttempts"})
      dispatch({type: "addTimeTaken", payload: {time: reaction, correct: stateRef.current === "go"}})

      if (stateRef.current === "go") {
        dispatch({type: "incrementCorrect"})
        setStreak((prev) => prev + 1);
        if (streak + 1 > gameStateRef.current.highestConsecutiveCorrect) {
          dispatch({type: "setHighScore", payload: streak + 1})
        }
        setSelectionState("wait");
      } else if (stateRef.current === "noGo") {
        dispatch({type: "incrementIncorrect"})
        setStreak(0);
        setSelectionState("wait");
      } else if (stateRef.current === "wait") {
        dispatch({type: "incrementIncorrect"})
        setStreak(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, streak]); // Re-attach when selectionState changes

  useEffect(() => {
    if (selectionState === "go") return

    if (selectionState === "wait") {
      const timer = setTimeout(() => {
        const newIsGo = getRandomBoolean();
        setSelectionState(newIsGo ? "go" : "noGo");
      }, 200);
      return () => clearTimeout(timer);
    } else if (selectionState === "noGo") {

      const timer = setTimeout(() => {
        setSelectionState("wait");
      }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds

      return () => clearTimeout(timer);
    }
  }, [selectionState]);

  useEffect(() => {
    if (state.totalIncorrect >= state.totalAllowedTries) {
      dispatch({type: "endGame"})
    }
  })

  useEffect(() => { // getting reaction time
    if (selectionState === "wait") return

    reactionTimeRef.current = Date.now()

  }, [selectionState])

  return (
    <GameLayout>
      <div className="relative flex-1 border-2 border-primary rounded-2xl bg-card flex items-center justify-center">
        <div className="absolute right-5 top-5 text-center space-y-3">
          <HeartDisplay numberOfFilledHearts={state.totalAllowedTries - state.totalIncorrect} innerColor="var(--destructive)" outerColor="var(--destructive)" length={state.totalAllowedTries} />
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
