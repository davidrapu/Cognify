import React, { useState } from 'react'

const question = {
  id: 1,
  category: "orientation",
  question: "What year is it?",
  type: "system_time",
  points: 1,
};

export default function Question() {
    const [userInput, setUserInput] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value)
    }

  return (
    <div className='w-full h-full flex flex-col gap-y-3 '>
      <h1 className='text-2xl'>
        {question.question}
      </h1>
      <input value={userInput} onChange={handleInputChange} placeholder='Answer...' className=' bg-input p-1 rounded-[10px] text-foreground font-normal bg-linear-to- ' />
    </div>
  )
}
