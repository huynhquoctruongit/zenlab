"use client"
import useOnClickOutside from '@/hook/outside'
import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { useAnswerList } from '../helper/use-answer'
import { cn } from '@/services/helpers'
import { motion } from 'framer-motion'

export const Selection = ({ question, answer }: any) => {
  const isResult = location.pathname.includes('result')
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
      correct: elm.option == item.correct
    }
    setAnswerList({ ...answer_list, [question.id]: answer })
  }

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='grid gap-6'>
        {question.selection.map((item: any, index: any) => (
          <motion.div
            whileTap={{ scale: 0.98 }}
            key={item.title}
            className={cn(
              'p-4 rounded-xl cursor-pointer transition-all duration-200',
              'border hover:border-primary1/30 hover:bg-primary1/5',
              'shadow-sm hover:shadow-md'
            )}
          >
            <p className='text-lg font-medium mb-4 text-gray-800'>
              {item.title}
            </p>
            <div className='relative'>
              <div
                className={cn(
                  'w-full cursor-pointer rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors',
                  {
                    'bg-green border-green': answer?.correct === true,
                    'bg-red border-red': answer?.correct === false,
                    'hover:bg-gray': !answer
                  }
                )}
                onClick={() => {
                  if (!isResult) setOpen(true)
                }}
              >
                <div className='flex items-center justify-between'>
                  <span className='block truncate text-sm'>
                    {selected.option || answer?.answer || 'Select an option'}
                  </span>
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', {
                      'rotate-180': isOpen
                    })}
                  />
                </div>
              </div>

              {isOpen && (
                <div
                  ref={ref}
                  className='absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg'
                >
                  {question.selection_option.map((elm: any, index: any) => (
                    <div
                      key={index + 'option'}
                      onClick={() => {
                        onSelect(elm, item)
                        setOpen(false)
                      }}
                      className='px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors'
                    >
                      {elm.option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {isResult && (
        <div className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Đáp án:</h3>
          <div className='space-y-2'>
            {question.selection.map((item: any, index: any) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                <p className='text-gray-700'>{item.correct}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
