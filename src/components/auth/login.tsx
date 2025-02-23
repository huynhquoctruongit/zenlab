'use client'
import { NEXT_PUBLIC_CMS } from '@/services/helpers'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hook/use-auth'
import { directus } from '@/lib/directus'
import { setAccessToken } from '@/services/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

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
      setAccessToken(access_token, expires)
      if (!access_token) return
      await getProfile()
      if (window.location.pathname === '/') {
        router.push('/')
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
      <Button className='ml-5 flex items-center justify-center gap-2'>
        <p>Đăng nhập</p>
        {(loading && (
          <div>
            <LoaderCircle className='animate-spin w-5 h-5' />
          </div>
        )) || (
          <img
            src='https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png'
            alt=''
            className='w-5 h-5'
          />
        )}
      </Button>
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
