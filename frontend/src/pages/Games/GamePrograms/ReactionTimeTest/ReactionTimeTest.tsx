import Active from './states/Active'
import EmptyPage from '@/components/EmptyPage'

const state: 'intro' | 'active' | 'end' = 'active'
export default function ReactionTimeTest() {
  return (
    <>
    {state === 'intro' && <EmptyPage />}
    {state === 'active' && <Active />}
    </>
  )
}
