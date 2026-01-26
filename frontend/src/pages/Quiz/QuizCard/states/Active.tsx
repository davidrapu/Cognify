import React, {useState} from 'react'
import quizInfo from "@/data/quizInfo.json";
import Progress from '@/components/ui/progress';
import { Question } from '../../Question/Question';
import type { QuizState} from "../../../../hooks/useQuizReducer";
import Button from '@/components/Button';

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
};

interface ActiveProps{
    state: QuizState
    handleEnter: (e: React.KeyboardEvent<HTMLDivElement>) => void
    handleNext: () => void
    endQuiz: () => void
    questionObj: QuestionData
    userInput: string
    setUserInput: React.Dispatch<React.SetStateAction<string>>
}

export default function Active({state, handleEnter, questionObj, userInput, setUserInput, handleNext, endQuiz} : ActiveProps) {
      const [isAknowledged, setIsAknowledged] = useState<boolean>(false);
  return (
    <div
      className="container flex flex-col gap-y-7"
      onKeyDown={handleEnter}
      tabIndex={0}
    >
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
