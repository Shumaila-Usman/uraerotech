import { UserRole, QuoteStatus, OrderStatus } from '@prisma/client'

export type { UserRole, QuoteStatus, OrderStatus }

export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
}






