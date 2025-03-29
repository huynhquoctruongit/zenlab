'use client'
import useOnClickOutside from '@/hook/outside'
import { ChevronDown, Goal } from 'lucide-react'
import { useRef, useState } from 'react'
import { useAnswerList } from '../helper/use-answer'
import { cn } from '@/services/helpers'
import { motion } from 'framer-motion'

export const Selection = ({ question, answerResult }: any) => {
  const isResult = location?.pathname?.includes('result')
  const [selected, setSelected]: any = useState('')
  const [isOpen, setOpen]: any = useState(false)
  const ref = useRef(null)
  const { answer_list, setAnswerList }: any = useAnswerList()

  useOnClickOutside(ref, () => {
    setOpen(false)
  })

  const onSelect = (elm: any, item: any) => {
    if (isResult) return
    setSelected(elm)
    const answer = {
      answer: elm.option,
      correct: elm.option == item.correct
    }
    setAnswerList({ ...answer_list, [question.id]: answer })
  }
  const onLocation = (ref: any) => {
    const activeLocations = document.querySelectorAll('.active-location')
    activeLocations.forEach(element => {
      element.classList.remove('active-location')
    })

    setTimeout(() => {
      let targetElement = document.getElementById(`location-ref-${ref}`)
      if (targetElement) {
        targetElement.classList.add('active-location')
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 100)
  }

  const answer = answer_list?.[question.id] || answerResult
  const selectDefault = answer || selected

  return (
    <div className='w-full mx-auto'>
      <div className='grid gap-6'>
        {question?.selection?.map((item: any, index: any) => (
          <motion.div
            key={item.title}
            className={cn(
              'p-4 rounded-xl cursor-pointer transition-all duration-200',
              'border hover:border-primary1/30 hover:bg-primary1/5',
              'shadow-sm hover:shadow-md'
            )}
          >
            <p className='text-sm font-light mb-4 text-gray-800'>
              {item.title}
            </p>
            <div className='relative'>
              <div
                className={cn(
                  'w-full cursor-pointer rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors',
                  {
                    'bg-green border-green':
                      selectDefault?.correct === true && isResult,
                    'bg-red border-red':
                      selectDefault?.correct === false && isResult,
                    'hover:bg-gray': !selectDefault
                  }
                )}
                onClick={() => {
                  if (!isResult) setOpen(true)
                }}
              >
                <div className='flex items-center justify-between'>
                  <span className='block truncate text-sm'>
                    {!selected && !isResult && 'Select an option'}
                    {!isResult
                      ? selected.option || selectDefault?.selectDefault
                      : ''}
                    {isResult ? answer?.answer : ''}
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
                  className='absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg'
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
        <div className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100'>
          <h3 className='text-sm font-medium text-gray-800 mb-2'>Đáp án:</h3>
          <div className='space-y-2'>
            {question?.selection?.map((item: any, index: any) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                <p className='text-gray-700'>{item.correct}</p>
              </div>
            ))}
            <div className='flex items-start gap-4'>
              {question.explanation && (
                <div className='mt-2 w-full'>
                  <p className='font-bold text-primary1'>Explanation*</p>
                  <div className='text-sm border border-primary1 border-dashed rounded-md p-2 my-2'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: question.explanation
                      }}
                    ></div>
                  </div>
                </div>
              )}
              <div className='mt-2 w-full'>
                <p className='font-bold text-primary1'>Location*</p>
                <div onClick={() => onLocation(question.location.start)}>
                  <div className='text-sm border border-dashed border-primary1 rounded-full w-fit hover:bg-primary1/30 cursor-pointer p-2 my-2'>
                    <Goal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
