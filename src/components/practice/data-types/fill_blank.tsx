import React from 'react'
import parse from 'html-react-parser'
import { regexInput, findInput } from '../helper'
import useAnswerList from '../helper/use-answer'

const CreateInput = ({resultList, question, onInputChange }: any) => {
 
  const options = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && domNode.name === 'input') {
        const index = domNode.attribs['data-index']
        const match = resultList[question.id]
        return (
          <input
            type='text'
            onChange={e => onInputChange(index, e.target.value)}
            className='border rounded p-2 mx-1 outline-none shadow-sm'
          />
        )
      }
    }
  }

  const parsedHtml = question.fill_blank.replace(
    regexInput,
    (_: any, index: any, value: any) => {
      return `<input data-index="${index}" data-value="${value}" />`
    }
  )

  return <div>{parse(parsedHtml, options)}</div>
}
const checkAnswer = (question: any, index: any, value: any) => {
  const inputs = findInput(question.fill_blank)
  let correct = false
  inputs.every(input => {
    if (input.position == index && input.text === value) correct = true
  })

  return correct
}

const FillBlank = ({ resultList, question }: any) => {
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
  return <CreateInput resultList={resultList} question={question} onInputChange={handleInputChange} />
}

export default FillBlank
