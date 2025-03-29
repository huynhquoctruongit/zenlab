import { usePathname, useRouter } from 'next/navigation'

const footerMenus = {
  about: {
    title: 'Về ZenLab',
    image: '/images/zenlab-logo.svg'
  }
}

export const Footer = () => {
  const pathname: any = usePathname()
  const pathNames = ['/practice', '/result', '/courses', '/teacher']
  if (pathNames.some(path => pathname?.includes(path))) return null

  return (
    <footer className='bg-gradient-to-b from-white via-[#e1e3f4] to-[#e1e3f4] backdrop-blur-md'>
      <div className='max-w-[1440px] mx-auto px-6 py-12 flex flex-col items-center justify-center'>
        <img
          src={footerMenus.about.image}
          alt='logo'
          className='w-[250px] md:w-[550px] mx-auto md:mx-0 translate-x-0 md:-translate-x-5'
        />
        <div className='border-t border-gray-200 mt-12 pt-8 text-center'>
          <p className='text-[12px] font-light text-gray-500'>
            &copy; {new Date().getFullYear()} ZenLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
