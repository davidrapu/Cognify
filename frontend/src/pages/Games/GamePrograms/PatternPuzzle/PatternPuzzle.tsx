import EmptyPage from "@/components/EmptyPage";
import GameLayout from "@/components/GameLayout";
import Active from "./states/Active";

const state: 'active' | 'inactive' = 'active';

export default function PatternPuzzle() {
  return (
    <>
    {state === 'active' ? (
        <GameLayout>
            <Active />
        </GameLayout>
    ) : (
        <div>
            <EmptyPage />
            {/* Inactive state content goes here */}
        </div>
     )

    }
    </>
  )
}
