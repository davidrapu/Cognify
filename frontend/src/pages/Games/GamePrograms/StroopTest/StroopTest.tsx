import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";

const state: "intro" | "active" | "end" = "active";
export default function StroopTest() {
  return (
    <>
        {state === "intro" && <EmptyPage />}
        {state === "active" && <Active />}
    </>
  )
}
