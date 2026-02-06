import { AnimatedButton } from "@/components/Button";
import CardMatch from "./CardMatch";
import { useCardMatchReducer } from "@/hooks/useCardMatchReducer";
import { ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

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
    // Depending on the state show the navigation bar
    //       <header>
    //     <Nav />
    //   </header>
    <main className="mx-auto">
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold leading-loose tracking-[0.2em] font-(family-name:--headings)">
            Card Matching
          </h1>
          <div className="flex justify-between text-[17px] w-full ">
            <p className="bg-secondary text-secondary-foreground rounded-[20px] px-10 py-4 ">
              Matches: {state.matchedCards} / {difficultyConfig[s].pairs}
            </p>
            <p className="bg-secondary text-secondary-foreground rounded-[20px] px-10 py-4 ">
              Attempts: {state.totalAttempts}
            </p>
          </div>
        </div>
        <div className="flex relative gap-x-4 w-full items-center">
          <AnimatePresence>
            {state.gameState === "active" && (
              <CardMatch pairs={pairs} cols={cols} dispatch={dispatch} />
            )}
            {state.matchedCards === difficultyConfig[s].pairs &&
              state.gameState === "active" && (
                <AnimatedButton
                  onClick={() =>
                    dispatch({ type: "setGameState", payload: "completed" })
                  }
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  exit={{ opacity: 0}}
                  className="absolute left-full ml-6 top-1/2 -translate-y-1/2 h-50 w-20 rounded-[15px]"
                >
                  <ChevronRight
                    absoluteStrokeWidth={false}
                    size={65}
                    strokeWidth={3}
                  />
                </AnimatedButton>
              )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
