import Link from 'next/link'
import { Button } from '../ui/button'

const Banner = () => {
  return (
    <div className='w-full bg-gradient-to-r from-[#EDF6F1] via-[#E1E3F4] to-[#E1E3F4] backdrop-blur-md'>
      <div className='max-w-[80%] mx-auto py-8 flex '>
        <div className='w-[60%] m-auto'>
          <div className='md:leading-[70px]'>
            <p className='md:text-[4rem] font-bold text-primary1'>
              Nền tảng <span className='text-[#1b588a]'>Học</span>
            </p>
            <p className='md:text-[4rem] font-bold text-primary1'>
              và <span className='text-[#1b588a]'>Luyện thi IELTS</span>{' '}
              <span className='underline'>miễn phí</span>
            </p>
          </div>
          <Link href='/practice/reading/234'><Button className='mt-6' size={"lg"}>Tham gia ngay</Button></Link>
        </div>
        <div className='w-[40%]'>
          <img className='w-full' src='/images/flat-images/relaxed.png' />
        </div>
      </div>
    </div>
  )
}
export default Banner
