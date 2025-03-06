export const Loading: any = () => {
  return (
    <div className='m-auto flex justify-center items-center w-full h-screen'>
      <img
        src='/images/logo/logo.png'
        alt='logo'
        className='w-20 animate-[fadeInOut_2s_ease-in-out_infinite] motion-safe:animate-[swing_1s_ease-in-out_infinite]'
      />
    </div>
  )
}
