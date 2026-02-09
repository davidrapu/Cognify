import { AnimatedButton } from "@/components/Button";
import CardMatch from "./CardMatch";
import { useCardMatchReducer } from "@/hooks/useCardMatchReducer";
import { ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Summary from "./Summary";
import Intro from "./Intro";

const difficultyConfig = {
  easy: { pairs: 8, cols: 4 },
  medium: { pairs: 12, cols: 6 },
  hard: { pairs: 16, cols: 8 },
} as const;
export default function CardMatchGame() {
  const [state, dispatch] = useCardMatchReducer();
  const s = state.gameLevel as keyof typeof difficultyConfig;
  const { pairs, cols } = difficultyConfig[s];
  return (
    <>
      {/* Intro, Active, and Complete should all use the same box */}
      <main>{state.gameState === "intro" && <Intro />}</main>
      {state.gameState !== "intro" && (
        <main className="flex flex-1 justify-center items-center">
          <div
            className="p-2 gap-y-1 drop-shadow-xl/30 bg-secondary rounded-2xl aspect-auto min-w-300 animate-in zoom-in-0 duration-300 "
          >
            {state.gameState === "active" && (
              <div className="flex flex-col items-center gap-y-5 p-3">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-bold leading-normal tracking-[0.2em] font-(family-name:--headings)">
                    Card Matching
                  </h1>
                  <div className="flex justify-between text-[17px] w-full">
                    <p className="bg-card text-secondary-foreground rounded-2xl p-3">
                      Matches: {state.matchedCards} /{" "}
                      {difficultyConfig[s].pairs}
                    </p>
                    <p className="bg-card text-secondary-foreground rounded-2xl p-3">
                      Attempts: {state.totalAttempts}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col relative gap-y-4 w-auto justify-center">
                  <CardMatch pairs={pairs} cols={cols} dispatch={dispatch} />
                </div>
                {state.matchedCards === difficultyConfig[s].pairs && (
                  <AnimatedButton
                    onClick={() =>
                      dispatch({
                        type: "setGameState",
                        payload: "completed",
                      })
                    }
                    className="w-fit px-8 py-2 self-end animate-in fade-in slide-in-from-top-20 duration-300"
                  >
                    <ChevronRight
                      absoluteStrokeWidth={false}
                      size={25}
                      strokeWidth={3}
                    />
                  </AnimatedButton>
                )}
              </div>
            )}
            {state.gameState === "completed" && (
              <AnimatePresence>
                <Summary />
              </AnimatePresence>
            )}
          </div>
        </main>
      )}
    </>
  );
}
