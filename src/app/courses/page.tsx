'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AxiosClient, { fetcherClient } from '@/lib/api/axios-client'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import Completed from './completed'
import InCompleted from './in-completed'
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react'
import { CourseIcon } from '../../../public/icons/icon'
import Welcome from './wellcome'

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'completed', 'incomplete'
  const router = useRouter()

  const query = {
    fields: ['*', 'students.*', 'quiz.*'],
    filter: {
      students: {
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
        return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredCourses().map((course: any, index: number) => (
              <div
                key={index}
                className='bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 hover:border-primary1/30 group'
              >
                <div className='relative'>
                  <div className='py-10 flex items-center justify-center'>
                    <BookOpen
                      size={64}
                      color='black'
                      className='text-white/80'
                    />
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 h-24 border-b border-gray-200'></div>
                </div>

                <div className='p-6'>
                  <h2 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-primary1 transition-colors'>
                    {course.title}
                  </h2>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {course.description}
                  </p>

                  <div className='space-y-2 mb-6'>
                    <div className='flex items-center text-gray-600'>
                      <Users size={16} className='mr-2' />
                      <span className='text-sm'>
                        {course.students?.length || 0} học viên
                      </span>
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <Clock size={16} className='mr-2' />
                      <span className='text-sm'>
                        {course.duration || '8 tuần'}
                      </span>
                    </div>
                    <div className='flex items-center text-gray-600'>
                      <Calendar size={16} className='mr-2' />
                      <span className='text-sm'>
                        {new Date(course.date_created).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          course.status === 'active'
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                      ></div>
                      <span className='text-sm font-medium text-gray-600'>
                        {course.status === 'active'
                          ? 'Đang diễn ra'
                          : 'Sắp khai giảng'}
                      </span>
                    </div>
                    <button
                      className='flex items-center text-primary1 font-medium hover:gap-2 transition-all group-hover:translate-x-1'
                      onClick={() => router.push(`/courses/${course.id}`)}
                    >
                      Chi tiết
                      <ArrowRight size={16} className='ml-1' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
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
                  activeTab === 'all'
                    ? 'bg-gray-200 text-black'
                    : 'bg-white text-black'
                }`}
                onClick={() => setActiveTab('all')}
              >
                <BookOpen size={18} className='flex-none' />
                <span className='text-sm lg:flex hidden'>Tất cả khoá học</span>
              </button>
              <button
                className={`py-3 px-4 mb-2 rounded-lg text-left flex items-center lg:justify-start justify-center gap-2 ${
                  activeTab === 'completed'
                    ? 'bg-gray-200 text-black'
                    : 'bg-white text-black'
                }`}
                onClick={() => setActiveTab('completed')}
              >
                <CheckCircle size={18} className='flex-none' />
                <span className='text-sm lg:flex hidden'>Bài đã làm</span>
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
                <span className='text-sm lg:flex hidden'>Chưa làm</span>
              </button>
            </div>
          </div>
          <div className='bg-gray-100 w-[85%] lg:w-[80%] p-8 overflow-auto flex flex-col gap-4'>
            {renderContent()}
            {activeTab === 'all' && <Welcome />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CoursesPage
