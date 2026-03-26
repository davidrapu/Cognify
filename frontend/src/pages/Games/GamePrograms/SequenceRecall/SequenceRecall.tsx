import Active from "./states/Active";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import GameIntroPage from "@/components/GameIntroPage";
import Completed from "@/components/CompletedGameSession";
import { useEffect, useState } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import type { SessionsResponse } from "@/types/session.fetched";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import { useGameReducer } from "@/hooks/useGameReducer";
import type { GameHistoryEntry } from "@/types/gameHistory";

export default function SequenceRecall() {
  const [state, dispatch] = useGameReducer();
  const apiFetch = useApiFetch();
  const [history, setHistory] = useState<GameHistoryEntry>([] as GameHistoryEntry);

  const playAgain = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.SEQUENCE_RECALL,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.MEMORY,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save session data");
      return;
    }

    // reset game
    // start new game
    dispatch({ type: "resetGame" });
  };
  const returnHome = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.SEQUENCE_RECALL,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.MEMORY,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save session data");
      return;
    }

    // reset game
    // start new game
    dispatch({ type: "home" });
  };

  // loading all data upon home page render
  useEffect(() => {
    if (state.gameState !== "home") return;

    // fetch user performance data from the API and dispatch to the reducer
    const fetchData = async () => {
      const response = await apiFetch("/sessions/sequence-recall/", {
        method: "GET",
      });
      // Process the data and dispatch to the reducer
      const result: SessionsResponse = await response.json();
      console.log("Fetched data:", result);
      dispatch({
        type: "setAverages",
        payload: {
          averageScore: result.data.stats.averageScore,
          averageAccuracy: result.data.stats.accuracy,
        },
      });
      dispatch({ type: "setHighScore", payload: result.data.stats.highscore });
      const historyData = result.data.sessions.map((session) => ({
        id: session.id,
        date: new Date(session.createdAt),
        score: session.correct,
        accuracy:
          session.correct + session.incorrect > 0
            ? Math.round(
                (session.correct / (session.correct + session.incorrect)) * 100,
              )
            : 0,
        reaction: session.reactionTimeAvg,
      }));
      setHistory(historyData);
    };
    fetchData();
  }, [state.gameState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {state.gameState === "home" && (
        <GameHomePage
          averageAccuracy={state.averageAccuracy}
          title="Sequence Recall"
          averageScore={state.averageScore}
          description="Test your working memory and concentration with Sequence Recall! Watch the pattern carefully and repeat it in the correct order. As the sequences get longer, the challenge grows - how far can you go?"
          highScore={state.highScore}
          instructions={[
            {
              step: 1,
              title: "Begin the Game",
              desc: "Click the 'Start Game' button to begin your session.",
            },
            {
              step: 2,
              title: "Watch the Sequence",
              desc: "A pattern will appear on the screen. Pay close attention and try to remember the order.",
            },
            {
              step: 3,
              title: "Repeat the Sequence",
              desc: "Once the pattern disappears, repeat it in the exact same order.",
            },
            {
              step: 4,
              title: "Progress",
              desc: "Each correct round increases the length of the sequence, making it more challenging.",
            },
            {
              step: 5,
              title: "Track Performance",
              desc: "Review your score and see how far you can go as you improve your memory.",
            },
          ]}
          onStartGame={() => {
            dispatch({ type: "startGame" });
          }}
          history={history}
        />
      )}
      {state.gameState === "intro" && <GameIntroPage instructions={["A sequence of numbers will appear on the screen. Watch carefully and try to memorize the exact order.","Once the sequence disappears, enter the numbers in the correct order. Each correct attempt increases the length of the sequence.","You have a limited number of attempts to reach your highest score. Stay focused and see how far your memory can take you!"]} playGame={() => dispatch({ type: "playGame" })} />}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && <Completed highestConsecutiveCorrect={state.highestConsecutiveCorrect} playAgain={() => {playAgain()}} goHome={() => {returnHome()}} totalAttempts={state.totalAttempts} totalCorrect={state.totalCorrect} totalIncorrect={state.totalIncorrect} totalTime={state.totalTime} />}
    </>
  );
}