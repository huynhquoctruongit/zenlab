'use client'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { fetcherClient } from '@/lib/api/axios-client'
import {
  BookOpen,
  Users,
  Calendar,
  Clock,
  FileText,
  ChevronRight,
  ArrowLeft,
  CircleChevronRight,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { enumTypeTitle } from '@/services/helpers'

const CoursePage = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)

  const query = {
    fields: ['*', 'quiz.*', 'quiz.part.*', 'quiz.part.question.*']
  }

  const { data } = useSWR([`/items/class/${id}`, query], fetcherClient)
  const course = data?.data?.data

  const data_type: any = selectedQuiz?.data_type
  const data_type_enum = enumTypeTitle[data_type]
  console.log(data_type_enum,'data_type_enum');
  

  if (!course) {
    return (
      <div className='m-auto flex justify-center items-center w-full h-screen'>
        <Loading />
      </div>
    )
  }
  const totalQuestions = selectedQuiz?.part.reduce(
    (sum: any, part: any) => sum + (part.question ? part.question.length : 0),
    0
  )
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Left Column - Quiz List */}
        <div className='md:col-span-1'>
          <div className='bg-white rounded-lg shadow p-6'>
            <ChevronLeft
              onClick={() => router.push('/courses')}
              color='black'
              size={40}
              className='mb-6 cursor-pointer'
            ></ChevronLeft>
            <h2 className='text-2xl font-bold mb-6 flex items-center'>
              <FileText className='mr-2 text-primary1' />
              Quiz List
            </h2>
            <div className='space-y-4'>
              {course.quiz?.map((quiz: any, index: number) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  onClick={() => setSelectedQuiz(quiz)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedQuiz?.id === quiz.id
                      ? 'border-primary1 bg-primary1/5'
                      : 'border-gray-200 hover:border-primary1/30'
                  }`}
                >
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-lg mb-2'>{quiz.title}</h3>
                    <ChevronRight
                      className={`transition-transform ${
                        selectedQuiz?.id === quiz.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                  <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
                    {quiz.description}
                  </p>
                  <div className='flex justify-between items-center text-gray-500 text-sm'>
                    <p className='uppercase text-primary1 font-bold'>{enumTypeTitle[quiz.data_type]}</p>
                    <div className='flex justify-between items-center text-gray-500 text-sm'>
                      <Clock size={14} className='mr-1' />
                      <span>{quiz.duration || 10} minutes</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Course/Quiz Info */}
        <div className='md:col-span-2'>
          <AnimatePresence mode='wait'>
            {selectedQuiz ? (
              <motion.div
                key='quiz'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className='bg-white rounded-lg shadow p-6'
              >
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className='flex items-center text-gray-600 hover:text-primary1 mb-6'
                >
                  <ArrowLeft className='mr-2' />
                  Back to Course
                </button>

                <div className='flex items-center mb-6'>
                  <FileText size={40} className='text-primary1 mr-4' />
                  <h1 className='text-3xl font-bold'>{selectedQuiz.title}</h1>
                </div>
                <p className='uppercase text-primary1 font-bold mb-4'>{enumTypeTitle[selectedQuiz.data_type]}</p>
                <p className='text-gray-600 mb-8'>{selectedQuiz.description}</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
                  <div className='flex items-center bg-gray-50 p-4 rounded-lg'>
                    <Clock size={20} className='text-primary1 mr-2' />
                    <span>{selectedQuiz.duration || 10} Minutes</span>
                  </div>
                  <div className='flex items-center bg-gray-50 p-4 rounded-lg'>
                    <Users size={20} className='text-primary1 mr-2' />
                    <span>{totalQuestions || 0} Questions</span>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    router.push(
                      `/practice/${data_type_enum}/${selectedQuiz.id}`
                    )
                  }
                  className='w-full mb-4 py-6 flex justify-center items-center'
                >
                  Start Quiz
                  <CircleChevronRight size={20} />
                </Button>
                <div className='border-t pt-6'>
                  <h2 className='text-xl font-bold mb-4'>Quiz Instructions</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedQuiz.content ||
                        'Complete all questions within the time limit.'
                    }}
                    className='prose max-w-none'
                  ></div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='course'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className='bg-white rounded-lg shadow p-6'
              >
                <div className='flex items-center mb-6'>
                  <BookOpen size={40} className='text-primary1 mr-4' />
                  <h1 className='text-3xl font-bold'>{course.title}</h1>
                </div>

                <p className='text-gray-600 mb-8'>{course.description}</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
                  <div className='flex items-center bg-gray-50 p-4 rounded-lg'>
                    <Users size={20} className='text-primary1 mr-2' />
                    <span>{course.students?.length || 0} Students</span>
                  </div>
                  <div className='flex items-center bg-gray-50 p-4 rounded-lg'>
                    <Calendar size={20} className='text-primary1 mr-2' />
                    <span>
                      {new Date(course.date_created).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className='border-t pt-6'>
                  <h2 className='text-xl font-bold mb-4'>Course Content</h2>
                  <div className='prose max-w-none'>{course.content}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CoursePage
