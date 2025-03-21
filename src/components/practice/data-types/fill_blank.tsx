"use client"
import React from 'react'
import parse from 'html-react-parser'
import { regexInput, findInput } from '../helper'
import { useAnswerList } from '../helper/use-answer'
import { cn } from '@/services/helpers'
import { motion } from 'framer-motion'

const CreateInput = ({ answer, resultList, question, onInputChange }: any) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name === 'input') {
        const index: any = domNode.attribs['data-index']
        const choised = answer?.[index]
        const { correct }: any = choised || {}
        console.log(index,'index');
        
        return (
          <div className="inline-flex items-center gap-2 my-2">
            <span className='font-medium text-sm bg-gray-100 px-3 py-2 rounded-lg text-gray-700'>
              {parseInt(question.location.start) + parseInt(index) - 1}
            </span>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              disabled={answer}
              defaultValue={choised?.value}
              type='text'
              onChange={e => onInputChange(index, e.target.value)}
              className={cn(
                'border rounded-lg px-4 py-2 outline-none transition-all duration-200',
                'focus:border-primary1 focus:ring-2 focus:ring-primary1/20',
                'disabled:bg-gray disabled:cursor-not-allowed',
                {
                  'border-green bg-green': correct === true,
                  'border-red bg-red': correct === false,
                  'border-gray-200 hover:border-primary1/30': !answer
                }
              )}
            />
          </div>
        )
      }
    }
  }

  const parsedHtml = question.gap_filling.replace(
    regexInput,
    (_: any, value: any, index: any) => {
      const choised = answer?.[index]
      const { correct }: any = choised || {}
      return `<input class="${
        correct ? 'bg-green' : 'bg-red'
      }" data-index="${index}" data-value="${value}" />`
    }
  )

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 overflow-auto">
      {parse(parsedHtml, options)}
    </div>
  )
}

const checkAnswer = (question: any, index: any, value: any) => {
  const inputs = findInput(question.gap_filling)
  let correct = false
  inputs.every(input => {
    if (input.position == index && input.text === value) correct = true
  })
  return correct
}

export const FillBlank = ({ resultList, question, answer }: any) => {
  const isResult = location.pathname.includes('result')
  const { answer_list, setAnswerList }: any = useAnswerList()

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 max-w-4xl mx-auto"
    >
      <CreateInput
        answer={answer}
        resultList={resultList}
        question={question}
        onInputChange={handleInputChange}
      />
      
      {isResult && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100'
        >
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Đáp án:</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {inputs.map((item: any, index: any) => (
              <div 
                key={index}
                className='flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100'
              >
                <span className='font-medium text-primary1'>
                  {parseInt(question.location.start) + parseInt(index)}:
                </span>
                <span className='text-gray-700'>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
