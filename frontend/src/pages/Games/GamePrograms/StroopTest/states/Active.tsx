import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

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
    return {textColorId, colorId};
}

export default function Active() {
    const [colorObject, setColorObject] = useState(generateTextColor());
    const [score, setScore] = useState(0);
    // const [correct, setCorrect] = useState<boolean | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const accuracy = (score / attempts) * 100 || 0; 

    const handleButtonClick = (id: number) => {
        if (id === colorObject.colorId) {
            setScore((prev) => prev + 1);
            setColorObject(generateTextColor());
            setAttempts((prev) => prev + 1);
        } else {
            setColorObject(generateTextColor());
            setAttempts((prev) => prev + 1);
        }
    }
    const handleReset = () => {
        setScore(0);
        setAttempts(0);
        setTimeLeft(60);
        setColorObject(generateTextColor());
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

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
          <p className={statsStyle}>{score}</p>
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
      {timeLeft === 0 && (
        <Button onClick={handleReset} className="w-fit self-end px-8 animate-in fade-in slide-in-from-bottom-30 transition-transform duration-300">
          Reset
        </Button>
      )}
    </GameLayout>
  );
}
