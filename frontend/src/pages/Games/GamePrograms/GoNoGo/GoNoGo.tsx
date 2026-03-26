import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";
import { useGameReducer } from "@/hooks/useGameReducer";
import { useEffect } from "react";
import GameIntroPage from "@/components/GameIntroPage";

export default function GoNoGo() {
  const [state, dispatch] = useGameReducer()


  useEffect(() => {
    dispatch({type: "startGame"})
  }, [])
  return (
    <>
    {state.gameState === "home" && <EmptyPage />}
    {state.gameState === "intro" && <GameIntroPage playGame={() => {dispatch({type: "playGame"})}} />}
    {state.gameState === "active" && <Active state={state} dispatch={dispatch} />}
    {state.gameState === "completed" && <EmptyPage />}
    </>
  )
}
