import Active from "./states/Active";
import { useGameReducer } from "@/hooks/useGameReducer";
import { useEffect, useState } from "react";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import GameIntroPage from "@/components/GameIntroPage";
import Completed from "@/components/CompletedGameSession";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import { useApiFetch } from "@/hooks/useApiFetch";
import type { GameHistoryEntry } from "@/types/gameHistory";
import type { SessionsResponse } from "@/types/session.fetched";

export default function ChoiceReaction() {
  const [state, dispatch] = useGameReducer()
    const [history, setHistory] = useState<GameHistoryEntry>([] as GameHistoryEntry);
  const apiFetch = useApiFetch()

  const playAgain = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.CHOICE_REACTION_TIME,
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
        gameName: GameName.CHOICE_REACTION_TIME,
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
      const response = await apiFetch("/sessions/choice-reaction-time/", {
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
          description="Test your reaction speed and decision-making with Choice Reaction Time. Respond to different signals with the correct input - how quickly and accurately can you react?"
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
              title: "Watch for the Signal",
              desc: "A signal will appear on the screen, indicating which response to make.",
            },
            {
              step: 3,
              title: "React Correctly",
              desc: "Press the corresponding key based on the signal shown.",
            },
            {
              step: 4,
              title: "Stay Accurate",
              desc: "Make the correct choice each time to avoid mistakes.",
            },
            {
              step: 5,
              title: "Keep Focus",
              desc: "Respond quickly and accurately as different signals appear.",
            },
          ]}
          onStartGame={() => dispatch({ type: "startGame" })}
          title="Choice Reaction Time Test"
        />
      )}
      {state.gameState === "intro" && (
        <GameIntroPage
          playGame={() => {
            dispatch({ type: "playGame" });
          }}
          instructions={[
            "A signal will appear on either the left or right side of the screen.",
            "Press 'Q' if the signal appears on the left, and 'R' if it appears on the right.",
            "Respond as quickly and accurately as possible while avoiding mistakes."
          ]}
        />
      )}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && <Completed goHome={returnHome} playAgain={playAgain} highestConsecutiveCorrect={state.highestConsecutiveCorrect} totalAttempts={state.totalAttempts} totalCorrect={state.totalCorrect} totalIncorrect={state.totalIncorrect} totalTime={state.totalTime}  />}
    </>
  );
}
