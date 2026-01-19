import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type QuestionData = {
  id?: number;
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
};

export default function Question({
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
        <button
          className={
            "bg-primary text-primary-foreground tracking-wide w-fit py-1 px-3 rounded-[5px] cursor-pointer "
          }
          onClick={handleOkClick}
        >
          OK
        </button>
      </div>
    );
  } else if (questionObj.type === "multiple_choice") {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{questionObj.question}</h1>
          <p className="font-medium text-secondary"> {questionObj.comment} </p>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-2.5">
          {questionObj.options?.map((choice) => (
            <label
              key={choice}
              htmlFor={choice}
              className={`flex items-center justify-center gap-x-2 py-2 px-3 
        border-2 rounded-[10px] cursor-pointer
        ${
          userInput === choice
            ? "border-primary bg-primary/10"
            : "bg-secondary border-border"
        }`}
            >
              <input
                id={choice}
                type="radio"
                name={`question-${questionObj.id}`}
                value={choice}
                checked={userInput === choice}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4"
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </div>
    );
  } else if (questionObj.type === 'action') {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{questionObj.question}</h1>
          <p className="font-medium text-secondary"> {questionObj.comment} </p>
        </div>
        <button>
          Click me
        </button>
      </div>
    );
  }
  else {
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
