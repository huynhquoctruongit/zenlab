'use client'
import {
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Mic2,
  Users2,
  Trophy,
  Clock,
  Target,
  Star,
  BookCheck,
  GraduationCap
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const listCourses = [
  {
    title: 'Reading',
    description:
      'Khóa học giúp bạn cải thiện kỹ năng đọc hiểu qua việc luyện tập với các bài đọc đa dạng, nắm bắt ý chính, chi tiết và mở rộng vốn từ vựng.',
    color: 'linear-gradient(135deg, #0029ff 0%, #47b7f7 100%)',
    icon: <BookOpen className='w-8 h-8' />,
    href: '/course/reading'
  },
  {
    title: 'Listening',
    description:
      'Phát triển kỹ năng nghe qua các bài hội thoại, thông báo và bài giảng, giúp bạn nghe hiểu chi tiết và nắm bắt thông tin chính xác hơn.',
    color: 'linear-gradient(135deg, #002ea6 0%, #0047ff 100%)',
    icon: <Headphones className='w-8 h-8' />,
    href: '/course/listening'
  },
  {
    title: 'Writing',
    description:
      'Học cách viết rõ ràng, mạch lạc và có tổ chức thông qua việc luyện tập viết câu, đoạn văn và bài luận, diễn đạt ý tưởng một cách logic và hiệu quả.',
    color: 'linear-gradient(135deg, #007e26 0%, #00d741 100%)',
    icon: <PenTool className='w-8 h-8' />,
    href: '/course/writing'
  },
  {
    title: 'Speaking',
    description:
      'Tập trung vào việc phát âm đúng, luyện ngữ điệu và thực hành đối thoại để nâng cao sự tự tin khi giao tiếp lưu loát trong các tình huống hàng ngày.',
    color: 'linear-gradient(135deg, #ffd324 0%, #ff9f00 100%)',
    icon: <Mic2 className='w-8 h-8' />,
    href: '/course/speaking'
  }
]

const features = [
  {
    icon: <Users2 className='w-20 h-20 text-blue-600' />,
    title: 'Giảng viên chất lượng',
    description: 'Đội ngũ giảng viên giàu kinh nghiệm, có chứng chỉ IELTS 8.0+'
  },
  {
    icon: <Trophy className='w-20 h-20 text-yellow-500' />,
    title: 'Phương pháp hiệu quả',
    description: 'Lộ trình học tập được thiết kế khoa học, phù hợp mọi trình độ'
  },
  {
    icon: <Clock className='w-20 h-20 text-green-500' />,
    title: 'Linh hoạt thời gian',
    description: 'Học mọi lúc mọi nơi, không bị giới hạn về thời gian'
  },
  {
    icon: <Target className='w-20 h-20 text-red-500' />,
    title: 'Mục tiêu rõ ràng',
    description: 'Cam kết đầu ra và lộ trình cụ thể cho từng band điểm'
  }
]

const stats = [
  { number: '10K+', label: 'Học viên', icon: <Users2 className='w-5 h-5' /> },
  {
    number: '95%',
    label: 'Tỷ lệ đạt mục tiêu',
    icon: <Star className='w-5 h-5' />
  },
  { number: '500+', label: 'Bài học', icon: <BookCheck className='w-5 h-5' /> },
  {
    number: '50+',
    label: 'Giảng viên',
    icon: <GraduationCap className='w-5 h-5' />
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
  return (
    <div className='relative'>
      <div className='w-full bg-gradient-to-b from-white to-[#f5f5f7] py-16 md:py-24'>
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
              Khóa học IELTS
            </h2>
            <p className='text-gray-600 text-left mb-12'>
              Khám phá các khóa học được thiết kế chuyên biệt cho từng kỹ năng,
              giúp bạn cải thiện toàn diện
            </p>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {listCourses.map((course, index) => (
                <motion.div variants={itemVariants} key={index}>
                  <Link href={course.href}>
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
          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-24'
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='flex items-center justify-center mb-2'>
                  <div className='bg-blue-50 p-2 rounded-lg'>{stat.icon}</div>
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-0.5'>
                  {stat.number}
                </h3>
                <p className='text-sm text-gray-600'>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='text-center mb-24'
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
              Tại sao chọn ZenLab?
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
              Chúng tôi cung cấp giải pháp học IELTS toàn diện, giúp bạn đạt
              được mục tiêu điểm số mong muốn một cách nhanh chóng và hiệu quả.
            </p>

            <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6'>
              {features.map((feature, index) => (
                <motion.div
                  variants={itemVariants}
                  key={index}
                  className='bg-white lg:min-h-[500px] flex flex-col justify-center rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300'
                >
                  <div className='flex justify-center mb-4'>{feature.icon}</div>
                  <h3 className='text-2xl font-semibold mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl px-6 py-12 md:p-12 text-center'
          >
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-3'>
              Sẵn sàng bắt đầu hành trình IELTS của bạn?
            </h2>
            <p className='text-white/90 mb-8 max-w-2xl mx-auto'>
              Đăng ký ngay hôm nay để nhận được lộ trình học tập cá nhân hóa và
              bắt đầu hành trình chinh phục IELTS của bạn.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300'
            >
              Bắt đầu ngay
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Courses
