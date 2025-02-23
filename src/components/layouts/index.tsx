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
        <div className='flex flex-col h-screen-mobile md:h-screen'>
          <Header />
          
          <div className='flex-1 h-full relative overflow-auto'>{children}</div>
          {/* <Footer /> */}
        </div>
      </SWRConfig>
    </Suspense>
  )
}

export default LayoutCommon
