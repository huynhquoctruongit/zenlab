const footerMenus = {
  about: {
    title: 'Về ZenLab',
    description: 'Nền tảng học và luyện thi IELTS hoàn toàn miễn phí, cung cấp đầy đủ tài liệu, bài tập thực hành và đề thi thử, giúp bạn nâng cao kỹ năng nghe, nói, đọc, viết. Với lộ trình học thông minh và các công cụ hỗ trợ cá nhân hóa, bạn có thể dễ dàng đạt được mục tiêu điểm số mong muốn.'
  },
  courses: {
    title: 'Khoá học',
    items: [
      {
        label: 'Reading',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      },
      {
        label: 'Listening',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
      },
      {
        label: 'Writing',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3.08"/><path d="M14 3v5h5"/><path d="M18 19c0-2.21-3.58-4-8-4s-8 1.79-8 4"/></svg>
      },
      {
        label: 'Speaking',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      }
    ]
  },
  links: {
    title: 'Liên kết',
    items: [
      {
        label: 'Trang chủ',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      },
      {
        label: 'Về chúng tôi',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      },
      {
        label: 'Blog',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      },
      {
        label: 'Liên hệ',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      }
    ]
  },
  contact: {
    title: 'Liên hệ',
    items: [
      {
        label: 'Email: contact@zenlab.edu.vn',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      },
      {
        label: 'Điện thoại: (84) 123-456-789',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      },
      {
        label: 'Địa chỉ: Hà Nội, Việt Nam',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      }
    ]
  }
}

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white via-[#e1e3f4] to-[#e1e3f4] backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 mr-12">
            <h3 className="text-xl font-semibold mb-4 text-primary1">{footerMenus.about.title}</h3>
            <p className="text-[12px] font-light text-gray-600 leading-relaxed">
              {footerMenus.about.description}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-primary1">{footerMenus.courses.title}</h3>
            <ul className="space-y-2">
              {footerMenus.courses.items.map((item, index) => (
                <li key={index} className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 cursor-pointer">
                  <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="text-[12px] font-light">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-primary1">{footerMenus.links.title}</h3>
            <ul className="space-y-2">
              {footerMenus.links.items.map((item, index) => (
                <li key={index} className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 cursor-pointer">
                  <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="text-[12px] font-light">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xl font-semibold mb-4 text-primary1">{footerMenus.contact.title}</h3>
            <ul className="space-y-2">
              {footerMenus.contact.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <span>{item.icon}</span>
                  <span className="text-[12px] font-light">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-[12px] font-light text-gray-500">&copy; {new Date().getFullYear()} ZenLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
