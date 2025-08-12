'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setMounted(true)
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    
    setTheme(initialTheme)
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('theme', nextTheme)
  }

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-200 animate-pulse" />
    )
  }

  return (
    <button
      onClick={toggle}
      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm focus-ring"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <SunIcon 
          className={`absolute inset-0 h-5 w-5 text-yellow-500 transition-all duration-300 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-0'
          }`} 
        />
        <MoonIcon 
          className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-300 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-0'
          }`} 
        />
      </div>
    </button>
  )
}
