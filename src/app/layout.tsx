import type { Metadata } from 'next'
import { MuseoModerno } from 'next/font/google'
import './globals.css'
import LayoutCommon from '@/components/layouts'

const MuseoModernoFont: any = MuseoModerno({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--MuseoModerno'
})
export const metadata: Metadata = {
  title: 'Zenlab - Practice IELTS Online',
  description: 'Free IELTS practice platform'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${MuseoModernoFont.className}`}>
        <LayoutCommon>{children}</LayoutCommon>
      </body>
    </html>
  )
}
