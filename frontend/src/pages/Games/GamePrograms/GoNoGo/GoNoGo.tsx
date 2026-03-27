import Active from "./states/Active";
import { useGameReducer } from "@/hooks/useGameReducer";
import { useEffect, useState } from "react";
import GameIntroPage from "@/components/GameIntroPage";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import Completed from "@/components/CompletedGameSession";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import type { GameHistoryEntry } from "@/types/gameHistory";
import type { SessionsResponse } from "@/types/session.fetched";
import { useApiFetch } from "@/hooks/useApiFetch";

export default function GoNoGo() {
  const [state, dispatch] = useGameReducer();
  const [history, setHistory] = useState<GameHistoryEntry>([] as GameHistoryEntry);
  const apiFetch = useApiFetch()

  const playAgain = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.GO_NO_GO,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.PROCESSING_SPEED,
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
        gameName: GameName.GO_NO_GO,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.PROCESSING_SPEED,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save session data");
      return;
    }

    // go home
    dispatch({ type: "home" });
  };

  // loading all data upon home page render
  useEffect(() => {
    if (state.gameState !== "home") return;

    // fetch user performance data from the API and dispatch to the reducer
    const fetchData = async () => {
      const response = await apiFetch("/sessions/go-no-go/", {
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
          averageScore={state.averageScore}
          description="Test your reaction and impulse control with the Go/No-Go task. Respond quickly to the correct signals and hold back when needed - can you stay in control?"
          title="Go No Go"
          highScore={state.highScore}
          history={history}
          instructions={[
            {
              step: 1,
              title: "Begin the Game",
              desc: "Click the 'Start Game' button to begin your session.",
            },
            {
              step: 2,
              title: "Watch the Signal",
              desc: "A visual cue will appear indicating whether you should respond or not.",
            },
            {
              step: 3,
              title: "Respond or Hold",
              desc: "Press the spacebar when the 'Go' signal appears, and do nothing when the 'No-Go' signal is shown.",
            },
            {
              step: 4,
              title: "Stay Focused",
              desc: "React only at the right moments and avoid responding when you shouldn’t.",
            },
            {
              step: 5,
              title: "Maintain Control",
              desc: "Test your impulse control by staying accurate throughout the session.",
            },
          ]}
          onStartGame={() => {
            dispatch({ type: "startGame" });
          }}
        />
      )}
      {state.gameState === "intro" && (
        <GameIntroPage
          playGame={() => {
            dispatch({ type: "playGame" });
          }}
          instructions={[
            "A signal will appear on the screen indicating whether you should respond or not.",
            "Press the key when the 'Go' signal appears, and do nothing when the 'No-Go' signal is shown.",
            "Stay focused and avoid reacting at the wrong time - accuracy and control are key.",
          ]}
        />
      )}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && <Completed goHome={returnHome} highestConsecutiveCorrect={state.highestConsecutiveCorrect} playAgain={playAgain} totalAttempts={state.totalAttempts} totalCorrect={state.totalCorrect} totalIncorrect={state.totalIncorrect} totalTime={state.totalTime}  />}
    </>
  );
}
