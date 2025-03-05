'use client'
import { useAnswer } from '@/components/practice/helper/use-answer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const WritingResult = () => {
  const { data } = useAnswer()
  const router = useRouter()
  const [score, setScore] = useState('')
  const [feedback, setFeedback] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [showFullContent, setShowFullContent] = useState(false)
  const parts = data?.quiz?.part || []
  const studentAnswer = data?.answers?.value || ''

  const handleSubmitGrade = () => {
    console.log('Score:', score, 'Feedback:', feedback)
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='absolute inset-0 flex flex-col'
    >
      <div className='flex-1 overflow-hidden'>
        <div className='mx-auto p-2 sm:p-4 lg:p-8 h-full'>
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className='h-full bg-white rounded-xl sm:rounded-3xl shadow-lg backdrop-blur-xl bg-opacity-95 flex flex-col'
          >
            <div className='p-4 bg-gradient-to-r from-[#000000] to-[#434343]'>
              <h1 className='text-xl sm:text-2xl font-bold text-white'>Writing Test Results</h1>
            </div>

            <div className='flex-1 flex flex-col overflow-hidden'>
              <div className='flex border-b px-4 sm:px-8 pt-2 sm:pt-4 overflow-x-auto'>
                {parts.map((part: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 sm:px-6 py-2 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap
                      ${activeTab === index ? 'bg-[#f5f5f7] text-black border-b-2 border-black' : 'text-gray-500'}`}
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
                    <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
                      <div className='flex justify-between mb-4'>
                        <h2 className='text-xl font-semibold'>{part.title}</h2>
                      </div>
                      <div className={`prose max-w-none mb-6 relative ${!showFullContent && 'max-h-[200px] overflow-hidden'}`}>
                        <div dangerouslySetInnerHTML={{ __html: part.content }}></div>
                        {!showFullContent && (
                          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f5f5f7] to-transparent'></div>
                        )}
                      </div>
                      <button 
                        onClick={toggleContent}
                        className='flex items-center gap-2 text-gray-600 hover:text-black mb-4'
                      >
                        {showFullContent ? (
                          <>Show Less <ChevronUp size={20}/></>
                        ) : (
                          <>Show More <ChevronDown size={20}/></>
                        )}
                      </button>
                      <div>
                        <h3 className='font-semibold mb-2'>Student's Answer</h3>
                        <div className='prose max-w-none whitespace-pre-wrap bg-white p-2 rounded-lg my-2 min-h-[150px] text-sm'>{studentAnswer}</div>
                        <div className='mt-2 text-sm text-gray-500'>
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
                    <h3 className='text-lg font-medium mb-3'>Evaluation</h3>
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Score (0-100)</label>
                        <input
                          type='number'
                          min='0'
                          max='100'
                          value={score}
                          onChange={e => setScore(e.target.value)}
                          className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-black'
                          placeholder='Enter score'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Feedback</label>
                        <textarea
                          rows={4}
                          value={feedback}
                          onChange={e => setFeedback(e.target.value)}
                          className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-black'
                          placeholder='Provide detailed feedback...'
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
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleSubmitGrade}
                    className='px-6 py-2 bg-black text-white rounded-full hover:bg-[#1d1d1f] transition-all shadow-lg'
                  >
                    Submit Evaluation
                  </motion.button>
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
