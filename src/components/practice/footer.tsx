'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import usePractice from '@/components/practice/helper/store'
import { Send } from 'lucide-react'

const PartSelector = ({ data, activePart, setActivePart, setPart }: any) => (
  <div className='flex gap-3 items-center justify-center'>
    {data?.part?.map((item: any, index: number) => (
      <div
        key={`part-${index}`}
        onClick={() => {
          setActivePart(index)
          setPart(index)
        }}
        className={`gap-6 border border-gray-300 rounded-xl px-4 py-1 cursor-pointer ${
          activePart === index ? 'border-primary1 bg-[#e5f0f9] text-black' : ''
        }`}
      >
        <p className='uppercase text-primary1'>{item.title}</p>
        <p className='text-gray-500 text-xs'>
          Questions: {item?.question?.length}
        </p>
      </div>
    ))}
  </div>
)

const PracticeFooter = ({ data, onSubmit }: any) => {
  const { setPart }: any = usePractice()
  const [activePart, setActivePart] = useState(0)
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const isResult = pathname?.includes('result')
  const handleSubmit = () => {
    if (!loading) onSubmit()
    setLoading(true)
  }

  return (
    <div className='w-full bottom-[0px] border-solid border-t border-neu3 bg-orange-01 relative z-10 py-1 px-12'>
      <div className='flex justify-between items-center'>
        <PartSelector
          data={data}
          activePart={activePart}
          setActivePart={setActivePart}
          setPart={setPart}
        />
        {!isResult && (
          <Button
            variant={loading ? 'ghost' : 'default'}
            className='px-10 flex items-center gap-2 justify-between'
            onClick={handleSubmit}
          >
            Submit <Send />
          </Button>
        )}
      </div>
    </div>
  )
}

export default PracticeFooter
