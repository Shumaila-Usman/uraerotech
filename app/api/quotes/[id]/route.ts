import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fileDb } from '@/lib/file-db'
import { QuoteStatus } from '@/types/file-db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { status, adminNotes } = body

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const quote = fileDb.update('Quote', { id: params.id }, {
      status: status as QuoteStatus,
      adminNotes: adminNotes || null,
    })

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, quote })
  } catch (error: any) {
    console.error('Quote update error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update quote' },
      { status: 500 }
    )
  }
}






