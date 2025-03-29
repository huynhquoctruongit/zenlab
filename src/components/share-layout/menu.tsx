import { useAuth } from '@/hook/use-auth'

let menuList = [
  {
    title: 'Home',
    url: '/',
    icon: 'home'
  },
  {
    title: 'Khoá học',
    url: '/courses',
    icon: 'courses',
    submenu: [
      {
        title: 'Khoá đang học',
        url: '/courses'
      },
      {
        title: 'Khoá đã học',
        url: '/courses'
      }
    ]
  }
]
let menuListTeacher = [
  {
    title: 'Home',
    url: '/',
    icon: 'home'
  },
  {
    title: 'Quản lý khóa học',
    url: '/teacher',
    icon: 'teacher'
  }
]

const Menu = () => {
  const { profile, isLogin }: any = useAuth()
  const isTeacher = profile?.role?.name === 'Teacher'
  menuList = isTeacher ? menuListTeacher : menuList

  return (
    <nav className='md:flex items-center justify-center hidden'>
      {isLogin && menuList.map((menu, index) => (
        <div key={index} className='relative group'>
          <a
            href={menu.url}
            className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary1 transition-colors duration-200'
          >
            <span className='text-sm font-light'>{menu.title}</span>
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
                    className='block px-4 py-2 text-sm font-light text-gray-700 hover:bg-white/50 hover:text-primary1'
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
