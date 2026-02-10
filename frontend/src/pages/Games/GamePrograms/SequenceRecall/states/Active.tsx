import ClusteredNumbers from "@/components/ClusteredNumbers";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { generateRandomDigits } from "@/utils/generateRandomDigits";
import { useEffect, useRef, useState } from "react";

const getSequence = (length: number): string[] => {
  return generateRandomDigits(length).split("");
};

export default function Active() {
  const [numberList, setNumberList] = useState<string[]>(getSequence(3));
  const [displayedNumberIndex, setDisplayedNumberIndex] = useState(0);
  const [userInput, setUserInput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (userInput === numberList.join("")) {
      console.log("Correct!");
      reset();
    } else {
      console.log("Incorrect. The correct sequence was:", numberList.join(""));
      console.log("User input was:", userInput);
      reset();
    }
  };
  const reset = () => {
    setNumberList(getSequence(3));
    setDisplayedNumberIndex(0);
    setUserInput(null);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (userInput) submit();
  };

  useEffect(() => {
    inputRef.current?.focus();
    // Display each number for 1 second, then move to the next
    if (displayedNumberIndex < numberList.length) {
      const timer = setTimeout(() => {
        setDisplayedNumberIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    console.log("All numbers displayed");
  }, [displayedNumberIndex, numberList.length]);

  return (
    <div className="flex h-full justify-center backdrop-blur-sm">
      <div className="min-h-[90%] flex flex-col self-center drop-shadow-xl/30 bg-secondary aspect-video rounded-2xl border p-5 gap-y-3 animate-in zoom-in-0 duration-300">
        <div className=" flex-1 flex font-(family-name: --headings) rounded-lg text-primary-foreground bg-primary">
          <div className="flex-1"></div>
          <div className="flex-1 flex flex-col justify-center items-center">
            {displayedNumberIndex < numberList.length ? (
              <p className="text-[60px]">{numberList[displayedNumberIndex]}</p>
            ) : (
              <div className="w-full">
                <FieldGroup onKeyDown={handleEnter} className="flex">
                  <Field>
                    <FieldLabel
                      htmlFor="input-field-for-number"
                      className="text-xl"
                    >
                      Enter number
                    </FieldLabel>
                    <Input
                      id="input-field-for-number"
                      inputMode="numeric"
                      type="number"
                      className="h-10 bg-card text-card-foreground rounded-xl caret-primary"
                      value={userInput ?? ""}
                      onChange={(e) => setUserInput(e.target.value)}
                      ref={inputRef}
                    />
                  </Field>
                  {userInput && (
                    <Field className="w-fit self-end">
                      <Button
                        type="button"
                        variant="secondary"
                        className="self-end cursor-pointer animate-in fade-in duration-300"
                        onClick={submit}
                      >
                        Submit
                      </Button>
                    </Field>
                  )}
                </FieldGroup>
              </div>
            )}
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ClusteredNumbers
            setUserInput={setUserInput}
            disabled={displayedNumberIndex < numberList.length}
          />
        </div>
      </div>
    </div>
  );
}
