'use client'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'


export const LoginByGoogle = () => {
  const [loading, setLoading] = useState(false)

  const clickLoginByGoogle = async () => {
    setLoading(true)
    const currentUrl = location.href.includes('?')
      ? location.href + '&callback=google'
      : location.href + '?callback=google'
    window.location.href =
      process.env.NEXT_PUBLIC_CMS +
      `/auth/login/google?redirect=${encodeURIComponent(currentUrl)}`
  }
  return (
    <div
      onClick={clickLoginByGoogle}
      className='flex group duration-200 ease-in-out rounded-full justify-center'
    >
      {loading && (
        <div>
          <LoaderCircle className='animate-spin w-4 h-4' />
        </div>
      )}
      <img src='/images/google.webp' alt='' className='w-6 h-6' />
      <p className='button duration-200 ease-in-out flex items-center gap-2'>
        Đăng nhập với Google
      </p>
      <img src='/images/google.webp' alt='' className='w-6 h-6 opacity-0' />
    </div>
  )
}

export function LoginForm () {
  return (
    <div className='flex flex-col gap-4 h-fit'>
      <LoginByGoogle />
    </div>
  )
}
