import { z } from 'zod'

export const quoteRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.enum(['Service', 'Product']),
  itemId: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  isFeatured: z.boolean().default(false),
})

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>
export type ProductInput = z.infer<typeof productSchema>






