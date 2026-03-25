import { useCardMatchReducer } from "@/hooks/useCardMatchReducer";
import Active from "./states/Active/Active";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import { useEffect, useState } from "react";
import Completed from "@/components/CompletedGameSession";
import { useApiFetch } from "@/hooks/useApiFetch";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import type { SessionsResponse } from "@/types/session.fetched";
import GameIntroPage from "@/components/GameIntroPage";

const difficultyConfig = {
  easy: { pairs: 8, cols: 4 },
  medium: { pairs: 12, cols: 6 },
  hard: { pairs: 16, cols: 8 },
} as const;

export default function CardMatchGame() {
  const [state, dispatch] = useCardMatchReducer();
  const s = state.gameLevel as keyof typeof difficultyConfig;
  const { pairs, cols } = difficultyConfig[s];
  const apiFetch = useApiFetch();
  const [history, setHistory] = useState<
    {
      id: number;
      date: Date;
      score: number;
      accuracy: number;
      reaction: number;
    }[]
  >();

  const playAgain = async () => {
    // send data to db
    const response = await apiFetch("/sessions", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.CARD_MATCH,
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
    dispatch({ type: "startGame" });
  };

  const home = async () => {
    // send data to db
    const response = await apiFetch("/sessions/", {
      method: "POST",
      body: JSON.stringify({
        gameName: GameName.CARD_MATCH,
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

  // Load data into the game state when the component mounts
  useEffect(() => {
    if (state.gameState !== "home") return;
    // fetch user performance data from the API and dispatch to the reducer
    const fetchData = async () => {
      const response = await apiFetch("/sessions/card-match/", {
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

  useEffect(() => {
    if (state.matchedCards === pairs) {
      // When the user is done
      setTimeout(() => {
        // wait a few seconds before showing the completed page so they can see the last card flipped
        dispatch({ type: "setGameState", payload: "completed" });
      }, 1000);
    }
  }, [state.matchedCards, pairs, dispatch]);

  const setGameLevel = (level: "easy" | "medium" | "hard") => {
    dispatch({ type: "setGameLevel", payload: level });
  };

  return (
    <>
      {/* Intro, Active, and Complete should all use the same box */}
      <main>
        {state.gameState === "home" && (
          <GameHomePage
            title="Card Match"
            averageAccuracy={state.averageAccuracy}
            averageScore={state.averageScore}
            highScore={state.highScore}
            description="Test your memory and concentration skills with Card Match! Flip over pairs of cards to find matches, but be careful - the more attempts you make, the lower your score. Can you beat your high score and become a Card Match master?"
            instructions={[
              {
                step: 1,
                title: "Choose Difficulty",
                desc: "Select a difficulty level to start the game. The higher the difficulty, the more pairs of cards you'll need to match.",
              },
              {
                step: 2,
                title: "Memorize the Cards",
                desc: "Take a moment to memorize the positions of the cards before they are flipped back over.",
              },
              {
                step: 3,
                title: "Find Matches",
                desc: "Click on two cards to flip them over. If they match, they will stay face up. If not, they will flip back down. Try to find all the matches with as few attempts as possible!",
              },
            ]}
            onStartGame={() =>
              dispatch({ type: "setGameState", payload: "intro" })
            }
            history={history}
          />
        )}
        {state.gameState === "intro" && (
          <GameIntroPage
            includeLevelSelector
            setGameLevel={setGameLevel}
            gameLevel={state.gameLevel}
            playGame={() => dispatch({ type: "playGame" })}
            instructions={[
              "All cards will be revealed for a few seconds. Watch carefully and memorize their positions.",
              "Once the cards are flipped back, click on them in the correct order. The more attempts you take, the lower your score.",
              "The game ends when you complete the sequence or exceed the maximum number of attempts.",
            ]}
          />
        )}
        {state.gameState === "active" && (
          <Active state={state} pairs={pairs} cols={cols} dispatch={dispatch} />
        )}
        {state.gameState === "completed" && (
          <Completed
            goHome={home}
            highestConsecutiveCorrect={state.highestConsecutiveCorrect}
            playAgain={playAgain}
            totalAttempts={state.totalAttempts}
            totalCorrect={state.totalCorrect}
            totalIncorrect={state.totalIncorrect}
            totalTime={state.totalTime}
          />
        )}
      </main>
    </>
  );
}
