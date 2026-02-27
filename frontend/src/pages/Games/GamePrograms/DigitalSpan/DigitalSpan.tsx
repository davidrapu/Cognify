import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";
import { useSpanGameReducer } from "@/hooks/useSpanGameReducer";
import { useEffect } from "react";

export default function DigitalSpan() {
  const [state, dispatch] = useSpanGameReducer();

  useEffect(() => {
    if (state.totalAllowedTries <= 0) {
      dispatch({ type: "endGame" });
    }
  }, [state.totalAllowedTries, dispatch]);
  return (
    <>
      {state.gameState === "start" && <EmptyPage />}
      {state.gameState === "active" && (
        <Active state={state} dispatch={dispatch} />
      )}
    </>
  );
}
