// Type definitions for file-based database

export type UserRole = 'ADMIN' | 'B2B' | 'B2C'

export type QuoteStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface User {
  id: string
  name?: string | null
  email: string
  emailVerified?: string | null
  image?: string | null
  role: UserRole
  password?: string | null
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  price: number
  stock: number
  images: string[]
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface Quote {
  id: string
  userId?: string | null
  name: string
  email: string
  phone?: string | null
  company?: string | null
  serviceType: string
  itemId?: string | null
  message: string
  status: QuoteStatus
  adminNotes?: string | null
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  total: number
  shippingAddress?: string | null
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}


