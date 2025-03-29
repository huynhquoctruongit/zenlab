'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LoginByGoogle } from '@/components/auth/login'
const LoginPage = () => {
  return (
    <div className='h-[calc(100vh-66px)] w-full bg-gradient-to-b from-white to-[#f5f5f7] flex items-center justify-center p-4 relative overflow-hidden'>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md relative z-10'
      >
        <Card className='border border-gray-200 bg-white/90 backdrop-blur-lg rounded-3xl'>
          <CardHeader>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-center space-y-4'
            >
              <img
                src='/images/logo/logo.png'
                alt='Logo'
                className='w-[200px] mx-auto'
              />
              <h1 className='text-xl font-bold bg-gradient-to-r from-primary1 to-blue-600 bg-clip-text text-transparent'>
                Chào mừng đến với ZENLAB
              </h1>
              <p className='text-gray-600 text-sm'>
                Đăng nhập để bắt đầu hành trình học tập của bạn
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='space-y-6'
            >
              <LoginByGoogle />

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
              </div>

              <div className='text-center text-[12px] text-gray-500 bg-gray-50/50 p-4 rounded-2xl'>
                Bằng việc đăng nhập, bạn đồng ý với{' '}
                <span className='text-primary1 font-medium'>
                  Điều khoản dịch vụ
                </span>
                <span> và </span>
                <span className='text-primary1 font-medium mr-1'>
                  Chính sách bảo mật 
                </span>
                của chúng tôi
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50 to-transparent opacity-50' />
    </div>
  )
}

export default LoginPage
