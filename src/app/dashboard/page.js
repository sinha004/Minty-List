'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/Navbar'
import NoteCard from '@/components/NoteCard'
import Modal from '@/components/Modal'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchNotes()
    }
  }, [session])

  const fetchNotes = async (search = '') => {
    try {
      const url = search ? `/api/notes?search=${encodeURIComponent(search)}` : '/api/notes'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setNotes(data)
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    fetchNotes(value)
  }

  const openModal = (note = null) => {
    setEditingNote(note)
    setTitle(note ? note.title : '')
    setContent(note ? note.content : '')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  const handleSave = async () => {
    try {
      const method = editingNote ? 'PUT' : 'POST'
      const url = editingNote ? `/api/notes/${editingNote._id}` : '/api/notes'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })

      if (response.ok) {
        fetchNotes(searchTerm)
        closeModal()
      }
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  const handleDelete = async (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`/api/notes/${noteId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          fetchNotes(searchTerm)
        }
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome back, {session.user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have {notes.length} {notes.length === 1 ? 'note' : 'notes'} in your collection
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex-1 relative group">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => openModal()}
              className="btn-hover inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-600/30 animate-pulse-glow"
            >
              <PlusIcon className="h-5 w-5" />
              New Note
            </button>
          </div>

          {/* Notes Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6 animate-pulse">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer w-3/4"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-2/3"></div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full mb-6">
                <PlusIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {searchTerm ? 'No notes found' : 'Start your note collection'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `No notes match "${searchTerm}". Try a different search term.`
                  : 'Create your first note and start organizing your thoughts beautifully.'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => openModal()}
                  className="btn-hover inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-medium shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create your first note
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {notes.map((note, index) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  index={index}
                  onEdit={openModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <Modal
          title={editingNote ? 'Edit Note' : 'Create New Note'}
          onClose={closeModal}
          footer={(
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus-ring"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!title || !content}
                className="btn-hover px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium shadow-lg transition-all duration-200 focus-ring"
              >
                {editingNote ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          )}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                placeholder="Give your note a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                placeholder="Start writing your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[180px] transition-all duration-200"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
