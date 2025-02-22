'use client'
import { locationQuestion } from '@/components/practice/helper'
import { questionList, content, resultList } from '../../../components/practice/data'
import FillBlank from '@/components/practice/data-types/fill_blank'
import Selection from '@/components/practice/data-types/selection'
import Multiple from '@/components/practice/data-types/checkbox'
import Radio from '@/components/practice/data-types/radio'
import PracticeFooter from '@/components/practice/footer'

const Result = () => {
  const dataType = (question: any) => {
    if (question.type === 'fill_blank')
      return <FillBlank key={question.id} answer={resultList[question.id]} question={question} />
    if (question.type === 'selection')
      return <Selection key={question.id}  answer={resultList[question.id]} question={question} />
    if (question.type === 'radio')
      return <Radio key={question.id} answer={resultList[question.id]} question={question} />
    if (question.type === 'multiple')
      return <Multiple key={question.id} answer={resultList[question.id]} question={question} />
  }
  const dataList = locationQuestion(questionList)
  const onSubmit = () => {
    // router.push('/result/362')
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
        {dataList.map((question: any) => {
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
      <PracticeFooter onSubmit={onSubmit} dataList={dataList} />
    </div>
  )
}
export default Result
