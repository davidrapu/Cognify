import React, { useState } from "react";
import Progress from "../../components/ui/progress";
import quizInfo from "../../data/quizInfo.json";
import { Question } from "./Question/Question";
import type { QuizState, QuizAction } from "../../hooks/useQuizReducer";
import Button from "@/components/Button";
import ScoreMeter from "@/components/ScoreMeter";
import { useNavigate } from "react-router-dom";
import { verifyAnswer } from "./VerifyAnswer";

interface QuizCardProps {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

export default function QuizCard({ state, dispatch}: QuizCardProps) {
  const navigate = useNavigate()

  const questionObj = quizInfo.questions.find(
    (question) => question.id === state.currentQuestion,
  );
  const [userInput, setUserInput] = useState<string>('');
  const [isAknowledged, setIsAknowledged] = useState<boolean>(false);

  const handleNext = () => {
    dispatch({
      type: "increaseTotalPoints",
      payload: verifyAnswer(questionObj?.type, questionObj?.points, userInput) || 0,
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
        verifyAnswer(questionObj?.type, questionObj?.points, userInput) || 0,
    });

    // End the quiz
    dispatch({ type: "end" });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault()

    if (userInput.trim() === '') return

    if (questionObj && questionObj?.id < 16) handleNext()
    else endQuiz()
  }

  const resetQuiz = () => {
    setUserInput('')
    dispatch({type: 'reset'})
  }

  if (!questionObj) return null;

  return (
    <div className="container bg-card text-card-foreground w-210 p-10 rounded-[20px] font-black border border-white/10 ">
      {state.quizState === "intro" && (
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
              It is{" "}
              <span className="font-semibold">not a medical diagnosis</span>,
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

          <Button className="text-xl w-60 tracking-wider" onClick={() => dispatch({type:'start'})}>
            Start Test
          </Button>
        </div>
      )}

      {state.quizState === "active" && (
        <div className="container flex flex-col gap-y-7" onKeyDown={handleEnter} tabIndex={0} >
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl tracking-wide font-black m-0 leading-tight">
              {quizInfo.testName}
            </h1>
            <p className="text-secondary font-medium">{quizInfo.description}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Progress
              value={state.currentQuestion}
              max={quizInfo.totalQuestions}
            />
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
      )}

      {state.quizState === "finish" && (
        <div className="flex flex-col items-center gap-y-3">
          <div className="w-full">
            <p className="underline decoration-primary text-2xl">
              Assessment Complete
            </p>
            <p className="font-medium text-xl text-primary">
              Thank you for completing the cognitive screening.
            </p>
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <p className=" underline decoration-primary text-xl ">Results</p>
            <p className="text-destructive font-semibold text-sm">
              This screening provides a general snapshot of cognitive
              performance at one point in time. Results should be interpreted
              cautiously and in context.
            </p>
            <ScoreMeter score={state.totalPoints} />
            {/* Use progress bar for each category */}
            <div className="mt-2 flex justify-between ">
              <Button onClick={resetQuiz}>Reset</Button>
              <Button onClick={() => navigate('/')}>Continue</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
