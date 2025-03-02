'use client'
import { locationQuestion } from '@/components/practice/helper'
import {
  FillBlank,
  Selection,
  Multiple,
  Radio
} from '@/components/practice/data-types/index'
import PracticeFooter from '@/components/practice/footer'
import { useRouter } from 'next/navigation'
import { useAnswer } from '@/components/practice/helper/use-answer'
import usePractice from '@/components/practice/helper/store'

const Practice = () => {
  const { data } = useAnswer()
  const { part }: any = usePractice()
  const router = useRouter()
  const resultList = data?.answers

  const dataType = (question: any) => {
    if (question.type === 'gap_filling')
      return <FillBlank key={question.id} question={question} answer={resultList[question.id]} />
    if (question.type === 'selection')
      return <Selection key={question.id} question={question} answer={resultList[question.id]} />
    if (question.type === 'radio')
      return <Radio key={question.id} question={question} answer={resultList[question.id]} />
    if (question.type === 'checkbox')
      return <Multiple key={question.id} question={question} answer={resultList[question.id]} />
  }

  const questionList = data?.quiz?.part[part]?.question
  const content = data?.quiz?.part[part]?.content
  const dataList = locationQuestion(questionList)
  
  const onSubmit = () => {
    router.push('/result/1')
  }
  
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1'>
      <div className='grid grid-cols-2 gap-2 p-2 mx-10 h-full relative flex-1 overflow-y-hidden'>
        <div className='p-4 overflow-y-auto border-r-2 bg-white rounded-md'>
          <div className='h-full w-full'>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
        <div className='p-4 flex flex-col gap-3 bg-white rounded-md overflow-y-auto'>
          {dataList?.map((question: any) => {
            console.log(question, 'question')
            const { location, title, id } = question
            const index =
              location.start === location.end
                ? location.start
                : `${location.start} - ${location.end}`
            return (
              <div key={id}>
                <div className='py-2 mb-2 mt-3 text-primary1'>
                  {index}. {title}
                </div>
                {dataType(question)}
              </div>
            )
          })}
        </div>
      </div>
      <PracticeFooter onSubmit={onSubmit} data={data} />
    </div>
  )
}
export default Practice
