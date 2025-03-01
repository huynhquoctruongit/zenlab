import { useRef, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { countDown } from '@/lib/utils'
import usePractice from '@/components/practice/helper/store'

const INITIAL_TIME = 180

const startCountdown = (intervalRef: any, setTime: any, onSubmit: any) => {
  intervalRef.current = setInterval(() => {
    setTime((prevTime: number) => {
      if (prevTime <= 0) {
        clearInterval(intervalRef.current)
        onSubmit()
        return 0
      }
      return prevTime - 1
    })
  }, 1000)
}

const PartSelector = ({ data, activePart, setActivePart, setPart }: any) => (
  <div>
    {data?.part?.map((item: any, index: number) => (
      <div
        key={`part-${index}`}
        onClick={() => {
          setActivePart(index)
          setPart(index)
        }}
        className={`gap-6 border border-gray-300 rounded-xl px-4 py-2 cursor-pointer ${
          activePart === index ? 'border-primary1 text-black' : ''
        }`}
      >
        <p className='uppercase text-primary1'>{item.title}</p>
        <p className='text-gray-500 text-xs'>
          Questions: 0/{item?.question?.length}
        </p>
      </div>
    ))}
  </div>
)

const Timer = ({ time }: { time: number }) => (
  <div className='absolute left-[46%]'>
    <div className='bg-red rounded-full px-12 py-2 text-white font-bold'>
      {countDown(time)}
    </div>
  </div>
)

const ActionButton = ({
  isPaused,
  isLastQuestion,
  onSubmit,
  onNextQuestion
}: {
  isPaused: boolean
  isLastQuestion: boolean
  onSubmit: () => void
  onNextQuestion: () => void
}) => (
  <div className={`${isPaused ? 'opacity-1' : 'opacity-50'}`}>
    {isLastQuestion ? (
      <Button onClick={onSubmit}>Submit</Button>
    ) : (
      <Button onClick={onNextQuestion}>Next question</Button>
    )}
  </div>
)

const PracticeFooter = ({ data, onSubmit }: any) => {
  const {
    question,
    setQuestion,
    part,
    setPart,
    recordingState,
    setRecordingState
  }: any = usePractice()

  const [activePart, setActivePart] = useState(0)
  const [time, setTime] = useState(INITIAL_TIME)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const isPaused = recordingState === 'un-started'
  const questionList = data?.part[part]?.question
  const isLastQuestion = question === questionList?.length - 1

  useEffect(() => {
    startCountdown(intervalRef, setTime, onSubmit)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleNextQuestion = () => {
    setRecordingState('')
    if (isPaused) setQuestion(question + 1)
  }

  return (
    <div className='w-full bottom-[0px] border-solid border-t border-neu3 bg-orange-01 relative z-10 py-4 px-12'>
      <div className='flex justify-between items-center'>
        <PartSelector
          data={data}
          activePart={activePart}
          setActivePart={setActivePart}
          setPart={setPart}
        />
        <Timer time={time} />
        <ActionButton
          isPaused={isPaused}
          isLastQuestion={isLastQuestion}
          onSubmit={onSubmit}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  )
}

export default PracticeFooter
