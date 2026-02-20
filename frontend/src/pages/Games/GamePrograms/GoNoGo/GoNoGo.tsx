import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";

const state: "intro" | "active" | "end" = "active";

export default function GoNoGo() {
  return (
    <>
    {state === "intro" && <EmptyPage />}
    {state === "active" && <Active />}
    {state === "end" && <EmptyPage />}
    </>
  )
}
