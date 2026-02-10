
import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";
import { useState } from "react";

export default function DigitalSpan() {
  const [state, setState] = useState<"start" | "active" | "end">("active");
  return (
    <>
      {state === "start" && <EmptyPage />}
      {state === "active" && (
        <Active setState={setState} />
      )}
    </>
  );
}
