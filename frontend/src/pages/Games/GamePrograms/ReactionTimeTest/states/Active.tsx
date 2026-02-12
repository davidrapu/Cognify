import GameLayout from "@/components/GameLayout";
import { useEffect, useState } from "react";
import { Clock8 } from "@/components/icons";

const getWaitTime = () => Math.floor(Math.random() * 5000) + 2000;
export default function Active() {
  const [boxState, setBoxState] = useState<
    "waiting" | "listening" | "clicked" | "earlyClicked"
  >("waiting");
  const [waitTime, setWaitTime] = useState(getWaitTime);
  const [reactionTime, setReactionTime] = useState<number>(0);


  useEffect(() => {
    if (boxState === "waiting") {
      const timer = setTimeout(() => {
        setBoxState("listening");
      }, waitTime);

      return () => clearTimeout(timer);
    }else if (boxState === "listening") {
        const userTimer = setInterval(() => {
            setReactionTime(prev => prev + 10);
        }, 10);

        return () => clearInterval(userTimer);
    }
  }, [boxState, waitTime]);

  const handleClick = () => {
    if (boxState === "waiting") {
      setBoxState("earlyClicked");
    }else if (boxState === "listening") {
        setBoxState("clicked");
    } else {
        setBoxState("waiting");
        setWaitTime(getWaitTime());
        setReactionTime(0);
    }
  };

  return (
    <GameLayout>
      {boxState === "waiting" && (
        <div
          onClick={handleClick}
          className="flex-1 bg-destructive rounded-2xl flex items-center justify-center cursor-pointer"
        >
          <p className="text-primary-foreground text-6xl font-semibold tracking-wide">
            Wait for green...
          </p>
        </div>
      )}
      {boxState === "listening" && (
        <div
          onClick={handleClick}
          className="flex-1 bg-acceptive rounded-2xl flex items-center justify-center cursor-pointer"
        >
          <p className="text-primary-foreground text-6xl font-semibold tracking-wide">
            Click!!!
          </p>
        </div>
      )}
      {boxState === "clicked" && (
        <div
          onClick={handleClick}
          className="flex-1 gap-3 text-primary-foreground flex-col bg-acceptive rounded-2xl flex items-center justify-center cursor-pointer"
        >
          <Clock8 size={60} color="rgb(246, 249, 252)" />
          <p className=" text-6xl font-semibold tracking-wide">
            {reactionTime} ms
          </p>
          <p>Click to try again</p>
        </div>
      )}
      {boxState === "earlyClicked" && (
        <div
          onClick={handleClick}
          className="flex-1 bg-destructive text-primary-foreground rounded-2xl flex flex-col gap-3 items-center justify-center cursor-pointer"
        >
          <p className=" text-6xl font-semibold tracking-wide">Too soon!</p>
          <p>Click to try again</p>
        </div>
      )}
    </GameLayout>
  );
}
