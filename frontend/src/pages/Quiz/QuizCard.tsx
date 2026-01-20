import React, {useState } from "react";
import Progress from "../../components/ui/progress";
import quizInfo from "../../data/quizInfo.json";
import { Question } from "./Question/Question";
import type { QuizState, QuizAction } from "../../hooks/useQuizReducer";
import Button from "@/components/Button";

interface QuizCardProps {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
};

export default function QuizCard({ state, dispatch }: QuizCardProps) {

  const questionObj = quizInfo.questions.find(
    (question) => question.id === state.currentQuestion
  );
  const [userInput, setUserInput] = useState("");
  const [isAknowledged, setIsAknowledged] = useState(false);

  const handleClick = () => {
    console.log(userInput)
    dispatch({
      type: "increaseTotalPoints",
      payload: questionObj?.points || 0,
    });
    dispatch({ type: "next" });
    setUserInput("");
  };

  const handleSubmit = () => {
    dispatch({
      type: "increaseTotalPoints",
      payload: questionObj?.points || 0,
    });
    dispatch({type: 'end'})
  }

  if (!questionObj) return null;

  return (
    <div className="container bg-card text-card-foreground w-210 p-5 rounded-[20px] font-black flex flex-col gap-y-7 border border-white/10 ">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl tracking-wide font-black m-0 leading-tight">
          {quizInfo.testName}
        </h1>
        <p className="text-secondary font-medium">{quizInfo.description}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <Progress value={state.currentQuestion} max={quizInfo.totalQuestions} />
        <div className="flex justify-between font-normal">
          <span>
            Question{" "}
            <span className="text-primary">{state.currentQuestion}</span> of{" "}
            <span className="">{quizInfo.totalQuestions}</span>
          </span>
          <span>
            <span className="text-primary"> {state.totalPoints} </span> /{" "}
            <span className="">{quizInfo.totalPoints}</span> points earned
          </span>
        </div>
      </div>
      <Question
        questionObj={questionObj}
        userInput={userInput}
        setUserInput={setUserInput}
        isAknowledged={isAknowledged}
        setIsAknowledged={setIsAknowledged}
      />
      {(questionObj?.category === "registration" && !isAknowledged) ||
        (questionObj?.id < 16 ? (
          <Button
            disabled={userInput.trim() === ""}
            className={
              "self-end"
            }
            onClick={handleClick}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={userInput.trim() === ""}
            className={
              "self-end"
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ))}
    </div>
  );
}
