import useOnClickOutside from '@/hook/outside'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import useAnswerList from '../helper/use-answer'

const Selection = ({ question }: any) => {
  const [selected, setSelected]: any = useState('')
  const [isOpen, setOpen]: any = useState(false)
  const ref = useRef(null)
  const { answer_list, setAnswerList }: any = useAnswerList()

  useOnClickOutside(ref, () => {
    setOpen(false)
  })
  const onSelect = (elm: any, item: any) => {
    setSelected(elm)
    const answer = {
      answer: elm.option,
      correct: elm.option == item.answer
    }

    setAnswerList({ ...answer_list, [question.id]: answer })
  }
  return (
    <div>
      {question.selection.map((item: any, index: any) => {
        return (
          <div key={index + 'question'} className='flex items-center gap-2'>
            <div className='relative bg-white min-w-[100px] border rounded-md p-2 text-sm'>
              <div
                className='flex justify-between items-center'
                onClick={() => setOpen(true)}
              >
                <p className='whitespace-nowrap mr-2 cursor-pointer'>
                  {selected.option}
                </p>
                <ChevronDown />
              </div>
              {isOpen && (
                <div
                  ref={ref}
                  className='bg-white absolute z-10 border left-0 top-12 p-1 rounded-md shadow-md flex flex-col gap-2'
                >
                  {question.selection_option.map((elm: any) => (
                    <div
                      key={elm.id}
                      onClick={() => {
                        onSelect(elm, item)
                        setOpen(false)
                      }}
                      className='cursor-pointer whitespace-nowrap hover:bg-gray-100 p-2 rounded-md'
                    >
                      {elm.option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
export default Selection
