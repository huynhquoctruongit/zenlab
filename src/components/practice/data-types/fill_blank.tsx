'use client'
import React from 'react'
import parse from 'html-react-parser'
import { regexInput, findInput } from '../helper'
import { useAnswerList } from '../helper/use-answer'
import { cn } from '@/services/helpers'
import { motion } from 'framer-motion'
import { Goal } from 'lucide-react'

const CreateInput = ({ answer, question, onInputChange, isResult }: any) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name === 'input') {
        const index: any = domNode.attribs['data-index']
        const choised = answer?.[index]
        const { correct }: any = choised || {}
        return (
          <span className='inline-flex items-center gap-2 my-2'>
            <span className='font-medium text-sm bg-gray-100 px-3 py-2 rounded-lg text-gray-700'>
              {parseInt(question.location.start) + parseInt(index) - 1}
            </span>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              disabled={isResult}
              defaultValue={choised?.value}
              type='text'
              onChange={e => onInputChange(index, e.target.value?.trim())}
              className={cn(
                'border rounded-lg px-4 py-2 outline-none transition-all duration-200',
                'focus:border-primary1 focus:ring-2 focus:ring-primary1/20',
                'disabled:bg-gray disabled:cursor-not-allowed',
                {
                  'border-green bg-green': correct === true && isResult,
                  'border-red bg-red': correct === false && isResult,
                  'border-gray-200 hover:border-primary1/30': !answer
                }
              )}
            />
          </span>
        )
      }
    }
  }

  const parsedHtml = question?.gap_filling?.replace(
    regexInput,
    (_: any, value: any, index: any) => {
      const choised = answer?.[index]
      const { correct }: any = choised || {}
      return `<input class="${
        correct ? 'bg-green' : 'bg-red'
      }" data-index="${index}" data-value="${value}" />`
    }
  )
  return parsedHtml ? (
    <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 overflow-auto text-gray-700 font-normal text-[13px]'>
      {parse(parsedHtml || '', options)}
    </div>
  ) : null
}

const checkAnswer = (question: any, index: any, value: any) => {
  const inputs = findInput(question.gap_filling)
  let correct = false
  inputs.every(input => {
    if (input.position == index) {
      const possibleAnswers = input.text.split('|')
      if (
        possibleAnswers.some(
          answer => answer.trim().toLowerCase() === value.toLowerCase()
        )
      ) {
        correct = true
        return false
      }
    }
    return true
  })
  return correct
}

export const FillBlank = ({ resultList, question, answerResult }: any) => {
  const isResult = location?.pathname?.includes('result')
  const { answer_list, setAnswerList }: any = useAnswerList()

  const answer = answer_list?.[question.id] || answerResult
  const selectDefault = answer

  const handleInputChange = (index: string, value: string) => {
    const newAnswer = {
      correct: checkAnswer(question, index, value),
      value: value
    }
    let prevAnswerList: any = answer_list
    const currentAnswers = prevAnswerList[question.id] || {}
    const updatedAnswers = {
      ...currentAnswers,
      [index]: newAnswer
    }

    prevAnswerList = {
      ...prevAnswerList,
      [question.id]: updatedAnswers
    }
    setAnswerList(prevAnswerList)
  }

  const inputs = findInput(question.gap_filling)

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mx-auto'
    >
      <CreateInput
        isResult={isResult}
        answer={selectDefault}
        resultList={resultList}
        question={question}
        onInputChange={handleInputChange}
      />

      {isResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100'
        >
          <h3 className='text-sm font-semibold text-primary1 mb-2'>ĐÁP ÁN</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {inputs.map((item: any, index: any) => (
              <div
                key={index}
                className='flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100 overflow-x-auto'
              >
                <div className='flex items-center justify-between gap-3 w-full'>
                  <div className='flex items-center w-full'>
                    <span className='font-medium text-primary1 flex items-center'>
                      {parseInt(question.location.start) + parseInt(index)}:
                    </span>
                    <span
                      className='text-gray-700 text-[13px] ml-2'
                      dangerouslySetInnerHTML={{
                        __html: item.text?.replace(
                          /\|/g,
                          '<span class="text-primary1 mx-2">|</span>'
                        )
                      }}
                    ></span>
                  </div>
                  <div>
                    <div
                      onClick={() =>
                        onLocation(
                          parseInt(question.location.start) + parseInt(index)
                        )
                      }
                      className='text-sm border border-dashed border-primary1 rounded-full w-fit hover:bg-primary1/30 cursor-pointer p-2 my-2'
                    >
                      <Goal />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {question.explanation && (
              <div className='flex items-start gap-4'>
                <div className='mt-2 w-full'>
                  <p className='font-bold text-sm text-primary1'>Explanation*</p>
                  <div className='text-sm border border-primary1 border-dashed rounded-md p-2 my-2'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: question.explanation
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
