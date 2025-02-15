import { Header, Footer } from '@/components/share-layout/index'
import { Suspense } from 'react'

const LayoutCommon = ({ children }: any) => {
  return (
    <Suspense fallback={<div></div>}>
      <div className='relative'>
        <Header />
        <div className='relative z-[1] w-full min-h-screen'>{children}</div>
        <Footer />
      </div>
    </Suspense>
  )
}

export default LayoutCommon
