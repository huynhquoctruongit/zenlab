import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { fetcherClient } from './api/axios-client'
import { NEXT_PUBLIC_CMS } from '@/services/helpers'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currency = (price: number) => {
  if (!price) return 0
  return new Intl.NumberFormat().format(price)
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const createImage = (id: string, width?: number) => {
  if (!id) return ''
  if (id.includes('http')) return id + (width ? '?width=' + width : '')
  const domain = NEXT_PUBLIC_CMS
  return domain + '/assets/' + id + (width ? '?width=' + width : '')
}

export const configSWR = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  fetcher: fetcherClient,
  errorRetryCount: 3
}
export function validatePhoneNumber (phoneNumber: any) {
  const regex = /^((\+84|0|84)[3|5|7|8|9]\d{8}$|(\+84|0|84)2\d{1,2}\d{7})$/
  return regex.test(phoneNumber)
}
export function maskPhoneNumber (phoneNumber: any) {
  if (!phoneNumber) return
  return phoneNumber?.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')
}
export function isNumber (value: any) {
  return typeof value === 'number' && !isNaN(value)
}
export function fullName (user: any) {
  return user?.first_name + ' ' + user?.last_name
}
