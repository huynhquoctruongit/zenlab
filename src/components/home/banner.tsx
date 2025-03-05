'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] relative overflow-hidden'>
      <div className='absolute inset-0' />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/images/grid.svg")',
          backgroundSize: '30px 30px',
          opacity: 0.4
        }}
      />

      <div className='max-w-[1400px] mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between relative z-10'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0'
        >
          <div className='inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full'>
            <span className='text-blue-600 font-medium'>
              🚀 Học IELTS miễn phí
            </span>
          </div>

          <div className='md:leading-[70px]'>
            <p className='md:text-[4rem] text-[2rem] font-bold text-primary1'>
              Nền tảng <span className='text-[#1b588a]'>Học</span>
            </p>
            <p className='md:text-[4rem] text-[2rem] font-bold text-primary1'>
              và <span className='text-[#1b588a]'>Luyện thi IELTS</span>{' '}
              <span className='underline'>miễn phí</span>
            </p>
          </div>

          <p className='text-sm font-light text-gray-600 mb-8 mt-4 leading-relaxed max-w-xl'>
            Khám phá hành trình chinh phục IELTS với nền tảng học tập thông
            minh, được thiết kế để giúp bạn đạt điểm cao một cách hiệu quả và
            thú vị nhất.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <Link href='/courses'>
              <Button
                className=' text-white px-8 py-6 rounded-2xl text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-blue-500/25 hover:scale-105'
                size='lg'
              >
                Bắt đầu miễn phí ✨
              </Button>
            </Link>
          </div>

          <div className='mt-8 flex items-center gap-4 justify-center lg:justify-start'>
            <div className='flex -space-x-2'>
              <img
                src='https://randomuser.me/api/portraits/women/17.jpg'
                alt='Student avatar'
                className='w-8 h-8 rounded-full border-2 border-white'
              />
              <img
                src='https://cdnphoto.dantri.com.vn/VI_KREb9ciN0Mni30y-GLF7xNIE=/thumb_w/1155/2022/01/31/bon-nguoi-viet-tao-dau-an-quoc-te-nam-quadocx-1643601656657.jpeg'
                alt='Student avatar'
                className='w-8 h-8 rounded-full border-2 border-white'
              />
              <img
                src='https://cdn2.tuoitre.vn/2022/3/19/box1-1647685451176131010573.jpg'
                alt='Student avatar'
                className='w-8 h-8 rounded-full border-2 border-white'
              />
              <img
                src='https://cdnphoto.dantri.com.vn/vCte0jUr9J_PfJF_nndGYet_FIc=/2024/03/22/1-1711043504435.jpg'
                alt='Student avatar'
                className='w-8 h-8 rounded-full border-2 border-white'
              />
            </div>
            <p className='text-sm text-gray-600 relative z-10'>
              <span className='font-semibold'>1000+</span> học viên đã tham gia
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='lg:w-1/2 relative'
        >
          <div className='relative w-full aspect-square'>
            <div className='absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse' />
            <img
              src='/images/flat-images/relaxed.png'
              alt='Student learning'
              className='w-full h-full object-contain drop-shadow-2xl relative hover:scale-105 transition-transform duration-300'
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='absolute top-1/2 -right-8 bg-white p-4 rounded-xl shadow-lg'
          >
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-green' />
              <p className='text-sm font-medium'>2,431 người đang học</p>
              <div
                className='w-3 h-3 rounded-full bg-green-500 pulse-dot'
                style={{ marginLeft: '4px' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner
