import React, { useState } from "react";
import Progress from "../../components/ui/progress";
import quizInfo from "../../data/quizInfo.json";
import Question from "./Question";

export default function QuizCard() {
  const [questionNo, setQuestionNo] = useState(1);
  return (
    <div className="container bg-card text-card-foreground w-210 p-5 rounded-[20px] font-black flex flex-col gap-y-7 border border-white/10 ">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl tracking-wide font-black m-0 leading-tight">
          {quizInfo.testName}
        </h1>
        <p className="text-secondary font-medium">{quizInfo.description}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <Progress value={questionNo} max={quizInfo.totalQuestions} />
        <div className="flex justify-end font-normal">
          <span>
            <span className="text-primary">X</span> /
            <span className="text-primary">{quizInfo.totalPoints}</span> points
            earned
          </span>
        </div>
      </div>
      <Question />
    </div>
  );
}
