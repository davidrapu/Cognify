import type { QuizAction } from "@/hooks/useQuizReducer";
import type React from "react";
import quizInfo from "@/data/quizInfo.json";
import {Button} from "@/components/Button";

type IntroProp = {
  dispatch: React.Dispatch<QuizAction>;
};
export default function Intro({ dispatch }: IntroProp) {
  return (
    <div className="container max-w-3xl space-y-5 ">
      <div className="space-y-2">
        <h1 className="text-5xl font-black">{quizInfo.testName}</h1>
        <p className=" font-medium text-xl text-secondary-text">{quizInfo.description}</p>
      </div>

      <div className="space-y-1 text-lg font-normal text-destructive">
        <p>
          This short screening explores key cognitive areas such as memory,
          attention, language, and reaction time.
        </p>

        <p>
          It is not a medical diagnosis, but a general self-assessment designed
          to provide insight into cognitive performance.
        </p>
      </div>
      <ul className="space-y-1 font-medium w-full list-disc list-inside">
        <li>Read each question and instruction carefully</li>
        <li>Answer each question to the best of your ability</li>
        <li>Some tasks are timed — respond naturally</li>
        <li>Estimated time: 5–10 minutes</li>
      </ul>

      <Button
        className="text-xl w-full tracking-wider"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Test
      </Button>
    </div>
  );
}
