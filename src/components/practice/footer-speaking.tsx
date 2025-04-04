import { useRef, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { countDown } from '@/lib/utils'
import { Send } from 'lucide-react'
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
          Questions: {item?.question?.length}
        </p>
      </div>
    ))}
  </div>
)

const Timer = ({ time }: { time: number }) => (
  <div className='md:absolute top-0 mt-1.5 left-[46%]'>
    <div className='md:bg-red rounded-full px-12 py-2 md:text-white text-black font-bold'>
      {countDown(time)}
    </div>
  </div>
)

const ActionButton = ({
  isDisabled,
  isPaused,
  isLastQuestion,
  onSubmit,
  onNextQuestion
}: {
  isPaused: boolean
  isLastQuestion: boolean
  onSubmit: () => void
  onNextQuestion: () => void
  isDisabled: boolean
}) => (
  <div
    className={`${isPaused ? 'opacity-1' : 'opacity-50'} ${
      isDisabled ? 'opacity-50' : ''
    }`}
  >
    {isDisabled ? (
      <div className='py-4'>Không có question nào!</div>
    ) : isLastQuestion ? (
      <Button
        className='px-10 flex items-center gap-2 justify-between'
        onClick={onSubmit}
      >
        Submit <Send />
      </Button>
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
    <div className='w-full bottom-[0px] border-solid border-t border-neu3 bg-orange-01 relative z-10 py-2 md:px-12'>
      <div className='md:hidden flex justify-center items-center'>
        <Timer time={time} />
      </div>
      <div className='flex justify-between items-center px-4'>
        <PartSelector
          data={data}
          activePart={activePart}
          setActivePart={setActivePart}
          setPart={setPart}
        />
        <div className='md:flex hidden'>
          <Timer time={time} />
        </div>
        <ActionButton
          isDisabled={!questionList || questionList?.length === 0}
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
