import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

const incompletePattern = ['green', 'red', 'green', 'red', 'green', '?'];
const correctAnswer = 'red'

export default function Active() {
  const [userInput, setUserInput] = useState<string | null>(null);

  const handleSubmit = () => {
    if (userInput === correctAnswer) {
      console.log("Correct! Well done.");
    } else {
      console.log("Incorrect. Try again!");
    }
    setUserInput(null)
  }

  return (
    <>
      <div className="flex-2 bg-primary flex items-center justify-center">
        {incompletePattern.map((color, index) => (
          <div key={index} className={cn('w-20 h-30 m-2 rounded-2xl shadow-lg/20' , color === '?' ? 'bg-muted flex items-center justify-center' : color === 'green' ? 'bg-acceptive' : 'bg-destructive' )}>
            {color === '?' && <span className="text-muted-foreground text-2xl font-bold">?</span>}
          </div>
        ))

        }

      </div>
      <div className="flex-1 bg-secondary rounded-2xl flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter the missing color"
            className=" h-12 w-150 bg-muted border-primary border-2 "
            value={userInput || ""}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button className="self-end" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
