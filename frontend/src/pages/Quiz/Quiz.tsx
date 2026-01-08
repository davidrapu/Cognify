import Nav from '../../components/Nav'
import QuizCard from './QuizCard'
import { useQuizReducer } from '../../components/hooks/useQuizReducer'


export default function Quiz() {
  const [state, dispatch] = useQuizReducer()
  return (
    <>
    <header>
      <Nav />
    </header>
    <main className=' mt-30 flex justify-center min-h-fit '>
        <QuizCard state={state} dispatch={dispatch} />
    </main>
    </>
  )
}
