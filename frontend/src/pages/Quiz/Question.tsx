import React from 'react'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className='w-full h-full flex flex-col gap-y-3 '>
      <h1 className='text-2xl'>
        {questionObj.question}
      </h1>
      <input value={userInput} onChange={handleChange} placeholder='Answer...' className=' bg-input p-1 rounded-[10px] text-foreground font-normal bg-linear-to- ' />
    </div>
  )
}
