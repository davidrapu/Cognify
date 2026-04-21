import GameLayout from "@/components/GameLayout";
import HeartDisplay from "@/components/HeartDisplay";
import { Button } from "@/components/ui/button";
import type {
  LeveledGameAction,
  LeveledGameState,
} from "@/hooks/useLeveledGameReducer";
import { cn } from "@/lib/utils";
import { generateSimilarColors } from "@/utils/generateSimilarColors";
import { useCallback, useEffect, useRef, useState } from "react";

type ActiveProps = {
  state: LeveledGameState;
  dispatch: React.Dispatch<LeveledGameAction>;
};

const difficultyConfig = {
  easy: {
    count: 64,
    lightnessShift: 15,
    cols: "grid-cols-8",
  },
  medium: {
    count: 100,
    lightnessShift: 10,
    cols: "grid-cols-10",
  },
  hard: {
    count: 144,
    lightnessShift: 5,
    cols: "grid-cols-12",
  },
};

export default function Active({ state, dispatch }: ActiveProps) {
  const config = difficultyConfig[state.gameLevel];

  const generateNewColors = useCallback(() => {
    return generateSimilarColors({
      count: config.count,
      lightnessShift: config.lightnessShift,
    });
  }, [config.count, config.lightnessShift]);

  const [colorData, setColorData] = useState(generateNewColors());
  const [failed, setFailed] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [totalTries, setTotalTries] = useState<number>(0);
  const reactonTimeRef = useRef<number>(0);

  const handleClick = (index: number) => {
    dispatch({ type: "increaseAttempts" });
    setTotalTries((prev) => prev + 1);
    const reactionTime = Date.now() - reactonTimeRef.current; // eslint-disable-line
    // set reaction time for current round and reset timer
    dispatch({
      type: "updateTotalTime",
      payload: { time: reactionTime, correct: index === colorData.oddIndex },
    });
    // Keep generating new colors until user clicks the wrong one
    if (index === colorData.oddIndex) {
      // Generate new colors for next round
      setColorData(generateNewColors());
      setFailed(false);
      // Increment score
      dispatch({ type: "increaseTotalCorrect" });
      setStreak((prev) => prev + 1);
      if (streak + 1 > state.highestConsecutiveCorrect) {
        dispatch({
          type: "updateHighestConsecutiveCorrect",
          payload: streak + 1,
        });
      }
    } else {
      dispatch({ type: "increaseTotalIncorrect" });
      setFailed(true);
      setStreak(0);
      // when user chances are up, end game and show results
      if (state.totalAllowedAttempts - (state.totalIncorrect + 1) <= 0) {
        const timer = setTimeout(() => {
          dispatch({ type: "endGame" });
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  };

  useEffect(() => { // end game after 30 total tries to prevent infinite play
    if (totalTries >= 30) {
      dispatch({ type: "endGame" });
    }
  }, [totalTries, dispatch]);

  useEffect(() => {
    // Reset failed state and generate new colors after a short delay when user clicks the wrong one
    if (!failed) return;
    const timeout = setTimeout(() => {
      setFailed(false);
      setColorData(generateNewColors());
    }, 1000);
    return () => clearTimeout(timeout);
  }, [failed, generateNewColors]);

  useEffect(() => {
    // Start reaction timer when new colors are generated

    reactonTimeRef.current = Date.now();
  }, [colorData]);

  return (
    <GameLayout>
      <div className="relative border-2 border-primary rounded-3xl bg-card flex-1 flex items-center justify-center">
        <div className={cn("grid gap-0.5", config.cols)}>
          {colorData.colors.map((color, i) => (
            <Button
              key={i}
              className={cn(
                "size-10 rounded-md transition-transform active:scale-95",
              )}
              style={
                !failed
                  ? { backgroundColor: color }
                  : i === colorData.oddIndex
                    ? {
                        border: "2px solid var(--destructive)",
                        scale: "0.95",
                        backgroundColor: color,
                      }
                    : { backgroundColor: color }
              }
              onClick={() => handleClick(i)}
              aria-label={`Color box ${i + 1}`}
              disabled={failed}
            />
          ))}
        </div>
        <div className="absolute top-5 right-5">
            <HeartDisplay
              numberOfFilledHearts={
                state.totalAllowedAttempts - state.totalIncorrect
              }
              innerColor="var(--destructive)"
              outerColor="var(--destructive)"
              length={state.totalAllowedAttempts}
            />
        </div>
      </div>
    </GameLayout>
  );
}
