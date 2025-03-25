'use client'
import { useParams, useRouter } from 'next/navigation'
import SpeakingFooter from '@/components/practice/footer-speaking'
import AudioRecording from '@/components/audio-recording'
import useDetail from '@/components/practice/helper/use-detail'
import usePractice from '@/components/practice/helper/store'
import AudioPlayer from 'react-h5-audio-player'
import AxiosClient from '@/lib/api/axios-client'
import { enumType } from '@/services/helpers'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Practice = () => {
  const params = useParams()
  const router = useRouter()
  const { part, question, status, audio, audioBlob }: any = usePractice()
  const { data } = useDetail('')
  const questionData = data?.part[part]?.question?.[question]

  const handleSubmit = async () => {
    if (status === 'recording') return

    const formData = new FormData()
    formData.append('folder', 'ec8907a6-908b-4a33-9776-b10f735980ae')
    formData.append('file', audioBlob)

    const response = await AxiosClient.post('/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (!response) return

    const result = await AxiosClient.post('/items/answer', {
      status: 'published',
      answers: { voice: response.data.data.id },
      quiz: params.id,
      class: data?.class,
      data_type: enumType.speaking
    })

    router.push(`/result/speaking/${result.data.data.id}`)
  }
console.log(questionData,'questionData?.content');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='absolute top-0 left-0 w-full h-full flex flex-col flex-1 practice-screen'
    >
      <div className='mx-10 pt-6 flex flex-col gap-8 h-full'>
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='text-center'
        >
          <h1 className='text-4xl font-bold text-black'>Speaking Practice</h1>
          <p className='mt-2 text-gray-600'>
            Question {question + 1} of {data?.part[part]?.question?.length}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-[1fr,auto,1fr] items-center gap-8'>
          {/* Question Card */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-white/20 h-full'
          >
            <div className='flex items-center gap-4 mb-6'>
              <span className='text-5xl font-bold text-black'>
                Q{question + 1}
              </span>
              {status === 'recording' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='w-4 h-4 rounded-full bg-red-500 animate-pulse'
                />
              )}
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Question
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              {questionData?.title}
            </p>
            {questionData?.introductory && <div className='mt-4 pt-4 border-t border-gray-200' dangerouslySetInnerHTML={{ __html : questionData?.introductory}}></div>}
          </motion.div>

          {/* Arrow Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className='hidden lg:flex justify-center items-center'
          >
            <ArrowRight size={48} className='text-indigo-600' />
          </motion.div>

          {/* Recording Section */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-white/20'
          >
            <div className='flex flex-col items-center gap-8'>
              <AnimatePresence>
                <motion.div
                  animate={{
                    scale: status !== 'recording' ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: 1,
                    repeat: status !== 'recording' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <AudioRecording />
                </motion.div>
              </AnimatePresence>
              {/* Audio Player */}
              <div className='w-full'>
                <AudioPlayer
                  className='rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-indigo-50 to-purple-50'
                  autoPlay
                  src={audio}
                  showJumpControls={false}
                  customVolumeControls={[]}
                  customAdditionalControls={[]}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-auto'
        >
          <SpeakingFooter onSubmit={handleSubmit} data={data} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Practice
