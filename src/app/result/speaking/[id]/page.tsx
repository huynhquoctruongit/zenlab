'use client'
import { useAnswer } from '@/components/practice/helper/use-answer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { CMS_DOMAIN } from '@/lib/constant'
import { motion } from 'framer-motion'
import { Loading } from '@/components/ui/loading'
import AxiosClient from '@/lib/api/axios-client'
import { useAuth } from '@/hook/use-auth'
import { useToast } from '@/hooks/use-toast'
import dayjs from 'dayjs'

const SpeakingResult = () => {
  const { data, mutate } = useAnswer()
  const router = useRouter()
  const { toast } = useToast()
  const { profile } = useAuth()
  const [score, setScore] = useState('')
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const parts = data?.quiz?.part || []
  const voiceID = data?.answers?.voice
  const isReviewed = data?.review_status === 'reviewed'
  const isTeacher = profile?.role?.name === 'Teacher'
  const review = data?.review?.[0] || {}

  const handleSubmitGrade = () => {
    const payload = {
      score: score || review?.score,
      feedback: feedback || review?.feedback,
      answer: data?.id
    }
    AxiosClient.post('/items/review', payload).then(res => {
      AxiosClient.patch(`/items/answer/${data?.id}`, {
        review: [res?.data?.data?.id],
        review_status: 'reviewed'
      }).then(res => {
        mutate()
        toast({
          title: 'Đã gửi lên bài chấm',
          description: `Đã gửi lúc ${dayjs().format('HH:mm:ss')}`
        })
      })
    })
  }

  const ShowStatus = () => {
    if (isReviewed) {
      return (
        <div className='bg-[#2cef59] px-4 py-2 rounded-full text-[12px] shadow-sm'>
          Đã chấm
        </div>
      )
    } else {
      return (
        <div className='bg-[#e6dc25] px-4 py-2 rounded-full text-[12px] shadow-sm'>
          Chưa chấm
        </div>
      )
    }
  }

  if (!data) {
    return (
      <div className='m-auto flex justify-center items-center w-full h-screen'>
        <Loading />
      </div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='absolute inset-0 flex flex-col practice-screen'
    >
      <div className='flex-1 overflow-hidden'>
        <div className='mx-auto p-2 sm:p-4 lg:p-8 h-full'>
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className='h-full bg-white rounded-xl sm:rounded-3xl shadow-lg backdrop-blur-xl bg-opacity-95 flex flex-col'
          >
            <div className='p-4 bg-gradient-to-r from-[#2498f6] to-gray-50 flex justify-between items-center'>
              <h1 className='text-xl sm:text-2xl font-bold text-white'>
              Kết quả bài chấm
              </h1>
              <ShowStatus />
            </div>

            <div className='flex-1 flex flex-col overflow-hidden'>
              <div className='flex border-b px-4 sm:px-8 pt-2 sm:pt-4 overflow-x-auto'>
                {parts.map((part: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 sm:px-6 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap
                      ${
                        activeTab === index
                          ? 'bg-[#f5f5f7] text-black border-b-2 border-black'
                          : 'text-gray-500'
                      }`}
                    onClick={() => setActiveTab(index)}
                  >
                    Part {index + 1}
                  </motion.button>
                ))}
              </div>

              <div className='grid lg:grid-cols-2 gap-4 p-4 overflow-hidden h-full'>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className='bg-[#f5f5f7] rounded-xl p-6 overflow-y-auto'
                >
                  {parts.map((part: any, index: number) => (
                    <div
                      key={index}
                      className={activeTab === index ? 'block' : 'hidden'}
                    >
                      <div className='flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold'>{part.title}</h2>
                        <span className='px-3 py-1 bg-black text-white rounded-full text-sm'>
                          {part.question?.length} Questions
                        </span>
                      </div>
                      <div className='space-y-4'>
                        {part.question?.map((q: any, qIndex: number) => (
                          <div
                            key={qIndex}
                            className='p-2 border border-dashed border-black rounded-md'
                          >
                            <span className='font-bold'>
                              Question {qIndex + 1}:
                            </span>{' '}
                            {q.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-4'
                >
                  <div className='bg-white rounded-xl p-4 shadow-sm'>
                    <h3 className='text-lg font-medium mb-3'>Recording</h3>
                    <AudioPlayer
                      src={CMS_DOMAIN + '/assets/' + voiceID}
                      showJumpControls={false}
                      customVolumeControls={[]}
                      customAdditionalControls={[]}
                      className='rounded-lg'
                    />
                  </div>

                  <div className='bg-white rounded-xl p-4 shadow-sm flex-1'>
                    <h3 className='text-lg font-medium mb-3'>Evaluation</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Score (0-100)
                        </label>
                        <input
                          disabled={!isTeacher}
                          type='number'
                          min='0'
                          max='100'
                          defaultValue={isReviewed ? review?.score : score}
                          onChange={e => setScore(e.target.value)}
                          className='w-full focus:outline-none p-2 border rounded-lg focus:ring-1 focus:ring-black'
                          placeholder={isTeacher ? 'Nhập điểm' : ''}
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Feedback
                        </label>
                        <textarea
                          disabled={!isTeacher}
                          rows={4}
                          defaultValue={
                            isReviewed ? review?.feedback : feedback
                          }
                          onChange={e => setFeedback(e.target.value)}
                          className='w-full min-h-[200px] focus:outline-none overflow-y-auto p-2 border rounded-lg focus:ring-1 focus:ring-black'
                          placeholder={isTeacher ? 'Nhập đánh giá' : ''}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className='p-4 border-t bg-white'
              >
                <div className='flex justify-end gap-4'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => router.back()}
                    className='px-6 py-2 border-2 border-[#1d1d1f] rounded-full hover:bg-[#1d1d1f] hover:text-white transition-all'
                  >
                    Trở về
                  </motion.button>
                  {isTeacher && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSubmitGrade}
                      className='px-6 py-2 bg-primary1 text-white rounded-full hover:bg-[#1d1d1f] transition-all shadow-lg'
                    >
                      Gửi bài chấm
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default SpeakingResult
