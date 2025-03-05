import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { setCookie } from 'react-use-cookie'

export const NEXT_PUBLIC_CMS = 'https://cms.zenlab.edu.vn'
export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getHostname (input: any) {
  if (input.indexOf('zenlab') > -1) {
    return '.e-learning.zenlab.edu.vn'
  } else {
    return 'localhost'
  }
}
export const enumType: any = {
  speaking: 1,
  reading: 2,
  writing: 3,
  listening: 4
}
export const enumDataType: any = [
  { id: '2', name: 'reading', icon: '📚' },
  { id: '4', name: 'listening', icon: '🎧' },
  { id: '3', name: 'writing', icon: '✍️' },
  { id: '1', name: 'speaking', icon: '🎤' }
]
export const setAccessToken = (access_token: string, expires: number) => {
  const isLocal = window.location.hostname === 'localhost'
  setCookie('auth_token', access_token, {
    days: 1000,
    domain: getHostname(location.href),
    SameSite: 'Lax',
    Secure: true
  })
  if (isLocal)
    setCookie('auth_token', access_token, {
      days: Math.floor(expires / 60 / 60 / 24),
      domain: window.location.hostname,
      SameSite: 'Lax',
      Secure: true
    })
}
