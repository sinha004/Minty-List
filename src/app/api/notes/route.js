import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const client = await clientPromise
    const notes = client.db().collection('notes')

    let query = { userId: session.user.email }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    const userNotes = await notes
      .find(query)
      .sort({ updatedAt: -1 })
      .toArray()

    return NextResponse.json(userNotes)
  } catch (error) {
    console.error('Get notes error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const notes = client.db().collection('notes')

    const newNote = {
      title,
      content,
      userId: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await notes.insertOne(newNote)

    return NextResponse.json(
      { ...newNote, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create note error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
