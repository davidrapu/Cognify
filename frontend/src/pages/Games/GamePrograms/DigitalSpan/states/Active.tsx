import ClusteredNumbers from "@/components/ClusteredNumbers";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { generateRandomDigits } from "@/utils/generateRandomDigits";
import { useRef, useState, useEffect } from "react";

export default function Active({setState}: {setState: React.Dispatch<React.SetStateAction<"start" | "active" | "end">>}) {
    
  const inputRef = useRef<HTMLInputElement>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [currentDigits, setCurrentDigits] = useState<string>(
    generateRandomDigits(3),
  );
  const [userInput, setUserInput] = useState<string | null>(null);

  const reset = () => {
    setTimeSpent(0);
    setCurrentDigits(generateRandomDigits(3));
    setUserInput(null);
  };

  const submit = () => {
    if (userInput === currentDigits) {
      reset();
    } else {
      reset();
      setState("start");
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    if (userInput) submit();
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (timeSpent >= 101) {
      // reset()
      return;
    }

    const timer = setTimeout(() => {
      setTimeSpent((prev) => prev + (8 - 3));
    }, 100);

    return () => clearTimeout(timer);
  }, [timeSpent]);

  return (
    <div className="flex h-full justify-center backdrop-blur-sm">
      <div className="min-h-[90%] flex flex-col self-center drop-shadow-xl/30 bg-secondary aspect-video rounded-2xl border p-5 gap-y-3 animate-in zoom-in-0 duration-300">
        <div className=" flex-1 flex font-(family-name: --headings) rounded-lg text-primary-foreground bg-primary">
          <div className="flex-1"></div>
          <div className="flex-1 flex flex-col justify-center items-center">
            {timeSpent < 101 ? (
              <>
                <p className="text-[60px]">{currentDigits}</p>
                <Progress
                  className="w-full"
                  bg="primary-foreground/20"
                  color="primary-foreground"
                  value={timeSpent}
                />
              </>
            ) : (
              <>
                <FieldGroup onKeyDown={handleEnter} className="w-full flex">
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
              </>
            )}
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ClusteredNumbers
            setUserInput={setUserInput}
            disabled={timeSpent < 101}
          />
        </div>
      </div>
    </div>
  );
}
