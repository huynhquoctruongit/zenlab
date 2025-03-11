'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AxiosClient, { fetcherClient } from '@/lib/api/axios-client'
import useSWR from 'swr'
import Completed from './completed'
import InCompleted from './in-completed'
import { CheckCircle, XCircle } from 'lucide-react'

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('completed')

  const query = {
    fields: ['*', 'techers.*', 'quiz.*'],
    filter: {
      techers: {
        directus_users_id: {
          _eq: '$CURRENT_USER'
        }
      }
    }
  }
  const url = ['/items/class', query]
  const { data } = useSWR(url, fetcherClient)
  const courses = data?.data?.data || []

  const filteredCourses = () => {
    switch (activeTab) {
      case 'completed':
        return courses.filter((course: any) => course.completed)
      case 'incomplete':
        return courses.filter((course: any) => !course.completed)
      default:
        return courses
    }
  }
  const renderContent = () => {
    switch (activeTab) {
      case 'completed':
        return <Completed />
      case 'incomplete':
        return <InCompleted courses={courses} />
      default:
        ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='absolute top-0 left-0 w-full h-full flex flex-col flex-1'
    >
      <div className='flex-1 h-full'>
        <div className='flex h-full w-full'>
          <div className='w-[15%] lg:w-[20%] bg-white px-4 pt-20'>
            <div className='flex flex-col text-sm'>
              <button
                className={`py-3 px-4 mb-2 rounded-lg text-left flex items-center lg:justify-start justify-center gap-2 ${
                  activeTab === 'completed'
                    ? 'bg-gray-200 text-black'
                    : 'bg-white text-black'
                }`}
                onClick={() => setActiveTab('completed')}
              >
                <CheckCircle size={18} className='flex-none' />
                <span className='text-sm lg:flex hidden'>Bài đã chấm</span>
              </button>
              <button
                className={`py-3 px-4 mb-2 rounded-lg text-left flex items-center lg:justify-start justify-center gap-2 ${
                  activeTab === 'incomplete'
                    ? 'bg-gray-200 text-black'
                    : 'bg-white text-black'
                }`}
                onClick={() => setActiveTab('incomplete')}
              >
                <XCircle size={18} className='flex-none' />
                <span className='text-sm lg:flex hidden'>Bài chưa chấm</span>
              </button>
            </div>
          </div>
          <div className='bg-gray-100 w-[85%] lg:w-[80%] p-8 overflow-auto flex flex-col gap-4'>
            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CoursesPage
