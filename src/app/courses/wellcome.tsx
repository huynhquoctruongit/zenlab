'use client'
import { motion } from 'framer-motion'
import { CourseIcon } from '../../../public/icons/icon'

const Welcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary1/5 to-primary1/10 rounded-3xl border border-primary1/20 shadow-xl shadow-primary1/5'
    >
      <div className='w-32 h-32 mb-6'>
        <CourseIcon />
      </div>

      <h1 className='text-3xl font-bold text-gray-800 mb-4 text-center'>
        Chào mừng đến với các khoá học luyện thi IELTS của ZenLab
      </h1>

      <p className='text-gray-600 text-center max-w-lg mb-8'>
        Khám phá các khóa học chất lượng cao, được thiết kế để giúp bạn phát
        triển kỹ năng và đạt được mục tiêu học tập của mình.
      </p>
    </motion.div>
  )
}

export default Welcome
