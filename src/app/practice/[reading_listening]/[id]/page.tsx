'use client'
import { locationQuestion } from '@/components/practice/helper'
import {
  FillBlank,
  Selection,
  Multiple,
  Radio
} from '@/components/practice/data-types/index'
import PracticeFooter from '@/components/practice/footer'
import { useRouter, useParams } from 'next/navigation'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
import { useAnswerList } from '@/components/practice/helper/use-answer'
import AxiosClient from '@/lib/api/axios-client'
import { enumType } from '@/services/helpers'

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

  const { data } = useDetail()
  const { part }: any = usePractice()

  const questionList = data?.part[part]?.question
  const content = data?.part[part]?.content
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
      data_type: enumType[data_type]
    }).then(res => {
      const resultId = res.data.data.id
      router.push('/result/' + data_type + '/' + resultId)
    })
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
