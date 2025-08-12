'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Minty List
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className="btn-hover text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="btn-hover text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
          
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-ring"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Bars3Icon className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${open ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <XMarkIcon className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl`}>
        <div className="px-4 py-4 space-y-3 animate-fade-in-up">
          {session ? (
            <>
              <Link 
                onClick={() => setOpen(false)} 
                href="/dashboard" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { setOpen(false); signOut() }} 
                className="w-full text-left text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-2 rounded-lg shadow-sm transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                onClick={() => setOpen(false)} 
                href="/auth/signin" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link 
                onClick={() => setOpen(false)} 
                href="/auth/signup" 
                className="block text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-3 py-2 rounded-lg shadow-sm transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
