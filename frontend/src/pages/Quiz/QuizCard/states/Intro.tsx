import type { QuizAction } from "@/hooks/useQuizReducer";
import type React from "react";
import quizInfo from "@/data/quizInfo.json";
import {Button} from "@/components/Button";

type IntroProp = {
  dispatch: React.Dispatch<QuizAction>;
};
export default function Intro({ dispatch }: IntroProp) {
  return (
    <div className="container max-w-3xl space-y-5 text-center">
      <div className="space-y-2">
        <h1 className="text-5xl font-black">{quizInfo.testName}</h1>
        <p className="text-secondary font-medium text-xl">
          {quizInfo.description}
        </p>
      </div>

      <div className="space-y-4 text-lg text-muted-foreground">
        <p>
          This short screening explores key cognitive areas such as memory,
          attention, language, and reaction time.
        </p>

        <p>
          It is <span className="font-semibold">not a medical diagnosis</span>,
          but a general self-assessment designed to provide insight into
          cognitive performance.
        </p>
      </div>
      <ul className="space-y-2 text-base text-secondary">
        <li>Read each question and instruction carefully</li>
        <li>Answer each question to the best of your ability</li>
        <li>Some tasks are timed — respond naturally</li>
        <li>Estimated time: 5–10 minutes</li>
      </ul>

      <Button
        className="text-xl w-60 tracking-wider"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Test
      </Button>
    </div>
  );
}
