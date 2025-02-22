import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import LayoutCommon from '@/components/layouts'

const Be_Vietnam_Pro_Font: any = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--Be_Vietnam_Pro_Font'
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
      <body className={`${Be_Vietnam_Pro_Font.className}`}>
        <LayoutCommon>{children}</LayoutCommon>
      </body>
    </html>
  )
}
