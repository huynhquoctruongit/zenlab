'use client'
import { locationQuestion } from '@/components/practice/helper'
import { questionList, content, resultList } from '../../components/practice/data'
import FillBlank from '@/components/practice/data-types/fill_blank'
import Selection  from '@/components/practice/data-types/selection'
import Multiple  from '@/components/practice/data-types/checkbox'
import useAnswerList from '@/components/practice/helper/use-answer'
import Radio from '@/components/practice/data-types/radio'

const Result = () => {
  const dataList = locationQuestion(questionList)
  const { answer_list }: any = useAnswerList()
  const dataType = (question: any) => {
    if (question.type === 'fill_blank')
      return <FillBlank resultList={resultList}  key={question.id} question={question} />
    if (question.type === 'selection')
      return <Selection resultList={resultList} key={question.id} question={question} />
    if (question.type === 'radio')
      return <Radio resultList={resultList} key={question.id} question={question} />
    if (question.type === 'multiple')
      return <Multiple resultList={resultList} key={question.id} question={question} />
  }
  

  return (
    <div className='grid grid-cols-2 gap-2 p-2 mx-10 h-[calc(100vh-56px)]'>
      <div className='p-4 overflow-y-auto relative border-r-2 bg-white rounded-md'>
        <div className='h-full w-full'>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <div className='p-4 flex flex-col gap-3 bg-white rounded-md overflow-y-auto'>
        {dataList.map((question: any) => {
          const location =
            question.location.start === question.location.end
              ? question.location.start
              : `${question.location.start} - ${question.location.end}`
          return (
            <div key={question.id}>
              <div className='py-2 mb-2 mt-3 text-primary1'>
                {location}. {question.title}
              </div>
              {dataType(question)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Result
