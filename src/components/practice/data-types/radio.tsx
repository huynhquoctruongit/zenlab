import { useState } from 'react'
import useAnswerList from '../helper/use-answer'

const Radio = ({ question, answer }: any) => {
  const [selected, setSelected]: any = useState('')
  const { answer_list, setAnswerList }: any = useAnswerList()
  const onSelect = (item: any) => {
    const answer = {
      answer: item.text,
      correct: item.correct || false
    }
    setAnswerList({ ...answer_list, [question.id]: answer })
    setSelected(item)
  }
  return (
    <div className='flex flex-col gap-3'>
      {question.single_choice_radio.map((item: any, index: any) => {
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
                </div>
              </div>
            </div>
            <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
export default Radio
