// import { useState } from "react";
import Active from "./states/Active";
import EmptyPage from "@/components/EmptyPage";

const state: "start" | "active" | "end" = "active";
export default function SequenceRecall() {
//   const [state, setState] = useState<"start" | "active" | "end">("active");
  return (
    <>
      {state === "active" && <Active />}
      {state === "start" && <EmptyPage />}
    </>
  );
}
