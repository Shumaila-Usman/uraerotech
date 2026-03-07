import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { fileDb } from '@/lib/file-db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = fileDb.findUnique<any>('Product', { slug: params.slug })
  const allCategories = fileDb.findMany<any>('Category')

  if (!product) {
    return {
      title: 'Product Not Found - UR Aerotech',
    }
  }

  const category = allCategories.find((c: any) => c.id === product.categoryId)

  return {
    title: `${product.name} - UR Aerotech`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = fileDb.findUnique<any>('Product', { slug: params.slug })
  const allCategories = fileDb.findMany<any>('Category')

  if (!product) {
    notFound()
  }

  const category = allCategories.find((c: any) => c.id === product.categoryId)
  const productWithCategory = { ...product, category: category || null }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="text-blue-400 hover:text-blue-300 transition-colors mb-4 sm:mb-6 inline-block text-sm sm:text-base"
          >
            ← Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Images */}
            <ScrollAnimation animation="slideLeft" delay={0}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                <div className="aspect-square relative">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-aviation/20">
                      <svg className="w-24 h-24 sm:w-32 sm:h-32 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>

            {/* Details */}
            <ScrollAnimation animation="slideRight" delay={100}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8">
              {productWithCategory.category && (
                <p className="text-blue-400 text-xs sm:text-sm mb-2">{productWithCategory.category.name}</p>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">{productWithCategory.name}</h1>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-white/70 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base md:text-lg">{productWithCategory.description}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${productWithCategory.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {productWithCategory.stock > 0 ? `In Stock (${productWithCategory.stock})` : 'Out of Stock'}
                  </span>
                  {productWithCategory.isFeatured && (
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs sm:text-sm">
                      Featured Product
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href="/quote"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold text-sm sm:text-base"
                >
                  Request a Quote
                </Link>
              </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

