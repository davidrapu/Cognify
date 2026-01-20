import Button from "@/components/Button";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import ActionQuestion from "./ActionQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

type QuestionData = {
  id: number;
  category: string;
  statement?: string;
  question: string;
  comment?: string;
  type?: string;
  inputType: string;
  points?: number;
  options?: string[];
};
interface QuestionProps {
  questionObj: QuestionData;
  userInput: string;
  onChange: (value: string) => void;
  isAknowledged: boolean;
  setIsAknowledged: Dispatch<SetStateAction<boolean>>;
}

export function Question({
  questionObj,
  userInput,
  onChange,
  isAknowledged,
  setIsAknowledged,
}: QuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [questionObj.id]);
  const handleOkClick = () => {
    setIsAknowledged((prev) => !prev);
  };

  if (questionObj.category === "registration" && !isAknowledged) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-y-3 ">
        <h1 className="text-2xl">{questionObj.statement}</h1>
        <Button className="rounded-[5px]" onClick={handleOkClick}>
          OK
        </Button>
      </div>
    );
  } else if (questionObj.type === "multiple_choice") {
    return <MultipleChoiceQuestion id={questionObj.id} question={questionObj.question} comment={questionObj.comment} options={questionObj.options || []} userInput={userInput} onChange={onChange} />
  } else if (questionObj.type === "action") {
    return <ActionQuestion comment={questionObj.comment} question={questionObj.question} />
  } else {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{questionObj.question}</h1>
          <p className="font-medium text-secondary"> {questionObj.comment} </p>
        </div>

        <input
          value={userInput}
          ref={inputRef}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Answer..."
          type={questionObj.inputType}
          className=" bg-input p-1 rounded-[10px] text-foreground font-normal focus:outline-none focus:ring-2 focus:ring-primary "
        />
      </div>
    );
  }
}
