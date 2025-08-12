'use client'

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function NoteCard({ note, onEdit, onDelete, index = 0 }) {
  return (
    <div 
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/60 dark:border-gray-700/60 p-6 flex flex-col card-hover animate-fade-in-up focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex justify-between items-start gap-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {note.title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={() => onEdit(note)}
            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus-ring rounded-lg p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
            aria-label="Edit note"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 focus-ring rounded-lg p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            aria-label="Delete note"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 line-clamp-4 mb-4">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3">
        <span className="font-medium">
          {new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: new Date(note.updatedAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
          })}
        </span>
        <div className="w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}
