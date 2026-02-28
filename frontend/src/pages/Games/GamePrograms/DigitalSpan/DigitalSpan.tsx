import Active from "./states/Active";
import { useSpanGameReducer } from "@/hooks/useSpanGameReducer";
import Intro from "./states/Intro";
import GameHomePage from "@/components/GameHomePage/GameHomePage";
import Completed from "@/components/CompletedGameSession";

const historyData = [
  { id: 1, date: "Mar 1", score: 4, accuracy: 50, reaction: 10 },
  { id: 2, date: "Mar 2", score: 5, accuracy: 60, reaction: 9 },
  { id: 3, date: "Mar 3", score: 6, accuracy: 70, reaction: 8 },
  { id: 4, date: "Mar 4", score: 5, accuracy: 65, reaction: 8 },
  { id: 5, date: "Mar 5", score: 7, accuracy: 75, reaction: 7 },
  { id: 6, date: "Mar 6", score: 6, accuracy: 72, reaction: 6 },
  { id: 7, date: "Mar 7", score: 8, accuracy: 85, reaction: 6 },
  { id: 8, date: "Mar 8", score: 7, accuracy: 82, reaction: 5 },
  { id: 9, date: "Mar 9", score: 9, accuracy: 90, reaction: 4 },
  { id: 10, date: "Mar 10", score: 8, accuracy: 88, reaction: 4 },
  { id: 11, date: "Mar 11", score: 10, accuracy: 95, reaction: 3 },
  { id: 12, date: "Mar 12", score: 9, accuracy: 92, reaction: 3 },
  { id: 13, date: "Yesterday", score: 8, accuracy: 89, reaction: 3 },
  { id: 14, date: "Today", score: 9, accuracy: 93, reaction: 2 },
  { id: 15, date: "Today", score: 10, accuracy: 96, reaction: 2 },
];

export default function DigitalSpan() {
  const [state, dispatch] = useSpanGameReducer();
  return (
    <>
      {state.gameState === "intro" && <Intro dispatch={dispatch} />}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && <Completed goHome={() => dispatch({type: "home"})} playAgain={() => dispatch({type: "startGame"})} totalTime={state.totalTime} totalAttempts={state.totalAttempts} totalCorrect={state.totalCorrect} totalIncorrect={state.totalIncorrect} highestConsecutiveCorrect={state.highestConsecutiveCorrect} />}
      {state.gameState === "home" && <GameHomePage 
      title="Digital Span"
      description="Test your working memory by recalling sequences of numbers. The longer the sequence, the more points you earn!"
      onStartGame={() => {dispatch({type: "startGame"})}}
      highScore={8}
      averageScore={6.5}
      averageAccuracy={72}
      instructions={[
        { step: 1, title: "Begin the Game", desc: "Click the 'Start Game' button to begin your first session." },
        { step: 2, title: "View Sequence", desc: "A sequence of numbers will appear on the screen. Try to memorize them!" },
        { step: 3, title: "Recall", desc: "After the numbers disappear, input the sequence in the correct order." },
        { step: 4, title: "Feedback", desc: "After each attempt, you'll receive feedback on your score and accuracy." },
        { step: 5, title: "Improve", desc: "Use the performance chart and game history to track your improvement over time." },
      ]}
      history={historyData} />}
    </>
  );
}
