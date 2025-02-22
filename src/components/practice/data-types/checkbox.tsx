import { Check } from 'lucide-react'
import { useState } from 'react'
import useAnswerList from '../helper/use-answer'
import { resultList } from '../data'

const Checkbox = ({ question }: any) => {
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

  const reviewAnswer = resultList?.[0]?.[question.id]

  return (
    <div className='flex flex-col gap-3'>
      {question.mutilple_choice.map((item: any, index: any) => {
        const isSelected = selected?.find((elm: any) => elm?.text == item.text)
        return (
          <div
            key={'elm' + index}
            className='flex items-center gap-2 cursor-pointer'
            onClick={() => onSelect(item)}
          >
            <div className='text-sm'>
              <div className='flex justify-between items-center'>
                <div className='relative w-5 h-5 border border-gray-300 rounded-sm p-2 bg-white overflow-hidden'>
                  {isSelected && (
                    <div className='absolute left-0 top-0 bg-primary1 w-full h-full flex items-center justify-center'>
                      <Check color='white' size={20} />
                    </div>
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
export default Checkbox
