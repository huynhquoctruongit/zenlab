import { useState } from 'react'
import { Button } from '../ui/button'
import usePractice from '@/components/practice/helper/store'

const PartSelector = ({ data, activePart, setActivePart, setPart }: any) => (
  <div>
    {data?.part?.map((item: any, index: number) => (
      <div
        key={`part-${index}`}
        onClick={() => {
          setActivePart(index)
          setPart(index)
        }}
        className={`gap-6 border border-gray-300 rounded-xl px-4 py-1 cursor-pointer ${
          activePart === index ? 'border-primary1 text-black' : ''
        }`}
      >
        <p className='uppercase text-primary1'>{item.title}</p>
        <p className='text-gray-500 text-xs'>
          Questions: 0/{item?.question?.length}
        </p>
      </div>
    ))}
  </div>
)

const PracticeFooter = ({ data, onSubmit }: any) => {
  const { setPart }: any = usePractice()
  const [activePart, setActivePart] = useState(0)

  return (
    <div className='w-full bottom-[0px] border-solid border-t border-neu3 bg-orange-01 relative z-10 py-1 px-12'>
      <div className='flex justify-between items-center'>
        <PartSelector
          data={data}
          activePart={activePart}
          setActivePart={setActivePart}
          setPart={setPart}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  )
}

export default PracticeFooter
