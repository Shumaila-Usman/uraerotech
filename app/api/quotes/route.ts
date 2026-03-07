import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fileDb } from '@/lib/file-db'
import { quoteRequestSchema } from '@/utils/validation'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    const validated = quoteRequestSchema.parse(body)

    const quote = fileDb.create('Quote', {
      ...validated,
      userId: session?.user?.id || null,
      status: 'PENDING',
    })

    return NextResponse.json({ success: true, quote }, { status: 201 })
  } catch (error: any) {
    console.error('Quote creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create quote' },
      { status: 400 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allQuotes = fileDb.findMany<any>('Quote')
    const allUsers = fileDb.findMany<any>('User')

    // Only admins can see all quotes
    if (session.user.role !== 'ADMIN') {
      const quotes = allQuotes
        .filter((q: any) => q.userId === session.user.id)
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return NextResponse.json({ quotes })
    }

    // For admins, include user info
    const quotes = allQuotes
      .map((quote: any) => {
        const user = quote.userId ? allUsers.find((u: any) => u.id === quote.userId) : null
        return { ...quote, user }
      })
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ quotes })
  } catch (error: any) {
    console.error('Quote fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}






