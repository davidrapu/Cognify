import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const incompleteNumbers = [1, 2, 3, 4, "?"];
// const completeNumbers = [1, 2, 3, 4, 5];
export default function Active() {
    const [userInput, setUserInput] = useState<null | number>(null);

    const handleSubmit = () => {
        if (userInput === 5) {
            console.log("Correct! The missing number is 5.");
        } else {
            console.log("Incorrect. Try again!");
        }
    }
  return (
    <>
      <div className="flex-2 flex bg-primary rounded-2xl justify-center items-center">
        {incompleteNumbers.map((num) => (
          <div
            key={num}
            className=" w-20 h-30 text-4xl bg-secondary rounded-2xl m-2 flex items-center justify-center border border-secondary-foreground shadow-lg/20"
          >
            {num}
          </div>
        ))}
      </div>
      <div className="flex-1 bg-secondary rounded-2xl flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Enter the missing number"
            className=" h-12 w-150 bg-muted border-primary border-2 "
            value={userInput || ''}
            onChange={(e) => setUserInput(Number(e.target.value))}
          />
          <Button className="self-end" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
}
