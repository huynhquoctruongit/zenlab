'use client'
import { Header, Footer } from '@/components/share-layout/index'
import { fetcherClient } from '@/lib/api/axios-client'
import { Suspense } from 'react'
import { SWRConfig } from 'swr'
import { LoginByGoogle } from '../auth/login'
import { useAuth } from '@/hook/use-auth'

const LayoutCommon = ({ children }: any) => {
  const { isLogin, profile } = useAuth({ revalidateOnMount: true })

  const clientId =
    '202303269429-fr27lpl45abhbjdcl9s3h8sguhlejdpn.apps.googleusercontent.com'

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
        <div className='relative'>
          <Header />
          {/* <LoginByGoogle /> */}
          <div className='relative z-[1] w-full'>{children}</div>
          {/* <Footer /> */}
        </div>
      </SWRConfig>
    </Suspense>
  )
}

export default LayoutCommon
