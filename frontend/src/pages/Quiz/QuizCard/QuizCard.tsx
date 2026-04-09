import React, { useEffect, useState } from "react";
import type { QuizState, QuizAction } from "@/hooks/useQuizReducer";
import { verifyAnswer } from "@/utils/VerifyAnswer";
import Intro from "./states/Intro";
import Active from "./states/Active";
import Finish from "./states/Finish";
import { useApiFetch } from "@/hooks/useApiFetch";
import PageLoader from "@/components/PageLoader";

const initialCategoryScores = {
  orientation: 0,
  language: 0,
  registration: 0,
  calculation: 0,
  recall: 0,
};

type CategoryScore = {
  orientation: number;
  language: number;
  registration: number;
  calculation: number;
  recall: number;
};

type Question = {
  category: string;
  id: number;
  inputType: string;
  points: number;
  question: string;
  type: string;
  answer?: string[]
  comment: string;
}
interface QuizCardProps {
  quizData: Question[];
  wordSet?: string[];
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export default function QuizCard({ state, dispatch, quizData, wordSet }: QuizCardProps) {
  const questionObj : Question | undefined = quizData.find(
    (question) => question.id === state.currentQuestion,
  );
  const [userInput, setUserInput] = useState<string>("");
  const [categoryScore, setCategoryScore] = useState<CategoryScore>(
    initialCategoryScores,
  );
  const apiFetch = useApiFetch()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = () => {
    
    const score =
      verifyAnswer(
        questionObj?.type,
        questionObj?.category,
        questionObj?.points,
        userInput,
        setCategoryScore,
        wordSet,
        questionObj?.answer,
      ) || 0;
    dispatch({
      type: "increaseTotalPoints",
      payload: score,
    });
    console.log("Score for this question:", score, "Total Score:", state.totalPoints + score, "Category Scores:", categoryScore);
    dispatch({ type: "next" });
    setUserInput("");
  };

  const endQuiz = () => {
    // Give them their score
    // Give them an option to try again or continue
    // Reset in both occasions. So dont reset at end but after end

        const score =
          verifyAnswer(
            questionObj?.type,
            questionObj?.category,
            questionObj?.points,
            userInput,
            setCategoryScore,
            wordSet,
            questionObj?.answer,
          ) || 0;
    // Increase total points
    dispatch({
      type: "increaseTotalPoints",
      payload: score
    });

    // End the quiz
    dispatch({ type: "end" });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    if (userInput.trim() === "") return;

    if (questionObj && questionObj?.id < 16) handleNext();
    else endQuiz();
  };

  const resetQuiz = () => {
    setUserInput("");
    dispatch({ type: "reset" });
  };

  useEffect(() => {
    if (state.quizState !== "finish") return

    // send score to backend
    // for now we just only send the score and not the categorical scores, but in the future we can send the categorical scores as well
    // we can also send the users answers and the correct answers to the backend for more detailed analysis and feedback

    const sendScore = async () => {
      setIsLoading(true)
      try {
        const resp = await apiFetch("/quiz", {
          method: "POST",
          body: JSON.stringify({
            score: state.totalPoints,
          })
        });
        if (!resp.ok) {
          throw new Error("Failed to submit score");
        }
      } catch (error) {
        console.error("Error submitting score:", error);
      } finally {
        setIsLoading(false);
      }
    }

    sendScore();

  }, [state.quizState]) // eslint-disable-line

  if (!questionObj) return null;

  return (
    <div className="container bg-card text-card-foreground w-210 p-10 rounded-4xl font-black border border-border ">
      {!isLoading && state.quizState === "intro" && <Intro dispatch={dispatch} />}

      {!isLoading && state.quizState === "active" && (
        <Active
          handleEnter={handleEnter}
          state={state}
          questionObj={questionObj}
          userInput={userInput}
          setUserInput={setUserInput}
          handleNext={handleNext}
          endQuiz={endQuiz}
        />
      )}

      {!isLoading && state.quizState === "finish" && (
        <Finish
          state={state}
          resetQuiz={resetQuiz}
          score={state.totalPoints}
          categoryScore={categoryScore}
        />
      )}
      {isLoading && <PageLoader /> }
    </div>
  );
}
