'use client'
import { useState } from 'react'
import { cn } from '@/services/helpers'
import { useAnswerList } from '../helper/use-answer'
import { motion } from 'framer-motion'

export const Radio = ({ question, answerResult }: any) => {
  const isResult = location.pathname.includes('result')
  const [selected, setSelected]: any = useState('')
  const { answer_list, setAnswerList }: any = useAnswerList()

  const answer = answer_list?.[question.id] || answerResult
  const selectDefault = answer || selected

  const onSelect = (item: any) => {
    if (isResult) return
    const answerParams = {
      answer: item.title,
      correct: item.correct || false
    }
    setAnswerList({ ...answer_list, [question.id]: answerParams })
    setSelected(item)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {question.radio.map((item: any, index: any) => {
        const choised: any = answer?.answer === item.title
        const isSelected = selected.title === item.title

        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={item.title}
            onClick={() => onSelect(item)}
            className={cn(
              'p-4 rounded-xl cursor-pointer transition-all duration-200',
              'border hover:border-primary1/30 hover:bg-primary1/5',
              'shadow-sm hover:shadow-md',
              isSelected && 'border-primary1 bg-primary1/10',
              selectDefault &&
                choised &&
                selectDefault.correct &&
                'border-green-500 bg-green-50',
              selectDefault &&
                choised &&
                !selectDefault.correct &&
                'border-red-500 bg-red-50'
            )}
          >
            <div className='flex items-center gap-3'>
              <div className='relative flex-shrink-0 w-5 h-5 border border-gray-300 rounded-full bg-white overflow-hidden'>
                {isSelected && (
                  <div className='absolute inset-0 bg-primary1 rounded-full'></div>
                )}
                {selectDefault && choised && isResult && (
                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center rounded-full',
                      selectDefault.correct ? 'bg-green' : 'bg-red'
                    )}
                  ></div>
                )}
              </div>
              <p className='text-gray-700 font-medium'>{item.title}</p>
            </div>
          </motion.div>
        )
      })}

      {isResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='col-span-full mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100'
        >
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>
            Đáp án đúng:
          </h3>
          {question.radio.map((item: any, index: any) => {
            if (!item.correct) return null
            return (
              <div key={index} className='text-green-600 font-medium'>
                {item.title}
              </div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
