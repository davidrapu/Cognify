import { useEffect, useRef } from "react"

type QuestionData = {
  id?: number,
  category: string,
  question: string,
  type?: string,
  points?: number,
  options?: string[]
}
type QuestionProps = {
  questionObj: QuestionData,
  userInput: string,
  onChange: (value: string) => void
  isPresenting: boolean
  setIsPresenting: (value:boolean) => void
}

export default function Question({questionObj, userInput, onChange, isPresenting,setIsPresenting} : QuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [questionObj.id])
  const handleOkClick = () => {
    setIsPresenting(false)
  }

  if (isPresenting) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-y-3 ">
        <h1 className="text-2xl">{questionObj.question}</h1>
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
  }else{
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

}
