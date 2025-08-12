import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Minty List - Your Note Taking App',
  description: 'A simple and elegant note taking application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
