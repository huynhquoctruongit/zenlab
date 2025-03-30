'use client'
import { useAnswer } from '@/components/practice/helper/use-answer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Loading } from '@/components/ui/loading'
import AxiosClient from '@/lib/api/axios-client'
import { useAuth } from '@/hook/use-auth'
import { useToast } from '@/hooks/use-toast'
import dayjs from 'dayjs'

const WritingResult = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { profile } = useAuth()
  const { data, mutate } = useAnswer()
  const [score, setScore] = useState('')
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [showFullContent, setShowFullContent] = useState(false)
  const parts = data?.quiz?.part || []
  const studentAnswer = data?.answers?.value || ''
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
          description: `Đã gửi lúc ${dayjs().format('HH:mm:ss')}`,
        })
      })
    })
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent)
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
      className='absolute inset-0 flex flex-col practice-screen container mx-auto'
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
                  className='bg-[#f5f5f7] rounded-xl p-4 overflow-y-auto'
                >
                  {parts.map((part: any, index: number) => (
                    <div
                      key={index}
                      className={activeTab === index ? 'block' : 'hidden'}
                    >
                      <div className='flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold'>{part.title}</h2>
                      </div>
                      <div
                        className={`prose max-w-none mb-6 text-sm relative ${
                          !showFullContent && 'max-h-[200px] overflow-hidden'
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: part.content }}
                        ></div>
                        {!showFullContent && (
                          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f5f5f7] to-transparent'></div>
                        )}
                      </div>
                      <button
                        onClick={toggleContent}
                        className='flex items-center gap-2 text-[12px] text-gray-600 hover:text-black mb-4'
                      >
                        {showFullContent ? (
                          <>
                            Xem thêm <ChevronUp size={20} />
                          </>
                        ) : (
                          <>
                            Thu lại <ChevronDown size={20} />
                          </>
                        )}
                      </button>
                      <div>
                        <h3 className='font-semibold mb-2'>
                          Câu trả lời của học sinh
                        </h3>
                        <div className='prose max-w-none whitespace-pre-wrap bg-white p-2 rounded-lg my-2 min-h-[150px] text-sm'>
                          {studentAnswer}
                        </div>
                        <div className='mt-2 text-[12px] text-gray-500'>
                          Word count: {studentAnswer.split(' ').length}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  className='flex flex-col gap-4'
                >
                  <div className='bg-white rounded-xl p-4 shadow-sm flex-1'>
                    <h3 className='text-lg font-medium mb-3'>Đánh giá</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Điểm (0-100)
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
                          className='w-full min-h-[300px] focus:outline-none p-2 border rounded-lg focus:ring-1 focus:ring-black'
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

export default WritingResult
