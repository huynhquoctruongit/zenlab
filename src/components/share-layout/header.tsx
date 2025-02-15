import { Button } from '../ui/button'
import Menu from './menu'

export const Header = () => {
  return (
    <div className='py-2 bg-white w-full sticky top-0 z-10 bg-white/50 backdrop-blur-sm'>
      <div className='max-w-[1400px] px-6 mx-auto flex justify-between items-center'>
        <p className='font-bold text-2xl text-primary1'>ZenLab</p>
        <div className='flex items-center gap-4'>
          <Menu />
          <Button className='ml-5'>Đăng nhập</Button>
        </div>
      </div>
    </div>
  )
}
