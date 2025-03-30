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
import { cleanLocation, enumType } from '@/services/helpers'
import Listening from './listening'
import PracticeFooter from '@/components/practice/footer'
import AxiosClient from '@/lib/api/axios-client'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
import { Loading } from '@/components/ui/loading'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { useResponsive } from '@/hook/use-resize'

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
  const width = useResponsive()
  const isMobile = width < 768

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
  if (!data) {
    return (
      <div className='m-auto flex justify-center items-center w-full h-screen'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1 practice-screen'>
      <div className='p-2 lg:mx-10 h-full relative flex-1'>
        <ResizablePanelGroup
          direction={isMobile ? 'vertical' : 'horizontal'}
          className='overflow-y-auto absolute top-0 left-0 w-full h-full'
        >
          <ResizablePanel
            className='overflow-y-auto panel-resize'
            minSize={30}
            defaultSize={data_type === 'listening' ? 30 : 50}
          >
            <div className='p-4 overflow-y-auto bg-white rounded-md font-light text-sm'>
              <div className='h-full w-full'>
                <p className='lg:text-xl font-bold my-4'>{quiz_data?.title}</p>
                {data_type === 'listening' ? (
                  <Listening audio={quiz_data?.file} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cleanLocation(quiz_data?.content)
                    }}
                  ></div>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            className='overflow-y-auto panel-resize p-4 mb-4'
            minSize={30}
            defaultSize={data_type === 'listening' ? 70 : 50}
          >
            <div className='flex flex-col gap-6 bg-white rounded-md h-full'>
              {dataList?.map((question: any) => {
                const { location, title, id, introductory } = question
                const index =
                  location.start === location.end
                    ? location.start
                    : `${location.start} - ${location.end}`
                return (
                  <div key={id}>
                    {title?.trim() && (
                      <div className='py-2 mb-2 font-medium'>
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <PracticeFooter onSubmit={onSubmit} data={data} />
    </div>
  )
}
export default Practice
