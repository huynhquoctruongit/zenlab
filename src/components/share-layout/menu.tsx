import { useAuth } from '@/hook/use-auth'
import { usePathname } from 'next/navigation'

let menuList = [
  {
    title: 'HOME',
    url: '/',
    icon: 'home'
  },
  {
    title: 'KHOÁ HỌC',
    url: '/courses',
    icon: 'courses',
    submenu: [
      {
        title: 'KHOÁ ĐANG HỌC',
        url: '/courses'
      },
      {
        title: 'KHOÁ ĐÃ HỌC',
        url: '/courses'
      }
    ]
  }
]
let menuListTeacher = [
  {
    title: 'HOME',
    url: '/',
    icon: 'home'
  },
  {
    title: 'QUẢN LÝ BÀI TẬP',
    url: '/teacher',
    icon: 'teacher'
  }
]

const Menu = () => {
  const { profile, isLogin }: any = useAuth()
  const isTeacher = profile?.role?.name === 'Teacher'
  const pathname = usePathname()
  menuList = isTeacher ? menuListTeacher : menuList

  return (
    <nav className='md:flex items-center justify-center hidden'>
      {isLogin && menuList.map((menu, index) => (
        <div key={index} className='relative group'>
          <a
            href={menu.url}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-200 ${
              pathname === menu.url ? 'text-primary1' : 'text-gray-700 hover:text-primary1'
            }`}
          >
            <span className='text-sm font-medium'>{menu.title}</span>
            {menu.submenu && (
              <svg
                className='w-4 h-4 transition-transform duration-200 group-hover:rotate-180'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            )}
          </a>

          {menu.submenu && (
            <div className='absolute left-0 z-10 w-48 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
              <div className='py-2 bg-white rounded-lg shadow-xl border border-gray-100/50'>
                {menu.submenu.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    className={`block px-4 py-2 text-sm font-light hover:bg-white/50 hover:text-primary1 ${
                      pathname === item.url ? 'text-primary1 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Menu
