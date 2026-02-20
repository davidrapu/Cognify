
interface Props {
    id: number
    question: string
    comment?: string
    options: string[]
    userInput: string
    setUserInput: React.Dispatch<React.SetStateAction<string>>
}

export default function MultipleChoiceQuestion({id, question, comment, options, userInput, setUserInput} : Props) {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{question}</h1>
          <p className="font-medium text-secondary-text"> {comment} </p>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-2.5">
          {options.map((choice) => (
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
                name={`question-${id}`}
                value={choice}
                checked={userInput === choice}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-4 h-4"
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </div>
    );
}
