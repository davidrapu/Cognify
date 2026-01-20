import { useState } from 'react'
import Button from '@/components/Button'

interface ActionQuestionProps {
    question: string
    comment?: string
}

export default function ActionQuestion({question, comment} : ActionQuestionProps) {
    const [isActive, setIsActive] = useState(false)
    const handleClick = () => {
        setIsActive((isActive) => !isActive)
    }
    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{question}</h1>
          <p className="font-medium text-secondary"> {comment} </p>
        </div>
        <Button onClick={handleClick} className={`self-center rounded-[50%] size-30 mt-3 text-xl font-semibold ${isActive ? 'bg-destructive' : ''} `}>Click me</Button>
      </div>
    )
}
