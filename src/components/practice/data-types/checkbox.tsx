'use client'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/services/helpers'
import { useAnswerList } from '../helper/use-answer'
import { motion, AnimatePresence } from 'framer-motion'

export const Multiple = ({ question, answerResult }: any) => {
  const [selected, setSelected]: any = useState([])
  const { answer_list, setAnswerList }: any = useAnswerList()
  const isResult = location?.pathname?.includes('result')
  
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
  const answer = answer_list?.[question.id] || answerResult
  const selectDefault =  answer || selected

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                isSelected && 'border-primary1 bg-primary1/10',
                'shadow-sm hover:shadow-md'
              )}
            >
              <CheckboxUI
                choised={choised}
                isSelected={isSelected}
                isResult={isResult}
              />
              <p className='text-gray-700 font-medium'>{item.title}</p>
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
            className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100'
          >
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Đáp án:</h3>
            <div className='space-y-2'>
              {question.multiple_choice.map((item: any, index: any) => {
                if (!item.correct) return null
                return (
                  <div
                    key={index}
                    className='flex items-center gap-2 text-gray-700'
                  >
                    <div className='w-2 h-2 rounded-full bg-primary1'></div>
                    <p>{item.title}</p>
                  </div>
                )
              })}
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
        <div className='relative w-6 h-6 rounded-lg overflow-hidden'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              { 'bg-green': correct == true },
              { 'bg-red': correct == false }
            )}
          >
            <Check color='white' size={16} />
          </motion.div>
        </div>
      ) : (
        <div className='relative w-6 h-6 rounded-lg border-2 border-gray-300 overflow-hidden'>
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
