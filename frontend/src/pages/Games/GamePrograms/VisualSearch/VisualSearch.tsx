import Active from "./states/Active";
import { useLeveledGameReducer } from "@/hooks/useLeveledGameReducer";
import { GameHomePage } from "@/components/GameHomePage/GameHomePage";
import GameIntroPage from "@/components/GameIntroPage";
import Completed from "@/components/CompletedGameSession";
import { useEffect, useState } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import { Domain } from "@/enums/domain";
import { GameName } from "@/enums/gameName";
import type { SessionsResponse } from "@/types/session.fetched";
import { type GameHistoryEntry } from "@/types/gameHistory";
import PageLoader from "@/components/PageLoader";
import { useIsMobile } from "@/hooks/use-mobile";
export default function VisualSearch() {
  const [state, dispatch] = useLeveledGameReducer();
  const apiFetch = useApiFetch();
  const [history, setHistory] = useState<GameHistoryEntry>([] as GameHistoryEntry);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  const setGameLevel = (level: "easy" | "medium" | "hard") => {
    dispatch({ type: "setGameLevel", payload: level });
  };

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
      try{
        setLoading(true);
        const response = await apiFetch("/sessions/visual-search/", {
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
      try{
        setLoading(true);
        await apiFetch("/sessions", {
        method: "POST",
        body: JSON.stringify({
          gameName: GameName.VISUAL_SEARCH,
          correct: state.totalCorrect,
          incorrect: state.totalIncorrect,
          totalTime: state.totalTime,
          domain: Domain.ATTENTION,
        }),
      });
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {        setLoading(false);
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
          onStartGame={() => dispatch({ type: "startGame" })}
          title="Visual Search"
          description="Test your attention and speed with Visual Search! Find the target item as quickly as possible among similar distractions. The faster you spot it, the higher your score!"
          history={history}
          instructions={[
            {
              step: 1,
              title: "Begin the Game",
              desc: "Click the 'Start Game' button to begin your session.",
            },
            {
              step: 2,
              title: "Choose Difficulty",
              desc: "Select your preferred difficulty level before starting the game.",
            },
            {
              step: 3,
              title: "Scan the Grid",
              desc: "A grid of items will appear with one item slightly different from the rest.",
            },
            {
              step: 4,
              title: "Find the Target",
              desc: "Carefully search and click the item that stands out from the others.",
            },
            {
              step: 5,
              title: "Stay Accurate",
              desc: "Accuracy is key - try to identify the correct item without mistakes.",
            },
          ]}
        />
      )}
      {!loading && state.gameState === "intro" && (
        <GameIntroPage
          playGame={() => dispatch({ type: "playGame" })}
          isMobile={isMobile}
          gameLevel={state.gameLevel}
          includeLevelSelector
          setGameLevel={setGameLevel}
          instructions={[
            "Choose your preferred difficulty level before starting the game.",
            "A grid of colors will appear with one color slightly different from the rest. Carefully scan and identify the one that stands out.",
            "Click the correct item to score points. Accuracy is key, so avoid mistakes.",
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
