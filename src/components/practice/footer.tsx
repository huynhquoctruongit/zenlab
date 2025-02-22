import { useRef } from 'react'
import { Button } from '../ui/button'
import useAnswerList from './helper/use-answer'

const PracticeFooter = ({ dataList, onSubmit }: any) => {
  
  const { answer_list }: any = useAnswerList()
  const length = dataList[dataList.length - 1].location.end
  const lengthQuestion = Array.apply(null, Array(length))

  return (
    <div className='w-full bottom-[0px] border-solid border-t border-neu3 bg-orange-01 relative z-10 py-4 px-12'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center justify-center gap-6'>
          {lengthQuestion.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className='w-5 h-5 rounded-full bg-gray-200'
              ></div>
            )
          })}
        </div>
        <Button onClick={() => onSubmit()}>Submit</Button>
      </div>
    </div>
  )
}
export default PracticeFooter
