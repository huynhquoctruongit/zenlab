import React from 'react'
import parse from 'html-react-parser'
import { regexInput, findInput } from '../helper'
import {useAnswerList} from '../helper/use-answer'
import { cn } from '@/services/helpers'


const CreateInput = ({ answer, resultList, question, onInputChange }: any) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name === 'input') {
        const index: any = domNode.attribs['data-index']
        const choised = answer?.[index]
        const { correct }: any = choised || {}
        return (
          <>
            <span className='font-semibold border-y rounded-l-md p-1 border-l ml-2'>
              {parseInt(question.location.start) + parseInt(index) - 1}
            </span>
            <input
              disabled={answer}
              defaultValue={choised?.value}
              type='text'
              onChange={e => onInputChange(index, e.target.value)}
              className={cn('border rounded p-2 outline-none shadow-sm', {
                'bg-green': correct == true,
                'bg-red': correct == false
              })}
            />
          </>
        )
      }
    }
  }

  const parsedHtml = question.gap_filling.replace(
    regexInput,
    (_: any, index: any, value: any) => {
      const choised = answer?.[index]
      const { correct }: any = choised || {}
      return `<input class="${
        correct ? 'bg-green' : 'bg-red'
      }" data-index="${index}" data-value="${value}" />`
    }
  )

  return <div>{parse(parsedHtml, options)}</div>
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
    <>
      <CreateInput
        answer={answer}
        resultList={resultList}
        question={question}
        onInputChange={handleInputChange}
      />
      {answer && (
        <div className='bg-slate-100 rounded-md p-4 border my-4 backdrop-blur-sm'>
          <p className='underline'>Đáp án:</p>
          {inputs.map((item: any, index: any) => {
            return (
              <p key={index}>
                {parseInt(question.location.start) + parseInt(index)}:{' '}
                {item.text}
              </p>
            )
          })}
        </div>
      )}
    </>
  )
}

