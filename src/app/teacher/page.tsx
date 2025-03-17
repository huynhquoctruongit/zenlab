'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fetcherClient } from '@/lib/api/axios-client'
import useSWR from 'swr'
import Table from './table'
import { CheckCircle } from 'lucide-react'

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState(null)
  const query = {
    fields: ['*', 'students.*', 'teachers.*', 'quiz.*'],
    filter: {
      teachers: {
        directus_users_id: {
          _eq: '$CURRENT_USER'
        }
      }
    }
  }
  const url = ['/items/class', query]
  const { data } = useSWR(url, fetcherClient)
  const courses = data?.data?.data || []

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
              {courses.map((course: any) => (
                <button
                  className={`py-3 px-4 mb-2 rounded-lg text-left flex items-center lg:justify-start justify-center gap-2 ${
                    activeTab === 'completed'
                      ? 'bg-gray-200 text-black'
                      : 'bg-white text-black'
                  }`}
                  onClick={() => setActiveTab(course.id)}
                >
                  <span className='text-sm lg:flex hidden'>{course.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className='bg-gray-100 w-[85%] lg:w-[80%] p-8 overflow-auto flex flex-col gap-4'>
            {courses?.length > 0 && <Table courses={courses} />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CoursesPage
