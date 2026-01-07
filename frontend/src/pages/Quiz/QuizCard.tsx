import React, { useState } from "react";
import Progress from "../../components/ui/progress";
import quizInfo from "../../data/quizInfo.json";

export default function QuizCard() {
  const [questionNo, setQuestionNo] = useState(1);
  return (
    <div
      className="bg-card text-card-foreground min-w-210 min-h-120 p-5 rounded-[20px] font-black flex flex-col gap-y-7 border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
    >
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl tracking-wide font-black m-0 leading-tight">
          {quizInfo.testName}
        </h1>
        <p className="text-secondary">{quizInfo.description}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <Progress value={questionNo} max={quizInfo.totalQuestions} />
        <div className="flex justify-between font-normal">
          <span>
            Question <span className="text-primary">{questionNo}</span> of{" "}
            <span className="text-primary">{quizInfo.totalQuestions}</span>
          </span>
          <span>
            <span className="text-primary">X</span> /{" "}
            <span className="text-primary">{quizInfo.totalPoints}</span> points
            earned
          </span>
        </div>
      </div>
    </div>
  );
}
