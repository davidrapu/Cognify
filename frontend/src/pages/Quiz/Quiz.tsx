import Nav from "../../components/Nav";
import QuizCard from "./QuizCard/QuizCard";
import { useQuizReducer } from "../../hooks/useQuizReducer";

export default function Quiz() {
  const [state, dispatch] = useQuizReducer();
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Nav />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <QuizCard state={state} dispatch={dispatch} />
      </main>
    </div>
  );
}
