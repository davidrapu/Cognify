import React, { useState } from "react";
import quizInfo from "../../../data/quizInfo.json";
import type { QuizState, QuizAction } from "../../../hooks/useQuizReducer";
import { verifyAnswer } from "../../../utils/VerifyAnswer";
import Intro from "./states/Intro";
import Active from "./states/Active";
import Finish from "./states/Finish";

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

interface QuizCardProps {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export default function QuizCard({ state, dispatch }: QuizCardProps) {

  const questionObj = quizInfo.questions.find(
    (question) => question.id === state.currentQuestion,
  );
  const [userInput, setUserInput] = useState<string>("");
  const [categoryScore, setCategoryScore] = useState<CategoryScore>(
    initialCategoryScores,
  );

  const handleNext = () => {
    dispatch({
      type: "increaseTotalPoints",
      payload:
        verifyAnswer(
          questionObj?.type,
          questionObj?.category,
          questionObj?.points,
          userInput,
          setCategoryScore,
        ) || 0,
    });
    dispatch({ type: "next" });
    setUserInput("");
  };

  const endQuiz = () => {
    // Give them their score
    // Give them an option to try again or continue
    // Reset in both occasions. So dont reset at end but after end

    // Increase total points
    dispatch({
      type: "increaseTotalPoints",
      payload:
        verifyAnswer(
          questionObj?.type,
          questionObj?.category,
          questionObj?.points,
          userInput,
          setCategoryScore,
        ) || 0,
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

  if (!questionObj) return null;

  return (
    <div className="container bg-card text-card-foreground w-210 p-10 rounded-4xl font-black border border-border ">
      {state.quizState === "intro" && <Intro dispatch={dispatch} />}

      {state.quizState === "active" && <Active handleEnter={handleEnter} state={state} questionObj={questionObj} userInput={userInput} setUserInput={setUserInput} handleNext={handleNext} endQuiz={endQuiz} />}

      {state.quizState === "finish" && (
        <Finish state={state} resetQuiz={resetQuiz} score={state.totalPoints} categoryScore={categoryScore} />
      )}
    </div>
  );
}
