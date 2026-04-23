import Nav from "../../components/Nav";
import QuizCard from "./QuizCard/QuizCard";
import { useQuizReducer } from "../../hooks/useQuizReducer";
import { useEffect, useState } from "react";
import { useApiFetch } from "@/hooks/useApiFetch";
import PageLoader from "@/components/PageLoader";
import { getQuizLocation } from "@/utils/getQuizLocation";

type Question = {
  category: string;
  id: number;
  inputType: string;
  points: number;
  question: string;
  type: string;
  answer?: string[];
  comment: string;
};



export default function Quiz() {
  const [state, dispatch] = useQuizReducer();
  const apiFetch = useApiFetch();
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [wordSet, setWordSet] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const location = await getQuizLocation();
        const res = await apiFetch(
          `/quiz?city=${location.city}&country=${location.country}`,
          { method: "GET" },
        );;

        if (!res.ok) {
          throw new Error("Failed to fetch quiz questions from server");
        }

        const data = await res.json();
        setQuizData(data.questions);
        setWordSet(data.wordSet);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, []); // eslint-disable-line
  return (
    <div className="min-h-screen flex flex-col gap-y-4">
      {isLoading && <PageLoader />}
      {!isLoading && (
        <>
          <header>
            <Nav />
          </header>
          <main className="flex-1 flex justify-center items-center">
            <QuizCard
              state={state}
              dispatch={dispatch}
              quizData={quizData}
              wordSet={wordSet}
            />
          </main>
        </>
      )}
    </div>
  );
}
