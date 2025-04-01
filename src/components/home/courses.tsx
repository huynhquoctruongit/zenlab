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
      'Các bài đọc được chọn lọc từ các trang báo nổi tiếng, và các sách luyện thi IELTS, có sẵn đáp án và giải thích chi tiết cho từng câu hỏi. Bạn hãy chăm chỉ làm bài, để tích lũy thêm kiến thức xã hội, học thêm <span class="font-bold">TỪ VỰNG</span>, và cải thiện khả năng đọc hiểu nhé!',
    color:
      'linear-gradient(135deg, #052794 0%, #1445B8 35%, #2D69E3 65%, #4A8BFF 100%)',
    icon: <BookOpen className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Listening',
    description:
      'Nguồn bài tập nghe phong phú, đi từ các đoạn hội thoại, thuyết trình đơn giản, tới những bài nghe IELTS học thuật khó hơn, giúp các bạn làm quen với đa dạng accents, cải thiện phản xạ nghe, và đạt điểm nghe cao hơn. Điều quan trọng là bạn phải <span class="font-bold">NGHE NHIỀU</span>, và hình thành <span class="font-bold">THÓI QUEN</span> nghe tiếng Anh nhé!',
    color:
      'linear-gradient(135deg, #2682E5 0%, #3B95F0 35%, #54ACFF 65%, #75C3FF 100%)',
    icon: <Headphones className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Writing',
    description:
      'Mọi bài tập viết đều được giáo viên chấm chữa cẩn thận, theo bốn tiêu chí chấm thi (Ý tưởng, mạch lạc, từ vựng, ngữ pháp). Các bài tập viết có độ khó tăng dần, đi từ việc viết câu, viết đoạn, đến viết hoàn chỉnh 1 bài essay. Bạn hãy viết để được <span class="font-bold">SỬA SAI</span> và viết giỏi hơn nhé!',
    color:
      'linear-gradient(135deg, #879CF3 0%, #9BAFF6 35%, #B4C5FA 65%, #D0DDFF 100%)',
    icon: <PenTool className='w-8 h-8' />,
    href: '/courses'
  },
  {
    title: 'Speaking',
    description:
      'Nói là một kỹ năng khó, áp lực đối mặt 1-1 với giám khảo, đòi hỏi bạn phải có ý tưởng nói, kiểm soát tốt phát âm - ngữ pháp - từ vựng. Bạn hãy ghi âm bài tập nói của mình, giáo viên sẽ nghe và phân tích các lỗi trong bài nói, để bạn rút kinh nghiệm và cải thiện <span class="font-bold">FLUENCY</span> nhé!',
    color:
      'linear-gradient(135deg, #B06CD4 0%, #C485E0 35%, #D9A1EC 65%, #EBB9F7 100%)',
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
  const { isLogin, profile }: any = useAuth()
  const isTeacher = profile?.role?.name === 'Teacher'
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

            <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6'>
              {listCourses.map((course, index) => (
                <motion.div variants={itemVariants} key={index}>
                  <Link
                    href={
                      isLogin
                        ? isTeacher
                          ? '/teacher'
                          : course.href
                        : '/login'
                    }
                  >
                    <div
                      style={{ background: course.color }}
                      className='lg:h-[300px] rounded-[35px] p-5 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
                    >
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center'>
                          {course.icon}
                        </div>
                        <h3 className='text-xl font-bold text-white mb-3'>
                          {course.title}
                        </h3>
                      </div>
                      <div className='text-white/90 md:text-[12px] text-[13px] leading-relaxed'>
                        <div
                        className=''
                          dangerouslySetInnerHTML={{
                            __html: course.description
                          }}
                        ></div>
                      </div>
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
