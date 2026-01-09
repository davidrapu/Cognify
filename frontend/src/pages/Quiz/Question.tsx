import { useRef, useEffect } from "react";

type QuestionData = {
  id: number,
  category: string,
  question: string,
  type: string,
  points: number,
  options?: string[]
}
type QuestionProps = {
  questionObj: QuestionData,
  userInput: string,
  onChange: (value: string) => void
}

export default function Question({questionObj, userInput, onChange} : QuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [questionObj.id]); // focus when question changes

  return (
    <div className="w-full h-full flex flex-col gap-y-3 ">
      <h1 className="text-2xl">{questionObj.question}</h1>
      <input
        value={userInput}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Answer..."
        type={questionObj.type === "calculation" ? "number" : "text"}
        className=" bg-input p-1 rounded-[10px] text-foreground font-normal focus:outline-none focus:ring-2 focus:ring-primary "
      />
    </div>
  );
}
