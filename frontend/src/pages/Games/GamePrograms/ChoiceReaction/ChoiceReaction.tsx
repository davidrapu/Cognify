import EmptyPage from "@/components/EmptyPage";
import Active from "./states/Active";

const states: 'intro' | 'active' | 'results' = 'active';
export default function ChoiceReaction() {
  return (
    <>
    {states === 'intro' && <EmptyPage />}
    {states === 'active' && <Active />}
    {states === 'results' && <EmptyPage />}
    </>
  )
}
