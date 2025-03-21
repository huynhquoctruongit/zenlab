'use client'
import { Header, Footer } from '@/components/share-layout/index'
import { fetcherClient } from '@/lib/api/axios-client'
import { Suspense } from 'react'
import { SWRConfig } from 'swr'
import { LoginByGoogle } from '../auth/login'
import { useAuth } from '@/hook/use-auth'

const LayoutCommon = ({ children }: any) => {
  const { isLogin, profile } = useAuth({ revalidateOnMount: true })

  return (
    <Suspense fallback={<div></div>}>
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          fetcher: fetcherClient,
          errorRetryCount: 3
        }}
      >
        {/* <Header /> */}
        <div className='flex-1 min-h-[calc(100vh-66px)] relative'>{children}</div>
        {/* <Footer /> */}
      </SWRConfig>
    </Suspense>
  )
}

export default LayoutCommon
