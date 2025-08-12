import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In Next.js 15 dynamic route params must be awaited
    const { id } = await params
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid note id' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const notes = client.db().collection('notes')

    const result = await notes.updateOne(
      { 
        _id: new ObjectId(id),
        userId: session.user.email 
      },
      {
        $set: {
          title,
          content,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Note updated successfully' })
  } catch (error) {
    console.error('Update note error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid note id' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const notes = client.db().collection('notes')

    const result = await notes.deleteOne({
      _id: new ObjectId(id),
      userId: session.user.email
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error('Delete note error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
