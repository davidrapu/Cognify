import Active from "./states/Active";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import Completed from "@/components/CompletedGameSession";
import { useApiFetch } from "@/hooks/useApiFetch";
import { useEffect, useState } from "react";
import type { SessionsResponse } from "@/types/session.fetched";
import { GameName } from "@/enums/gameName";
import { Domain } from "@/enums/domain";
import GameIntroPage from "@/components/GameIntroPage";
import { useGameReducer } from "@/hooks/useGameReducer";
import { type GameHistoryEntry } from "@/types/gameHistory";
import PageLoader from "@/components/PageLoader";

export default function DigitalSpan() {
  const [state, dispatch] = useGameReducer();
  const apiFetch = useApiFetch();
  const [history, setHistory] = useState<GameHistoryEntry>(
    [] as GameHistoryEntry,
  );
  const [loading, setLoading] = useState(false);

  const playAgain = async () => {
    // reset game
    // start new game
    dispatch({ type: "resetGame" });
  };
  const returnHome = async () => {
    // reset game
    // start new game
    dispatch({ type: "home" });
  };

  // Load data into the game state when the component mounts
  useEffect(() => {
    if (state.gameState !== "home") return;

    // fetch user performance data from the API and dispatch to the reducer
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFetch("/sessions/digital-span/", {
          method: "GET",
        });
        // Process the data and dispatch to the reducer
        const result: SessionsResponse = await response.json();
        // console.log("Fetched data:", result);
        dispatch({
          type: "setAverages",
          payload: {
            averageScore: result.data.stats.averageScore,
            averageAccuracy: result.data.stats.accuracy,
          },
        });
        dispatch({
          type: "setHighScore",
          payload: result.data.stats.highscore,
        });
        const historyData = result.data.sessions.map((session) => ({
          id: session.id,
          date: new Date(session.createdAt),
          score: session.correct,
          accuracy:
            session.correct + session.incorrect > 0
              ? Math.round(
                  (session.correct / (session.correct + session.incorrect)) *
                    100,
                )
              : 0,
          reaction: session.reactionTimeAvg,
        }));
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state.gameState]); // eslint-disable-line

  // send data to db when game state changes to completed
  useEffect(() => {
    if (state.gameState !== "completed") return;
    const sendData = async () => {
      try {
        setLoading(true);
        await apiFetch("/sessions/", {
          method: "POST",
          body: JSON.stringify({
            gameName: GameName.DIGITAL_SPAN,
            correct: state.totalCorrect,
            incorrect: state.totalIncorrect,
            totalTime: state.totalTime,
            domain: Domain.MEMORY,
          }),
        });
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        setLoading(false);
      }
    };
    sendData();
  }, [state.gameState]); // eslint-disable-line

  return (
    <>
      {!loading && state.gameState === "home" && (
        <GameHomePage
          title="Digital Span"
          description="Test your working memory by recalling sequences of numbers. The longer the sequence, the more points you earn!"
          onStartGame={() => {
            dispatch({ type: "startGame" });
          }}
          highScore={state.highScore}
          averageScore={state.averageScore}
          averageAccuracy={state.averageAccuracy}
          instructions={[
            {
              step: 1,
              title: "Begin the Game",
              desc: "Click the 'Start Game' button to begin your first session.",
            },
            {
              step: 2,
              title: "View Sequence",
              desc: "A sequence of numbers will appear on the screen. Try to memorize them!",
            },
            {
              step: 3,
              title: "Recall",
              desc: "After the numbers disappear, input the sequence in the correct order.",
            },
            {
              step: 4,
              title: "Feedback",
              desc: "After each attempt, you'll receive feedback on your score and accuracy.",
            },
            {
              step: 5,
              title: "Improve",
              desc: "Use the performance chart and game history to track your improvement over time.",
            },
          ]}
          history={history}
        />
      )}
      {!loading && state.gameState === "intro" && (
        <GameIntroPage
          instructions={[
            "A sequence of numbers will appear on the screen. Watch carefully and memorize the exact order.",
            "Once the sequence disappears, enter the numbers in the correct order. Longer sequences increase the challenge and your score.",
            "You have 6 attempts to achieve your highest score. Stay focused and see how far you can go!",
          ]}
          playGame={() => dispatch({ type: "playGame" })}
        />
      )}
      {!loading && state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {!loading && state.gameState === "completed" && (
        <Completed
          goHome={() => returnHome()}
          playAgain={() => playAgain()}
          totalTime={state.totalTime}
          totalAttempts={state.totalAttempts}
          totalCorrect={state.totalCorrect}
          totalIncorrect={state.totalIncorrect}
          highestConsecutiveCorrect={state.highestConsecutiveCorrect}
        />
      )}
      {loading && <PageLoader />}
    </>
  );
}
