import { useState } from 'react'
import { cn } from '@/services/helpers'
import useAnswerList from '../helper/use-answer'

export const Radio = ({ question, answer }: any) => {
  const [selected, setSelected]: any = useState('')
  const { answer_list, setAnswerList }: any = useAnswerList()
  const onSelect = (item: any) => {
    if (answer) return
    const answerParams = {
      answer: item.text,
      correct: item.correct || false
    }
    setAnswerList({ ...answer_list, [question.id]: answerParams })
    setSelected(item)
  }

  return (
    <div className='flex flex-col gap-3'>
      {question.single_choice_radio.map((item: any, index: any) => {
        const choised: any = answer?.answer === item.text
        return (
          <div
            key={item.text}
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => onSelect(item)}
          >
            <div className='text-sm'>
              <div className='flex justify-between items-center'>
                <div className='relative w-5 h-5 border border-gray-300 rounded-full p-2 bg-white overflow-hidden'>
                  {selected.text === item.text && (
                    <div className='absolute left-0 top-0 bg-primary1 w-full h-full'></div>
                  )}
                  {answer && (
                    <div
                      className={cn(
                        'absolute left-0 top-0 w-full h-full flex items-center justify-center',
                        { 'bg-green': choised && answer.correct == true },
                        { 'bg-red': choised && answer.correct == false }
                      )}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            <p>{item.text}</p>
          </div>
        )
      })}
      {answer && (
        <div className='bg-slate-100 rounded-md p-4 border my-4 backdrop-blur-sm'>
          <p className='underline'>Đáp án:</p>
          {question.single_choice_radio.map((item: any, index: any) => {
            if (!item.correct) return
            return <p key={index}>{item.text}</p>
          })}
        </div>
      )}
    </div>
  )
}
