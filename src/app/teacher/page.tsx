'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fetcherClient } from '@/lib/api/axios-client'
import useSWR from 'swr'
import Table from './table'

const CoursesPage = () => {
  const [activeTab, setActiveTab]: any = useState(0)
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
  const classList = data?.data?.data || []
  const classItem = classList[activeTab]

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
              {classList?.map((course: any, index: number) => (
                <button
                  key={course.id}
                  className={`py-3 px-4 mb-2 rounded-lg text-left flex items-center lg:justify-start justify-center gap-2 ${
                    activeTab === index
                      ? 'bg-primary1 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className='text-sm lg:flex hidden'>{course.title}</span>
                  <span className='text-sm flex lg:hidden'>{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <div className='bg-gray-100 w-[85%] lg:w-[80%] p-4 md:p-8 overflow-auto flex flex-col gap-4'>
            <span className='text-sm font-bold flex lg:hidden'>{classItem?.title}</span>
            {classList?.length > 0 && <Table classItem={classItem} />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CoursesPage
