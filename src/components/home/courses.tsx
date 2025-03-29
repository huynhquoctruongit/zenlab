'use client'
import { ArrowRight, BookOpen, Headphones, PenTool, Mic2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Chart from '../chart'
import { useAuth } from '@/hook/use-auth'

const listCourses = [
  {
    title: 'Reading',
    description:
      'Khóa học giúp bạn cải thiện kỹ năng đọc hiểu qua việc luyện tập với các bài đọc đa dạng, nắm bắt ý chính, chi tiết và mở rộng vốn từ vựng.',
    color:
      'linear-gradient(135deg, #052794 0%, #1445B8 35%, #2D69E3 65%, #4A8BFF 100%)',
    icon: <BookOpen className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Listening',
    description:
      'Phát triển kỹ năng nghe qua các bài hội thoại, thông báo và bài giảng, giúp bạn nghe hiểu chi tiết và nắm bắt thông tin chính xác hơn.',
    color:
      'linear-gradient(135deg, #2682E5 0%, #3B95F0 35%, #54ACFF 65%, #75C3FF 100%)',
    icon: <Headphones className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Writing',
    description:
      'Học cách viết rõ ràng, mạch lạc và có tổ chức thông qua việc luyện tập viết câu, đoạn văn và bài luận, diễn đạt ý tưởng một cách logic và hiệu quả.',
    color:
      'linear-gradient(135deg, #879CF3 0%, #9BAFF6 35%, #B4C5FA 65%, #D0DDFF 100%)',
    icon: <PenTool className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Speaking',
    description:
      'Tập trung vào việc phát âm đúng, luyện ngữ điệu và thực hành đối thoại để nâng cao sự tự tin khi giao tiếp lưu loát trong các tình huống hàng ngày.',
    color:
      'linear-gradient(135deg, #D4A6F2 0%, #E0BBF5 35%, #ECCDF8 65%, #FFE3FF 100%)',
    icon: <Mic2 className='w-8 h-8' />,
    href: '/courses'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

const Courses = () => {
  const { isLogin } = useAuth()
  return (
    <div className='relative'>
      <div className='w-full bg-gradient-to-b from-[#f5f5f7] to-white py-16 md:py-24'>
        <div className='md:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-12'>
          {/* Courses Section */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='mb-24'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 text-left mb-3'>
              Luyện tập các kỹ năng IELTS
            </h2>
            <p className='text-gray-600 text-left mb-12'>
              Khám phá các khóa học được thiết kế chuyên biệt cho từng kỹ năng,
              giúp bạn cải thiện toàn diện
            </p>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {listCourses.map((course, index) => (
                <motion.div variants={itemVariants} key={index}>
                  <Link href={isLogin ? course.href : '/login'}>
                    <div
                      style={{ background: course.color }}
                      className='h-[280px] rounded-[35px] p-6 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
                    >
                      <div className='bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6'>
                        {course.icon}
                      </div>
                      <h3 className='text-xl font-bold text-white mb-3'>
                        {course.title}
                      </h3>
                      <p className='text-white/90 text-sm leading-relaxed'>
                        {course.description}
                      </p>

                      <div className='absolute -bottom-8 backdrop-blur-[4px] -right-4 border border-black/10 bg-white/30 rounded-full p-2 transform group-hover:translate-x-2 transition-transform'>
                        <ArrowRight className='w-20 h-20 text-gray-700' />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          {isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Chart />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses
