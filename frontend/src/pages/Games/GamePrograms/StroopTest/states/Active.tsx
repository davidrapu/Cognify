import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import type { GameAction, GameState } from "@/hooks/useGameReducer";

const statsContainerStyle =
  "bg-card p-2 rounded-2xl flex flex-col items-center justify-center gap-y-1 shadow-md";

const statsHeaderStyle = "text-2xl text-card-foreground font-semibold";

const statsStyle = "text-xl text-primary";

const buttons = [
  {
    id: 1,
    text: "Red",
    color: "bg-red-500",
    textColor: "text-red-500",
  },
  { id: 2, text: "Green", color: "bg-green-500", textColor: "text-green-500" },
  {
    id: 3,
    text: "Blue",
    color: "bg-blue-500",
    textColor: "text-blue-500",
  },
  {
    id: 4,
    text: "Black",
    color: "bg-black",
    textColor: "text-black",
  },
  {
    id: 5,
    text: "Yellow",
    color: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
];

const generateTextColor = () => {
  const colorId = Math.floor(Math.random() * 5) + 1;
  const textColorId = Math.floor(Math.random() * 5) + 1;
  return { textColorId, colorId };
};

type ActiveProps = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
};
export default function Active({ state, dispatch }: ActiveProps) {
  const [colorObject, setColorObject] = useState(generateTextColor());
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [streak, setStreak] = useState<number>(0);
  const reactionTimeRef = useRef<number>(0);
  const accuracy: number = (state.totalCorrect / state.totalAttempts) * 100 || 0;

  const handleButtonClick = (id: number) => {
    const reactionTime = Date.now() - reactionTimeRef.current; // eslint-disable-line
    dispatch({type: "increaseAttempts"})
    dispatch({type: "addTimeTaken", payload: {time: reactionTime, correct: id === colorObject.colorId}})
    if (id === colorObject.colorId) {
      dispatch({type: "incrementCorrect"})
      setColorObject(generateTextColor());
      setStreak((prev) => prev + 1);
      if (streak + 1 > state.highestConsecutiveCorrect) {
        dispatch({type: "setHighestConsecutiveCorrect", payload: streak + 1})
      }
    } else {
      setColorObject(generateTextColor());
      dispatch({type: "incrementIncorrect"})
      setStreak(0);
    }
  };

  useEffect(() => { // timer for game
    if (timeLeft === 0) return 

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000)

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => { // get reaction time

    reactionTimeRef.current = Date.now();

  }, [colorObject])

  useEffect(() => { // end game when time runs out
    if (timeLeft === 0) {
      dispatch({type: "endGame"})
    }
  }, [timeLeft, dispatch])

  return (
    <GameLayout>
      {/* <div className="flex-1 bg-card">

        </div> */}
      <div className="w-full grid grid-cols-3 gap-x-2 ">
        <div className={statsContainerStyle}>
          <p className={statsHeaderStyle}>Time Left</p>
          <p className={statsStyle}>{timeLeft.toFixed(0)}</p>
        </div>
        <div className={statsContainerStyle}>
          <p className={statsHeaderStyle}>Score</p>
          <p className={statsStyle}>{state.totalCorrect}</p>
        </div>
        <div className={statsContainerStyle}>
          <p className={statsHeaderStyle}>Accuracy</p>
          <p className={statsStyle}>{accuracy.toFixed(0)}%</p>
        </div>
      </div>
      <div className="flex-2 flex items-center justify-center text-6xl font-semibold font-family-heading tracking-widest">
        <p className={`${buttons[colorObject.colorId - 1].textColor}`}>
          {buttons[colorObject.textColorId - 1].text}
        </p>
      </div>
      <div className="flex-1 w-full gap-x-6 flex justify-center ">
        {buttons.map((button) => (
          <Button
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            className={`${button.color} text-white rounded-full size-30 text-xl font-semibold hover:scale-105 transition-transform duration-300 disabled:bg-secondary-foreground/50 disabled:hover:scale-100 disabled:hover:shadow-none hover:shadow-lg disabled:hover:border-none hover:border-2`}
            disabled={timeLeft === 0}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </GameLayout>
  );
}
