import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateSimilarColors } from "@/utils/generateSimilarColors";
import { useState } from "react";

type ActiveProps = {
  difficulty?: "easy" | "medium" | "hard";
};

const difficultyConfig = {
  easy: {
    count: 64,
    lightnessShift: 15,
    cols: "grid-cols-8",
  },
  medium: {
    count: 100,
    lightnessShift: 10,
    cols: "grid-cols-10",
  },
  hard: {
    count: 144,
    lightnessShift: 5,
    cols: "grid-cols-12",
  },
};

export default function Active({ difficulty = "medium" }: ActiveProps) {
  const config = difficultyConfig[difficulty];

  const generateNewColors = () => {
    return generateSimilarColors({
      count: config.count,
      lightnessShift: config.lightnessShift,
    });
  };

  const [colorData, setColorData] = useState(() => generateNewColors());
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [failed, setFailed] = useState(false);

    const handleReset = () => {
      setScore(0);
      setFailed(false);
      setColorData(generateNewColors());
    };

  const handleClick = (index: number) => {
    // Keep generating new colors until user clicks the wrong one
    // setSelectedIndex(index);
    if (index === colorData.oddIndex) {
      console.log("Correct!");
      // Generate new colors for next round
      setColorData(generateNewColors());
      // setSelectedIndex(null);

      // Increment score
      setScore((prev) => prev + 1);
    } else {
      console.log("Wrong!");
      // Optionally regenerate or keep same colors
      // setColorData(generateNewColors());
      // setSelectedIndex(null);
      setFailed(true);

    }
  };

  return (
    <GameLayout>
      <div className="relative border-2 border-primary rounded-3xl bg-card flex-1 flex items-center justify-center">
        <div className={cn("grid gap-0.5", config.cols)}>
          {colorData.colors.map((color, i) => (
            <Button
              key={i}
              className={cn("size-10 rounded-md transition-transform active:scale-95")}
              style={!failed ? { backgroundColor: color } : i === colorData.oddIndex ? { border: "2px solid var(--destructive)", scale: "0.95", backgroundColor: color } : { backgroundColor: color }}
              onClick={() => handleClick(i)}
              aria-label={`Color box ${i + 1}`}
              disabled={failed}
            />
          ))}
        </div>
      <div className="absolute top-5 right-5">
        <p className="text-xl">Score: <span className="font-semibold text-primary">{score}</span></p>
        {failed &&
          <Button variant="outline" size="sm" onClick={handleReset} className="mt-2 animate-in slide-in-from-bottom-20 fade-in duration-300">Reset</Button>
        }
      </div>
      </div>
    </GameLayout>
  );
}
