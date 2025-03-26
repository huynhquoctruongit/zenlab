'use client'
import { locationQuestion } from '@/components/practice/helper'
import {
  FillBlank,
  Selection,
  Multiple,
  Radio
} from '@/components/practice/data-types/index'
import { useRouter, useParams } from 'next/navigation'
import { useAnswerList } from '@/components/practice/helper/use-answer'
import { enumType } from '@/services/helpers'
import Listening from './listening'
import PracticeFooter from '@/components/practice/footer'
import AxiosClient from '@/lib/api/axios-client'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
const Practice = () => {
  const dataType = (question: any) => {
    if (question.type === 'gap_filling')
      return <FillBlank key={question.id} question={question} />
    if (question.type === 'selection')
      return <Selection key={question.id} question={question} />
    if (question.type === 'radio')
      return <Radio key={question.id} question={question} />
    if (question.type === 'checkbox')
      return <Multiple key={question.id} question={question} />
  }

  const { data } = useDetail('')
  const { part }: any = usePractice()

  const questionList = data?.part[part]?.question
  const quiz_data = data?.part[part]
  const dataList = locationQuestion(questionList)

  const { answer_list }: any = useAnswerList()
  const router = useRouter()
  const params = useParams()

  const id = params.id
  const data_type: any = params.reading_listening
  const onSubmit = () => {
    AxiosClient.post('/items/answer', {
      status: 'published',
      answers: answer_list,
      quiz: id,
      class: data?.class,
      data_type: enumType[data_type]
    }).then(res => {
      const resultId = res.data.data.id
      router.push('/result/' + data_type + '/' + resultId)
    })
  }
  
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1 practice-screen'>
      <div className='grid gap-2 p-2 mx-10 h-full relative flex-1 overflow-y-hidden' style={{
        gridTemplateColumns: data_type === 'listening' ? '30% 70%' : '50% 50%'
      }}>
        <div className='p-4 overflow-y-auto border-r-2 bg-white rounded-md'>
          <div className='h-full w-full'>
            <p className='text-2xl font-bold my-4'>{quiz_data?.title}</p>
            {data_type === 'listening' ? (
              <Listening audio={quiz_data?.file} />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: quiz_data?.content }}
              ></div>
            )}
          </div>
        </div>
        <div className='p-4 flex flex-col gap-8 bg-white rounded-md overflow-y-auto'>
          {dataList?.map((question: any) => {
            const { location, title, id, introductory } = question
            const index =
              location.start === location.end
                ? location.start
                : `${location.start} - ${location.end}`
            return (
              <div key={id}>
                {title?.trim() && (
                  <div className='py-2 mb-2 font-bold'>
                    <span className='text-xl'>{index}</span>. {title}
                  </div>
                )}
                <div
                  className='mb-4 text-sm'
                  dangerouslySetInnerHTML={{ __html: introductory }}
                ></div>
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
