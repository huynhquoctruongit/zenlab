'use client'
import { useEffect } from 'react'
import { locationQuestion } from '@/components/practice/helper'
import {
  FillBlank,
  Selection,
  Multiple,
  Radio
} from '@/components/practice/data-types/index'
import PracticeFooter from '@/components/practice/footer'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { useAnswer } from '@/components/practice/helper/use-answer'
import usePractice from '@/components/practice/helper/store'
import useDetail from '@/components/practice/helper/use-detail'
import { cleanLocation } from '@/services/helpers'
import Listening from './listening'
import { Loading } from '@/components/ui/loading'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { useResponsive } from '@/hook/use-resize'

const Practice = () => {
  const { data } = useAnswer()
  const { part, setPart }: any = usePractice()
  const resultList = data?.answers

  const questionList = data?.quiz?.part[part]?.question
  const quizDetail = data?.quiz?.part[part]
  const quizId = data?.quiz?.id
  const dataList = locationQuestion(questionList)
  const { data: dataDetail } = useDetail(quizId)
  const params = useParams()
  const width = useResponsive()
  const isMobile = width < 768

  const data_type: any = params.reading_listening

  const dataType = (question: any) => {
    if (question.type === 'gap_filling')
      return (
        <FillBlank
          key={question.id}
          question={question}
          answerResult={resultList?.[question.id]}
        />
      )
    if (question.type === 'selection')
      return (
        <Selection
          key={question.id}
          question={question}
          answerResult={resultList?.[question.id]}
        />
      )
    if (question.type === 'radio')
      return (
        <Radio
          key={question.id}
          question={question}
          answerResult={resultList?.[question.id]}
        />
      )
    if (question.type === 'checkbox')
      return (
        <Multiple
          key={question.id}
          question={question}
          answerResult={resultList?.[question.id]}
        />
      )
  }

  const onSubmit = () => {
    // router.push('/result/1')
  }
  useEffect(() => {
    setPart(0)
  }, [])

  if (!data) {
    return (
      <div className='m-auto flex justify-center items-center w-full h-screen'>
        <Loading />
      </div>
    )
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1 practice-screen'>
      <div className='p-2 lg:mx-10 h-full relative flex-1 overflow-y-auto'>
        <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'} className='overflow-y-auto absolute top-0 left-0 w-full h-full'>
          <ResizablePanel minSize={30} className='overflow-y-auto panel-resize' defaultSize={50}>
            <div className='px-4 pb-4 overflow-y-auto bg-white rounded-md font-light text-sm'>
              <div className='h-full w-full'>
                {data_type === 'listening' && (
                  <Listening audio={quizDetail?.file} />
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: cleanLocation(quizDetail?.content)
                  }}
                ></div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={30} className='overflow-y-auto panel-resize p-4 mb-4' defaultSize={50}>
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
                      <div className='py-2 mb-2 text-sm font-medium'>
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

      <PracticeFooter onSubmit={onSubmit} data={dataDetail} />
    </div>
  )
}
export default Practice
