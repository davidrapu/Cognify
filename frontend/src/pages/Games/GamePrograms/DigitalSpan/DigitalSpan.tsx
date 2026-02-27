import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";
import { useSpanGameReducer } from "@/hooks/useSpanGameReducer";
import { useEffect } from "react";
import Intro from "./states/Intro";

export default function DigitalSpan() {
  const [state, dispatch] = useSpanGameReducer();

  useEffect(() => {
    if (state.totalAllowedTries <= 0) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalAllowedTries, dispatch]);
  return (
    <>
      {state.gameState === "intro" && <Intro />}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
      {state.gameState === "completed" && <EmptyPage />}
    </>
  );
}
