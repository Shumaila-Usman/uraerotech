import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fileDb } from '@/lib/file-db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, quantity = 1 } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const product = fileDb.findUnique<any>('Product', { id: productId })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 })
    }

    // Create order directly (no payment processing)
    const order = fileDb.create('Order', {
      userId: session.user.id,
      status: 'PENDING',
      total: product.price * quantity,
    })

    // Create order item
    fileDb.create('OrderItem', {
      orderId: order.id,
      productId: product.id,
      quantity,
      price: product.price,
    })

    // Update product stock
    fileDb.update('Product', { id: productId }, {
      stock: product.stock - quantity,
    })

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      message: 'Order created successfully'
    })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}






