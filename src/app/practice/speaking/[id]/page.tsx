'use client'
import { locationQuestion } from '@/components/practice/helper'
import { questionList, content } from '@/components/practice/data'
import PracticeFooter from '@/components/practice/footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Practice = () => {
  const [value, setValue] = useState('')
  const dataList = locationQuestion(questionList)
  const router = useRouter()
  const onSubmit = () => {
    router.push('/result/362')
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
          <textarea
            className='font-light text-sm resize-none w-full min-h-[500px] bg-slate-100 rounded-md border p-4 outline-none'
            autoFocus
            placeholder='Nhập câu trả lời của bạn'
            onChange={e => setValue(e.target.value)}
          ></textarea>
          <p>Word count : {value.split(' ').length - 1}</p>
        </div>
      </div>
      <PracticeFooter onSubmit={onSubmit} dataList={dataList} />
    </div>
  )
}
export default Practice
