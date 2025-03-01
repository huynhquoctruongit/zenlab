import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/services/helpers'
import { useAnswerList } from '../helper/use-answer'

export const Multiple = ({ question, answer }: any) => {
  const [selected, setSelected]: any = useState([])
  const { answer_list, setAnswerList }: any = useAnswerList()

  const onSelect = (item: any) => {
    let newSelected = [...selected]
    if (newSelected?.includes(item)) {
      newSelected = newSelected.filter((i: any) => i !== item)
    } else {
      if (newSelected) newSelected = [...newSelected, item]
      else newSelected = [item]
    }
    setSelected(newSelected)
    setAnswerList({ ...answer_list, [question.id]: newSelected })
  }

  return (
    <div className='flex flex-col gap-3'>
      {question.multiple_choice.map((item: any, index: any) => {
        const isSelected = selected?.find(
          (elm: any) => elm?.title == item.title
        )
        const choised = answer?.find((elm: any) => elm?.title == item.title)

        return (
          <div
            key={'elm' + index}
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => onSelect(item)}
          >
            <div className='text-sm'>
              <div className='flex justify-between items-center'>
                <CheckboxUI
                  choised={choised}
                  answer={answer}
                  isSelected={isSelected}
                />
              </div>
            </div>
            <p>{item.title}</p>
          </div>
        )
      })}
      {answer && (
        <div className='bg-slate-100 rounded-md p-4 border my-4 backdrop-blur-sm'>
          <p className='underline'>Đáp án:</p>
          {question.multiple_choice.map((item: any, index: any) => {
            if (!item.correct) return
            return <p key={index}>- {item.title}</p>
          })}
        </div>
      )}
    </div>
  )
}
const CheckboxUI = ({ choised, answer, isSelected }: any) => {
  const { correct } = choised || {}
  return (
    <div>
      {answer && (
        <div className='relative w-5 h-5 border border-gray-300 rounded-sm p-2 bg-white overflow-hidden'>
          <div
            className={cn(
              'absolute left-0 top-0 w-full h-full flex items-center justify-center',
              { 'bg-green': correct == true },
              { 'bg-red': correct == false }
            )}
          >
            <Check color='white' size={20} />
          </div>
        </div>
      )}

      {!answer && (
        <div className='relative w-5 h-5 border border-gray-300 rounded-sm p-2 bg-white overflow-hidden'>
          {isSelected && (
            <div className='absolute left-0 top-0 bg-primary1 w-full h-full flex items-center justify-center'>
              <Check color='white' size={20} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
