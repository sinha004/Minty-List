'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

export default function Modal({ title, children, onClose, footer }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-ring"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
