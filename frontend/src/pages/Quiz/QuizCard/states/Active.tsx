import React, { useState } from "react";
import Progress from "@/components/CustomProgress";
import { Question } from "../../Question/Question";
import type { QuizState } from "../../../../hooks/useQuizReducer";
import { Button } from "@/components/Button";

type QuestionData = {
  id: number;
  category: string;
  statement?: string;
  question: string;
  comment?: string;
  type?: string;
  inputType: string;
  points?: number;
  options?: string[];
  answer?: string | string[];
};

interface ActiveProps {
  state: QuizState;
  handleEnter: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleNext: () => void;
  endQuiz: () => void;
  questionObj: QuestionData;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function Active({
  state,
  handleEnter,
  questionObj,
  userInput,
  setUserInput,
  handleNext,
  endQuiz,
}: ActiveProps) {
  const [isAknowledged, setIsAknowledged] = useState<boolean>(false);

  return (
    <div
      className="container flex flex-col gap-y-7"
      onKeyDown={handleEnter}
      tabIndex={0}
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl md:text-4xl tracking-wide font-black m-0 leading-tight">
          Cognitive Screening Test
        </h1>
        <p className="text-secondary-text md:text-xl font-medium">
          MMSE-inspired, non-clinical assessment
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <Progress value={state.currentQuestion} max={16} />
        <div className="flex justify-between font-normal md:text-xl">
          <span>
            Question{" "}
            <span className="text-primary font-bold">{state.currentQuestion}</span> of{" "}
            <span className="">16</span>
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
            className={"self-end"}
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={userInput.trim() === ""}
            className={"self-end"}
            onClick={endQuiz}
          >
            Submit
          </Button>
        ))}
    </div>
  );
}
