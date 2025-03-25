'use client'
import { locationQuestion } from '@/components/practice/helper'
import {
  FillBlank,
  Selection,
  Multiple,
  Radio
} from '@/components/practice/data-types/index'
import PracticeFooter from '@/components/practice/footer'
import { useParams, useRouter } from 'next/navigation'
import { useAnswer } from '@/components/practice/helper/use-answer'
import usePractice from '@/components/practice/helper/store'
import useDetail from '@/components/practice/helper/use-detail'
import { useEffect } from 'react'

const Practice = () => {
  const { data } = useAnswer()
  const { part, setPart }: any = usePractice()
  const router = useRouter()
  const resultList = data?.answers

  const dataType = (question: any) => {
    if (question.type === 'gap_filling')
      return <FillBlank key={question.id} question={question} answerResult={resultList?.[question.id]} />
    if (question.type === 'selection')
      return <Selection key={question.id} question={question} answerResult={resultList?.[question.id]} />
    if (question.type === 'radio')
      return <Radio key={question.id} question={question} answerResult={resultList?.[question.id]} />
    if (question.type === 'checkbox')
      return <Multiple key={question.id} question={question} answerResult={resultList?.[question.id]} />
  }

  const questionList = data?.quiz?.part[part]?.question
  const content = data?.quiz?.part[part]?.content
  const quizId = data?.quiz?.id
  const dataList = locationQuestion(questionList)
  const { data : dataDetail } = useDetail(quizId)
  const params = useParams()
  const data_type: any = params.reading_listening

  const onSubmit = () => {
    router.push('/result/1')
  }
  useEffect(() => {
    setPart(0)
  }, [])
  
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1 practice-screen'>
      <div className='grid gap-2 p-2 mx-10 h-full relative flex-1 overflow-y-hidden' style={{
        gridTemplateColumns: data_type === 'listening' ? '30% 70%' : '50% 50%'
      }}>
        <div className='p-4 overflow-y-auto border-r-2 bg-white rounded-md'>
          <div className='h-full w-full'>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
        <div className='p-4 flex flex-col gap-4 bg-white rounded-md overflow-y-auto'>
          {dataList?.map((question: any) => {
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
      <PracticeFooter onSubmit={onSubmit} data={dataDetail} />
    </div>
  )
}
export default Practice
