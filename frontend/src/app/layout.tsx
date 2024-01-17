
import UserContextProvider from './_contexts/_user_context'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recepie khazana',
  description: 'Dive into the world of recepies',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
        {children}

        </UserContextProvider>
        
        </body>
    </html>
  )
}
