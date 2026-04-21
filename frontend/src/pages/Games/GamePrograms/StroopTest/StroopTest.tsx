import Active from "./states/Active";
import { useGameReducer } from "@/hooks/useGameReducer";
import { useEffect, useState } from "react";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import GameIntroPage from "@/components/GameIntroPage";
import Completed from "@/components/CompletedGameSession";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import type { SessionsResponse } from "@/types/session.fetched";
import { useApiFetch } from "@/hooks/useApiFetch";
import { type GameHistoryEntry } from "@/types/gameHistory";
import PageLoader from "@/components/PageLoader";

export default function StroopTest() {
  const [state, dispatch] = useGameReducer();
  const [history, setHistory] = useState<GameHistoryEntry>(
    [] as GameHistoryEntry,
  );
  const apiFetch = useApiFetch();
  const [loading, setLoading] = useState(false);

  const playAgain = async () => {
    // reset game
    // start new game
    dispatch({ type: "resetGame" });
  };
  const returnHome = async () => {
    // go home
    dispatch({ type: "home" });
  };

  // loading all data upon home page render
  useEffect(() => {
    if (state.gameState !== "home") return;

    // fetch user performance data from the API and dispatch to the reducer
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFetch("/sessions/stroop-test/", {
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
        await apiFetch("/sessions", {
          method: "POST",
          body: JSON.stringify({
            gameName: GameName.STROOP_TEST,
            correct: state.totalCorrect,
            incorrect: state.totalIncorrect,
            totalTime: state.totalTime,
            domain: Domain.ATTENTION,
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
          averageAccuracy={state.averageAccuracy}
          averageScore={state.averageScore}
          highScore={state.highScore}
          onStartGame={() => {
            dispatch({ type: "startGame" });
          }}
          history={history}
          title="Stroop Test"
          description="Test your focus and cognitive control with the Stroop Test! Identify the color of the text while ignoring the word itself - can you stay accurate under pressure?"
          instructions={[
            {
              step: 1,
              title: "Begin the Game",
              desc: "Click the 'Start Game' button to begin your session.",
            },
            {
              step: 2,
              title: "Read the Word",
              desc: "A color word will appear on the screen, displayed in a different color.",
            },
            {
              step: 3,
              title: "Ignore the Text",
              desc: "Focus on the color of the text, not the word itself.",
            },
            {
              step: 4,
              title: "Select the Color",
              desc: "Choose the correct color that the text is displayed in.",
            },
            {
              step: 5,
              title: "Stay Focused",
              desc: "It may feel tricky—stay focused and avoid being misled by the word.",
            },
          ]}
        />
      )}
      {!loading && state.gameState === "intro" && (
        <GameIntroPage
          playGame={() => {
            dispatch({ type: "playGame" });
          }}
          instructions={[
            "A color word will appear on the screen, displayed in a color that may not match the word itself.",
            "Focus on the color of the text and ignore what the word says.",
            "Select the correct color based on the text color. Stay focused and avoid being misled.",
          ]}
        />
      )}
      {!loading && state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {!loading && state.gameState === "completed" && (
        <Completed
          goHome={returnHome}
          playAgain={playAgain}
          highestConsecutiveCorrect={state.highestConsecutiveCorrect}
          totalAttempts={state.totalAttempts}
          totalCorrect={state.totalCorrect}
          totalIncorrect={state.totalIncorrect}
          totalTime={state.totalTime}
        />
      )}
      {loading && <PageLoader />}
    </>
  );
}
