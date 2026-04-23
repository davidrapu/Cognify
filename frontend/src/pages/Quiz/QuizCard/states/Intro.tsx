import type { QuizAction } from "@/hooks/useQuizReducer";
import type React from "react";
import {Button} from "@/components/Button";

type IntroProp = {
  dispatch: React.Dispatch<QuizAction>;
};
export default function Intro({ dispatch }: IntroProp) {
  return (
    <div className="container space-y-5 ">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-5xl font-black">Cognitive Screening Test</h1>
        <p className=" font-medium text-sm md:text-2xl text-secondary-text">
          MMSE-inspired, non-clinical assessment
        </p>
      </div>

      <div className="space-y-1 text-sm md:text-xl font-normal text-destructive">
        <p>
          This short screening explores key cognitive areas such as memory,
          attention, language, and reaction time.
        </p>

        <p>
          It is not a medical diagnosis, but a general self-assessment designed
          to provide insight into cognitive performance.
        </p>
      </div>
      <ul className="space-y-1 font-medium w-full text-sm md:text-xl list-disc list-inside">
        <li>Read each question and instruction carefully</li>
        <li>Answer each question to the best of your ability</li>
        <li>Estimated time: 5–10 minutes</li>
      </ul>

      <Button
        className="text-md md:text-2xl w-full tracking-wider"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Test
      </Button>
    </div>
  );
}
