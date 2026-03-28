import EmptyPage from "@/components/EmptyPage";
import GameLayout from "@/components/GameLayout";
import Active from "./states/Active";
import { useGameReducer } from "@/hooks/useGameReducer";
import { useEffect } from "react";

export default function PatternPuzzle() {
  const [state, dispatch] = useGameReducer();

  useEffect(() => {
    dispatch({type: "playGame"})
  }, []);

  return <>

  {state.gameState === "home" && <EmptyPage />}
  {state.gameState === "intro" && <EmptyPage />}
  {state.gameState === "active" && <Active state={state} dispatch={dispatch} />}
  {state.gameState === "completed" && <EmptyPage />}
  </>;
}
