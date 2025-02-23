'use client'
import { NEXT_PUBLIC_CMS } from '@/services/helpers'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hook/use-auth'
import { directus } from '@/lib/directus'
import { setAccessToken } from '@/services/helpers'
import { useRouter, useSearchParams } from 'next/navigation'

export const LoginByGoogle = () => {
  const router = useRouter()
  const params: any = useSearchParams()
  const callback = params.get('callback')

  const [loading, setLoading] = useState(false)
  const { getProfile, isLogin, profile } = useAuth()
  const loginByGoogle = async () => {
    try {
      const res: any = await directus.refresh()
      const { access_token, expires } = res
      console.log(res, 'res')

      setAccessToken(access_token, expires)
      if (!access_token) return
      await getProfile()
      if (window.location.pathname === '/') {
        router.push('/home')
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    if (callback === 'google') {
      loginByGoogle()
    }
  }, [])

  const clickLoginByGoogle = async () => {
    setLoading(true)
    const currentUrl = location.href.includes('?')
      ? location.href + '&callback=google'
      : location.href + '?callback=google'
    window.location.href =
      NEXT_PUBLIC_CMS + `/auth/login/google?redirect=${currentUrl}`
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
        Đăng nhập với Googleasas
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
