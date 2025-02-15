import { ArrowRight } from 'lucide-react'

const listCourses = [
  {
    title: 'Reading',
    description:
      'Khóa học giúp bạn cải thiện kỹ năng đọc hiểu qua việc luyện tập với các bài đọc đa dạng, nắm bắt ý chính, chi tiết và mở rộng vốn từ vựng.',
    color:
      'radial-gradient(218.93% 138.81% at 100% 98.77%,#0029ff 0,#1479f3 50%,#47b7f7 100%)'
  },
  {
    title: 'Listening',
    description:
      'Phát triển kỹ năng nghe qua các bài hội thoại, thông báo và bài giảng, giúp bạn nghe hiểu chi tiết và nắm bắt thông tin chính xác hơn.',
    color: 'radial-gradient(99.48% 132.1% at 2.5% 100%,#002ea6 0,#0047ff 100%)'
  },
  {
    title: 'Writing',
    description:
      'Học cách viết rõ ràng, mạch lạc và có tổ chức thông qua việc luyện tập viết câu, đoạn văn và bài luận, diễn đạt ý tưởng một cách logic và hiệu quả.',
    color: 'linear-gradient(46deg,#007e26,#00d741)'
  },
  {
    title: 'Speaking',
    description:
      'Tập trung vào việc phát âm đúng, luyện ngữ điệu và thực hành đối thoại để nâng cao sự tự tin khi giao tiếp lưu loát trong các tình huống hàng ngày.',
    color: 'linear-gradient(219deg,#ffd324 4.72%,#ff9f00 95.59%)'
  }
]
const Courses = () => {
  return (
    <div className='relative'>
      <div className='rounded-t-[50px] w-full bg-[#f5f5f7] bg-[url(/images/background.png)] bg-cover absolute -top-10 py-6'>
        <div className='max-w-[1440px] px-6 mx-auto my-6'>
          <h1 className='text-primary1 text-3xl my-6'>CÁC KHOÁ HỌC</h1>
          <div className='grid grid-cols-4 gap-4 mt-4'>
            {listCourses.map((course, index) => (
              <div
                style={{ background: course.color }}
                key={index}
                className='card shadow-md hover:shadow-lg rounded-[50px] h-[300px] backdrop-blur-md'
              >
                <div className='p-4'>
                  <p className='text-white text-[2rem] font-semibold mt-4'>
                    {course.title}
                  </p>
                  <p className='text-white text-sm mt-2'>
                    {course.description}
                  </p>
                </div>
                <div className='bg-white rounded-full p-10 shadow-lg absolute -bottom-2 -right-2'>
                  <ArrowRight size={30} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Courses
