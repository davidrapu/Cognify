import Nav from "../../components/Nav";
import QuizCard from "./QuizCard/QuizCard";
import { useQuizReducer } from "../../hooks/useQuizReducer";

export default function Quiz() {
  const [state, dispatch] = useQuizReducer();
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className=" my-15 flex justify-center min-h-fit ">
        <QuizCard state={state} dispatch={dispatch} />
      </main>
    </>
  );
}
