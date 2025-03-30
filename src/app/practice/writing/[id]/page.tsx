'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { enumType } from '@/services/helpers'
import PracticeFooter from '@/components/practice/footer'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
import AxiosClient from '@/lib/api/axios-client'
import { Loading } from '@/components/ui/loading'

const Practice = () => {
  const router = useRouter()
  const params = useParams()
  const [value, setValue] = useState('')
  const { data } = useDetail("")
  const { part }: any = usePractice()
  const quiz_data = data?.part[part]
  const data_type: any = "writing"
  const id = params.id

  const onSubmit = () => {
    AxiosClient.post('/items/answer', {
      status: 'published',
      answers: { value: value },
      quiz: id,
      class : data?.class,
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
      <div className='grid md:grid-cols-2 gap-2 p-2 lg:mx-10 h-full relative flex-1 overflow-y-hidden'>
        <div className='p-4 overflow-y-auto border-r-2 bg-white rounded-md font-light text-sm'>
          <div className='h-full w-full'>
            <p className='lg:text-xl font-bold my-4'>{quiz_data?.title}</p>
            <div dangerouslySetInnerHTML={{ __html: quiz_data?.content }}></div>
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
      <PracticeFooter onSubmit={onSubmit} data={data} />
    </div>
  )
}
export default Practice
