'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

export function AddToCartButton({ product }: { product: Product }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href))
      return
    }

    if (product.stock === 0) {
      alert('This product is out of stock')
      return
    }

    setIsLoading(true)
    // TODO: Implement cart functionality
    // For now, redirect to checkout
    router.push(`/checkout?product=${product.id}`)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || product.stock === 0}
      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}





