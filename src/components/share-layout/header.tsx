'use client'
import { useAuth } from '@/hook/use-auth'
import { LoginByGoogle } from '../auth/login'
import { UserRound } from 'lucide-react'
import { fullName } from '@/lib/utils'
import Menu from './menu'
import Link from 'next/link'

export const Header = () => {
  const { profile, logout }: any = useAuth()

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
          {!profile?.id && <LoginByGoogle />}
        </div>
      </div>
    </div>
  )
}

export const UserInfo = ({ profile, logout }: any) => {
  return (
    <div className='bg-primary1 p-2 rounded-full text-white cursor-pointer shadow-lg relative group'>
      <UserRound />
      <div className='absolute -bottom-full text-black right-1 w-full h-full group-hover:block hidden min-w-[300px]'>
        <div className='bg-white rounded-md p-3 border shadow-md text-left w-full'>
          <div className='flex items-center gap-2'>
            <div className='bg-primary1 p-2 rounded-full text-white cursor-pointer shadow-lg relative group'>
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
            onClick={() => logout()}
            className='mt-4 text-center hover:bg-gray-300 bg-gray-200 p-2 rounded-md'
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}
