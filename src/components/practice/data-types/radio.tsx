'use client'
import { useState } from 'react'
import { cn } from '@/services/helpers'
import { useAnswerList } from '../helper/use-answer'
import { motion } from 'framer-motion'
import { Goal } from 'lucide-react'

export const Radio = ({ question, answerResult }: any) => {
  const isResult = location?.pathname?.includes('result')
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
              <p className='text-gray-700 font-normal text-[13px]'>
                {item.title}
              </p>
            </div>
          </motion.div>
        )
      })}

      {isResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='col-span-full mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100'
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
        </motion.div>
      )}
    </div>
  )
}
