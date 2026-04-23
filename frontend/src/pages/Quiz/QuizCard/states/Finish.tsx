import {Button} from "@/components/Button";
import ScoreMeter from "@/components/ScoreMeter";
import { type QuizState } from "@/hooks/useQuizReducer";
import { useNavigate } from "react-router";
import { getScoreInterpretation } from "../../../../utils/getScoreInterpretation";
// import quizInfo from '@/assets/data/quizInfo.json';

type CategoryScore = {
  orientation: number;
  language: number;
  registration: number;
  calculation: number;
  recall: number;
};

interface FinishProp {
  state: QuizState;
  resetQuiz: () => void;
  score: number;
  categoryScore: CategoryScore;
}

const categorySize = {
    "orientation": 10,
    "language": 9,
    "registration": 3,
    "calculation": 5,
    "recall": 3
  }

export default function Finish({
  state,
  resetQuiz,
  score,
  categoryScore,
}: FinishProp) {
  const navigate = useNavigate();
  const [interpretation, context] = getScoreInterpretation(score);
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="w-full">
        <p className="underline decoration-primary text-xl md:text-3xl">
          Assessment Complete
        </p>
        <p className="font-medium text-md md:text-xl text-primary">
          Thank you for completing the cognitive screening.
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-3">
        <p className=" underline decoration-primary text-md md:text-xl ">Results</p>
        <p className="text-destructive font-semibold text-xs md:text-lg">
          This screening provides a general snapshot of cognitive performance at
          one point in time. Results should be interpreted cautiously and in
          context.
        </p>
        <div className="space-y-1 flex flex-col w-fit">
          <ScoreMeter score={state.totalPoints} />
          <p className="font-medium ">
            <span className="text-primary">{score}</span> / 30 points
          </p>
        </div>
        <div>
          <ul className="space-y-3 tracking-wide">
            {(Object.keys(categoryScore) as (keyof CategoryScore)[]).map(
              (category) => (
                <li className="font-semibold text-sm md:text-lg flex gap-x-3 items-center">
                  {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                  <span className="font-normal space-x-2">
                    {" "}
                    <ScoreMeter score={categoryScore[category]} max={categorySize[category]} className="size-2.5 md:size-3.5 rounded-[50%] " />{" "}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
        <ul className="font-medium list-decimal pl-4 text-sm md:text-lg text-muted-foreground space-y-2 ">
          <li>{interpretation}</li>
          <li>{context}</li>
        </ul>
        {/* Use progress bar for each category */}
        <div className="mt-2 flex justify-between ">
          <Button onClick={resetQuiz}>Reset</Button>
          <Button onClick={() => navigate("/")}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
