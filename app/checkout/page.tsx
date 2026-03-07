'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const productId = searchParams.get('product')
  const [isLoading, setIsLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)
    }
  }, [status, router])

  const handleCheckout = async () => {
    if (!productId || !session) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setOrderCreated(true)
        setTimeout(() => {
          router.push('/checkout/success')
        }, 2000)
      } else {
        alert(data.error || 'Failed to create order. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to create order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
            {orderCreated ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white text-lg mb-2">Order Created Successfully!</p>
                <p className="text-white/70">Redirecting to success page...</p>
              </div>
            ) : (
              <>
                <p className="text-white/70 mb-8">
                  Complete your order. Our team will contact you for payment and shipping details.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || !productId}
                  className="w-full px-6 py-3 bg-gradient-aviation rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Complete Order'}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

