import { useCardMatchReducer } from "@/hooks/useCardMatchReducer";
import Intro from "./states/Intro";
import Active from "./states/Active/Active";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import EmptyPage from "@/components/EmptyPage";

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
      <main>
        {state.gameState === "home" && <GameHomePage
          title="Card Match" averageAccuracy={20} averageScore={20} highScore={20}
          description="Test your memory and concentration skills with Card Match! Flip over pairs of cards to find matches, but be careful - the more attempts you make, the lower your score. Can you beat your high score and become a Card Match master?"
          instructions={[
            { step: 1, title: "Choose Difficulty", desc: "Select a difficulty level to start the game. The higher the difficulty, the more pairs of cards you'll need to match." },
            { step: 2, title: "Memorize the Cards", desc: "Take a moment to memorize the positions of the cards before they are flipped back over." },
            { step: 3, title: "Find Matches", desc: "Click on two cards to flip them over. If they match, they will stay face up. If not, they will flip back down. Try to find all the matches with as few attempts as possible!" },
          ]}
          onStartGame={() => dispatch({ type: "setGameState", payload: "intro" })}
        />}
        {state.gameState === "intro" && <Intro dispatch={dispatch} />}
        {state.gameState === "active" && (
          <Active state={state} pairs={pairs} cols={cols} dispatch={dispatch} />
        )}
        {state.gameState === "completed" && (
          <EmptyPage />
        )}
      </main>
    </>
  );
}
