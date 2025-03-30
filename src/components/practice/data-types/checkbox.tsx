'use client'
import { Check, Goal } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/services/helpers'
import { useAnswerList } from '../helper/use-answer'
import { motion, AnimatePresence } from 'framer-motion'

export const Multiple = ({ question, answerResult }: any) => {
  const [selected, setSelected]: any = useState([])
  const { answer_list, setAnswerList }: any = useAnswerList()
  const isResult = location?.pathname?.includes('result')

  const onSelect = (item: any) => {
    if (isResult) return
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
  const answer = answer_list?.[question.id] || answerResult
  const selectDefault = answer || selected

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
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4'>
        {question.multiple_choice.map((item: any, index: any) => {
          const isSelected = selectDefault?.find(
            (elm: any) => elm?.title == item.title
          )
          const choised = answer?.find((elm: any) => elm?.title == item.title)

          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={'elm' + index}
              onClick={() => onSelect(item)}
              className={cn(
                'p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3',
                'border hover:border-primary1/30 hover:bg-primary1/5',
                isSelected && !isResult && 'border-primary1 bg-primary1/10',
                'shadow-sm hover:shadow-md'
              )}
            >
              <CheckboxUI
                choised={choised}
                isSelected={isSelected}
                isResult={isResult}
              />
              <p className='text-gray-700 font-normal text-[13px]'>
                {item.title}
              </p>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {isResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100'
          >
            <h3 className='text-sm font-semibold text-primary1 mb-2'>ĐÁP ÁN</h3>
            <div className='space-y-2'>
              {question.multiple_choice.map((item: any, index: any) => {
                if (!item.correct) return null
                return (
                  <div
                    key={index}
                    className='flex items-center text-sm gap-2 text-gray-700'
                  >
                    <div className='w-2 h-2 rounded-full bg-primary1'></div>
                    <p>{item.title}</p>
                  </div>
                )
              })}
              <div className='flex items-start gap-4'>
                {question.explanation && (
                  <div className='mt-2 w-full'>
                    <p className='font-bold text-sm text-primary1'>
                      Explanation*
                    </p>
                    <div className='text-sm border border-primary1 border-dashed rounded-md p-2 my-2'>
                      <div
                        className='font-extralight'
                        dangerouslySetInnerHTML={{
                          __html: question.explanation
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className='mt-2 w-fit flex flex-col justify-center items-center gap-2'>
                  <p className='font-bold text-sm text-primary1'>Location*</p>
                  <div onClick={() => onLocation(question.location.start)}>
                    <div className='text-sm border border-dashed border-primary1 rounded-full w-fit hover:bg-primary1/30 cursor-pointer p-2 my-2'>
                      <Goal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CheckboxUI = ({ choised, isSelected, isResult }: any) => {
  const { correct } = choised || {}

  return (
    <div>
      {isResult ? (
        <div className='relative w-6 h-6 rounded-lg overflow-hidden border border-gray-300'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              { 'bg-green': correct == true },
              { 'bg-red': correct == undefined && isSelected?.title }
            )}
          >
            <Check color='white' size={16} />
          </motion.div>
        </div>
      ) : (
        <div className='relative w-6 h-6 rounded-lg border border-gray-300 overflow-hidden'>
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className='absolute inset-0 bg-primary1 flex items-center justify-center'
              >
                <Check color='white' size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
