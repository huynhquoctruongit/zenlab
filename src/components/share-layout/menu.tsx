const menuList = [
  {
    title: 'Home',
    url: '/',
    icon: 'home'
  },
  {
    title: 'Khoá học',
    url: '/courses',
    icon: 'courses'
  },
  {
    title: 'Về Zenlab',
    url: '/about',
    icon: 'about'
  }
]
const Menu = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      {menuList.map((menu, index) => (
        <div key={index} className="text-sm hover:text-primary1">
          <a href={menu.url}>{menu.title}</a>
        </div>
      ))}
    </div>
  )
}
export default Menu
