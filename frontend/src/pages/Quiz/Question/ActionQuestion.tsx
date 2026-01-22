import { useRef, useState } from 'react'
import Button from '@/components/Button'

interface ActionQuestionProps {
    question: string
    comment?: string
    setUserInput: React.Dispatch<React.SetStateAction<string>>
    userInput: string
}

export default function ActionQuestion({question, comment, setUserInput, userInput} : ActionQuestionProps) {
    const [isActive, setIsActive] = useState(false)
    const [time, setTime] = useState(0.0)

    const intervalRef = useRef<number | null>(null)

    const startTimer = () => {

      if (intervalRef.current !== null) return

      setIsActive(true);

      intervalRef.current = window.setInterval(() => {
        setTime(prev => prev + 0.01)
      }, 10)
    }

    const stopTimer = () => {
      if (intervalRef.current !== null){
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsActive(false)
      setTime(0)
      setUserInput( time.toFixed(2).toString() )
    }

    return (
      <div className="w-full h-full flex flex-col gap-y-3 ">
        <div>
          <h1 className="text-2xl">{question}</h1>
          <p className="font-medium text-secondary"> {comment} </p>
        </div>
        <Button disabled={userInput.trim() !== '' && isActive === false } onClick={isActive ? stopTimer : startTimer} className={`self-center rounded-[50%] size-30 mt-3 text-xl font-semibold ${isActive ? 'bg-destructive' : ''} `}>{isActive ? "Stop" : "Start"}</Button>
      </div>
    )
}
