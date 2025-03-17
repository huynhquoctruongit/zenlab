'use client'
import useSWR from 'swr'
import { setCookie } from 'react-use-cookie'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { configSWR } from '@/lib/utils'
import { directus } from '@/lib/directus'
import { getHostname } from '@/services/helpers'

export function useAuth (options?: any) {
  const {
    data: profile,
    error,
    mutate
  } = useSWR('/users/me?fields=*,role.*', {
    ...configSWR,
    revalidateOnFocus: true,
    revalidateOnMount: false,
    shouldRetryOnError: false,
    ...(options || {})
  })

  const [userInfo, setUserInfo]: any = useLocalStorage('userInfo', {})
  async function login () {
    await mutate()
  }
  async function logout () {
    try {
      var params: any = {}
      params['SameSite'] = 'None'
      params['Secure'] = true
      params['domain'] = getHostname(location.hostname)
      setCookie('auth_token', '', params)
      setCookie('expires', '')
      setCookie('refresh_token', '')
      await directus.logout()
    } catch (error) {}
    await mutate(null, { revalidate: false })
  }
  const firstLoading = profile === undefined && error === undefined
  const profileObj = profile?.data?.data || {}

  useEffect(() => {
    if (!profileObj.id) return
    if (!userInfo.id || (userInfo.id && userInfo.id !== profileObj.id)) {
      setUserInfo({
        id: profileObj.id,
        email: profileObj.email,
        fullname: profileObj.fullname,
        role: profileObj.role
      })
    }
  }, [profileObj.id])
  return {
    isLogin: firstLoading ? null : profile ? true : false,
    profile: profileObj,
    error,
    login,
    logout,
    getProfile: mutate,
    mutate: mutate,
    firstLoading,
    data: profile?.data
  }
}
