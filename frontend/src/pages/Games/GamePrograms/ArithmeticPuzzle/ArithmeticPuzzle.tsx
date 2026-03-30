import { useGameReducer } from "@/hooks/useGameReducer";
import Active from "./states/Active";
import { useEffect, useState } from "react";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import GameIntroPage from "@/components/GameIntroPage";
import type { GameHistoryEntry } from "@/types/gameHistory";
import { useApiFetch } from "@/hooks/useApiFetch";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import type { SessionsResponse } from "@/types/session.fetched";
import Completed from "@/components/CompletedGameSession";

export default function ArithmeticPuzzle() {
  const [state, dispatch] = useGameReducer();
  const [history, setHistory] = useState<GameHistoryEntry>(
    [] as GameHistoryEntry,
  );
  const apiFetch = useApiFetch();

  const playAgain = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.ARITHMETIC_PATTERN_RECOGNITION,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.REASONING,
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
        gameName: GameName.ARITHMETIC_PATTERN_RECOGNITION,
        correct: state.totalCorrect,
        incorrect: state.totalIncorrect,
        totalTime: state.totalTime,
        domain: Domain.REASONING,
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
      const response = await apiFetch(
        "/sessions/arithmetic-pattern-recognition/",
        {
          method: "GET",
        },
      );
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
          description="Challenge your pattern recognition skills by identifying the missing piece in a sequence. Can you spot the rule and complete the pattern?"
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
              title: "Study the Sequence",
              desc: "A sequence of numbers will appear with one missing value.",
            },
            {
              step: 3,
              title: "Find the Rule",
              desc: "Identify the pattern or rule that the numbers follow.",
            },
            {
              step: 4,
              title: "Complete the Sequence",
              desc: "Enter the missing number to correctly complete the pattern.",
            },
            {
              step: 5,
              title: "Keep Improving",
              desc: "As you answer correctly, sequences become longer and more challenging.",
            },
          ]}
          onStartGame={() => dispatch({ type: "startGame" })}
          title="Arithmetic Pattern Puzzle"
        />
      )}
      {state.gameState === "intro" && (
        <GameIntroPage
          instructions={[
            "A sequence of numbers will be displayed with one missing value marked by a question mark.",
            "Identify the pattern and enter the correct number to complete the sequence. Each mistake costs a life, and you have 6 attempts.",
            "Every 4 correct answers in a row increases the length of the sequence, requiring you to analyze more values as the game becomes harder.",
          ]}
          playGame={() => {
            dispatch({ type: "playGame" });
          }}
        />
      )}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && (
        <Completed
          goHome={returnHome}
          highestConsecutiveCorrect={state.highestConsecutiveCorrect}
          playAgain={playAgain}
          totalAttempts={state.totalAttempts}
          totalCorrect={state.totalCorrect}
          totalIncorrect={state.totalIncorrect}
          totalTime={state.totalTime}
        />
      )}
    </>
  );
}
