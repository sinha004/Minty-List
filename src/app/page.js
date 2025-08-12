'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-overlay filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Navbar />
      <main className="flex-1 flex items-center relative z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left text-white animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                <span className="block">Capture,</span>
                <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Organize,</span>
                <span className="block">and Rediscover</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-white/90">Your Ideas</span>
              </h1>
              <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Minty List keeps your thoughts fresh and accessible. Create notes instantly, search lightning-fast, and stay organized across all your devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <Link
                  href="/auth/signup"
                  className="btn-hover inline-flex justify-center items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/auth/signin"
                  className="btn-hover inline-flex justify-center items-center border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="glass rounded-3xl p-6 text-white shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-lg font-semibold mb-3">Effortless Notes</h3>
                <p className="text-sm leading-relaxed opacity-90">Streamlined editor with zero clutter so you can focus completely on your thoughts.</p>
              </div>
              
              <div className="glass rounded-3xl p-6 text-white shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '100ms' }}>
                <div className="text-3xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-3">Instant Search</h3>
                <p className="text-sm leading-relaxed opacity-90">Blazing fast search through all your notes by title or content.</p>
              </div>
              
              <div className="glass rounded-3xl p-6 text-white shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '200ms' }}>
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-lg font-semibold mb-3">Fully Responsive</h3>
                <p className="text-sm leading-relaxed opacity-90">Enjoy a seamless experience on desktop, tablet, or mobile devices.</p>
              </div>
              
              <div className="glass rounded-3xl p-6 text-white shadow-2xl ring-1 ring-white/20 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '300ms' }}>
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-3">Fast & Secure</h3>
                <p className="text-sm leading-relaxed opacity-90">Built with modern technologies for speed, reliability, and security.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-white/70 text-sm relative z-10 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <p>© {new Date().getFullYear()} Minty List. All rights reserved.</p>
      </footer>
    </div>
  )
}
