import React, { useState } from 'react'

type QuestionData = {
  id: number,
  category: string,
  question: string,
  type: string,
  points: number,
  options?: string[]
}
type QuestionProps = {
    questionObj: QuestionData
}

export default function Question({questionObj} : QuestionProps) {
    const [userInput, setUserInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

  return (
    <div className='w-full h-full flex flex-col gap-y-3 '>
      <h1 className='text-2xl'>
        {questionObj.question}
      </h1>
      <input value={userInput} onChange={handleInputChange} placeholder='Answer...' className=' bg-input p-1 rounded-[10px] text-foreground font-normal bg-linear-to- ' />
    </div>
  )
}
