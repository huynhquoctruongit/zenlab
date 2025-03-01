'use client'
import { useRouter } from 'next/navigation'
import SpeakingFooter from '@/components/practice/footer-speaking'
import AudioRecording from '@/components/audio-recording'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
import AudioPlayer from 'react-h5-audio-player'

const QuestionDisplay = ({
  questionNumber,
  title
}: {
  questionNumber: number
  title: string
}) => (
  <div className='p-12 w-full'>
    <div className='px-6 py-12 w-full flex flex-col gap-2 border border-gray-300 rounded-xl'>
      <p className='text-[100px] font-bold absolute -top-3 left-7 text-gray-500'>
        {questionNumber}
      </p>
      <div className='pl-8'>
        <p className='text-2xl font-bold'>Question</p>
        <p>{title}</p>
      </div>
    </div>
  </div>
)

const RecordingSection = () => (
  <div className='cursor-pointer p-2 mx-10 flex flex-col justify-center items-center h-full relative flex-1 overflow-y-hidden'>
    <AudioRecording />
  </div>
)

const Practice = () => {
  const router = useRouter()
  const { part, question, status, audio }: any = usePractice()
  const { data } = useDetail()

  const onSubmit = () => {
    if (status === 'recording') return
    router.push('/result/362')
  }

  const questionList = data?.part[part]?.question
  const questionData = questionList?.[question]

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col flex-1'>
      <QuestionDisplay
        questionNumber={question + 1}
        title={questionData?.title}
      />
      <RecordingSection />
      <div>
        <AudioPlayer className='flex' autoPlay src={audio} onPlay={e => console.log('onPlay')} />
      </div>
      <SpeakingFooter onSubmit={onSubmit} data={data} />
    </div>
  )
}

export default Practice
