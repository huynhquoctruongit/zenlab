'use client'
import { useAuth } from '@/hook/use-auth'
import { LoginByGoogle } from '../auth/login'
import { UserRound } from 'lucide-react'
import { fullName } from '@/lib/utils'
import Menu from './menu'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export const Header = () => {
  const { profile, logout }: any = useAuth()
  const pathname: any = usePathname()
  const pathNames = ['/login']
  const isHidden = pathNames.some(path => pathname?.includes(path))

  return (
    <div className='py-2 bg-white w-full sticky top-0 z-50 bg-white/50 backdrop-blur-sm transition-all h-[66px]'>
      <div className='max-w-[1400px] px-6 mx-auto flex justify-between items-center'>
        <Link href='/'>
          <p className='font-bold text-2xl text-primary1'>
            <img
              src='/images/zenlab-logo.svg'
              alt='logo'
              className='w-[150px]'
            />
          </p>
        </Link>
        <div className='flex items-center gap-4'>
          <Menu />
          {profile?.id && <UserInfo profile={profile} logout={logout} />}
          {!profile?.id && !isHidden && <LoginByGoogle />}
        </div>
      </div>
    </div>
  )
}

export const UserInfo = ({ profile, logout }: any) => {
  const router = useRouter()
  const onLogout = () => {
    logout()
    router.push('/')
  }
  return (
    <div className='bg-primary1 p-2 rounded-full text-white cursor-pointer relative group'>
      <UserRound />
      <div className='absolute -bottom-full pt-2 text-black right-1 w-full h-full group-hover:block hidden min-w-[300px]'>
        <div className='bg-white rounded-md p-3 border text-left w-full'>
          <div className='flex items-center gap-2'>
            <div className='bg-primary1 p-2 rounded-full text-white cursor-pointer relative group'>
              <UserRound />
            </div>
            <div className='truncate'>
              <p className='text-sm'>{fullName(profile)}</p>
              <p className='line-clamp-1 font-light text-xs'>
                {profile?.email}
              </p>
            </div>
          </div>
          <div
            onClick={() => onLogout()}
            className='mt-4 text-center hover:bg-primary1 hover:text-white bg-gray-200 p-2 rounded-full'
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  )
}
