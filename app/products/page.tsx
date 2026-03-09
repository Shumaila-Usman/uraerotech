import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductFilters } from '@/components/ProductFilters'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import { fileDb } from '@/lib/file-db'
import { getAllCategories } from '@/data/categories'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Products - UR Aerotech',
  description: 'Browse our extensive inventory of aircraft parts, tools, and components',
}

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  let products: any[] = []
  let total = 0
  let dbCategories: any[] = []
  let error: string | null = null
  let selectedCategory: any = null

  try {
    // Fetch all products and categories from file storage
    const allProducts = fileDb.findMany<any>('Product')
    const allCategories = fileDb.findMany<any>('Category')
    
    dbCategories = allCategories.sort((a, b) => a.name.localeCompare(b.name))
    
    // Find selected category if specified
    if (searchParams.category) {
      const categorySlug = decodeURIComponent(searchParams.category)
      selectedCategory = allCategories.find((c: any) => c.slug === categorySlug)
    }
    
    // Filter products by category if specified
    let filteredProducts = allProducts
    if (searchParams.category && selectedCategory) {
      filteredProducts = allProducts.filter((p: any) => p.categoryId === selectedCategory.id)
      console.log(`Filtering by category: ${selectedCategory.name} (${selectedCategory.id}) - Found ${filteredProducts.length} products`)
    }
    
    // Filter by search term if specified
    if (searchParams.search) {
      const searchLower = searchParams.search.toLowerCase()
      filteredProducts = filteredProducts.filter((p: any) => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort by createdAt (newest first)
    filteredProducts.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return dateB - dateA
    })
    
    total = filteredProducts.length
    
    // Paginate
    products = filteredProducts.slice(skip, skip + limit)
    
    // Attach category information to products
    products = products.map((product: any) => {
      const category = allCategories.find((c: any) => c.id === product.categoryId)
      return {
        ...product,
        category: category || null
      }
    })
    
    console.log('✅ Products fetched successfully:', products.length)
    console.log('✅ Total products count:', total)
    console.log('✅ Categories fetched:', dbCategories.length)
  } catch (e: any) {
    error = e?.message || 'Failed to load products'
    console.error('❌ Error loading products:', e)
  }

  const totalPages = Math.ceil(total / limit)
  const allCategories = getAllCategories()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background image for products page */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat products-page-bg"
          style={{
            backgroundImage: "url('/images/products-bg.jpg')",
            backgroundSize: '120% 120%',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollAnimation animation="fadeIn" delay={0}>
            <div className="mb-8 sm:mb-12 text-center px-2">
              {selectedCategory ? (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    {selectedCategory.name}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                    {selectedCategory.description || 'Browse our extensive inventory of high-quality aircraft components and specialized tools.'}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                    Aircraft Parts & Tools
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                    Browse our extensive inventory of high-quality aircraft components and specialized tools.
                  </p>
                </>
              )}
            </div>
          </ScrollAnimation>

          {/* Categories Showcase */}
          {!searchParams.category && (
            <ScrollAnimation animation="slideUp" delay={100}>
              <div className="mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8">Browse by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                  {(dbCategories.length > 0 ? dbCategories : allCategories).map((category: any, index: number) => {
                    // Get icon from static categories if available
                    const staticCategory = allCategories.find(c => c.slug === category.slug)
                    const icon = staticCategory?.icon || '📦'
                    const categoryName = category.name || staticCategory?.name || 'Category'
                    const categoryDescription = category.description || staticCategory?.description || ''
                    const categorySlug = category.slug || staticCategory?.slug || ''
                    
                    if (!categorySlug) return null
                    
                    return (
                      <ScrollAnimation
                        key={category.id || category.slug || index}
                        animation={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
                        delay={index * 50}
                      >
                        <Link
                          href={`/products?category=${encodeURIComponent(categorySlug)}`}
                          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group flex flex-col items-center justify-center min-h-[160px] h-full"
                        >
                          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {icon}
                          </div>
                          <h3 className="text-white font-semibold text-sm md:text-base mb-2 group-hover:text-blue-300 transition-colors">
                            {categoryName}
                          </h3>
                          <p className="text-white/60 text-xs line-clamp-2 leading-relaxed flex-1">
                            {categoryDescription}
                          </p>
                        </Link>
                      </ScrollAnimation>
                    )
                  })}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Filters */}
          <ScrollAnimation animation="fadeIn" delay={200}>
            <ProductFilters
              categories={dbCategories}
              currentCategory={searchParams.category}
              currentSearch={searchParams.search}
            />
          </ScrollAnimation>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {products.map((product, index) => (
              <ScrollAnimation
                key={product.id}
                animation={index % 4 === 0 ? 'slideLeft' : index % 4 === 1 ? 'slideRight' : index % 4 === 2 ? 'slideUp' : 'scale'}
                delay={index * 50}
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden card-hover flex flex-col h-full">
                  <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                    <div className="aspect-square bg-gradient-aviation/20 relative">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col h-full">
                      {product.category && (
                        <p className="text-white/60 text-sm mb-1">{product.category.name}</p>
                      )}
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                      <p className="text-white/70 text-sm mb-3 line-clamp-3 flex-1 min-h-[4.5rem]">{product.description}</p>
                    </div>
                  </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}${searchParams.category ? `&category=${searchParams.category}` : ''}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                  className={`px-4 py-2 rounded-lg ${
                    page === pageNum
                      ? 'bg-gradient-aviation text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  } transition-colors`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12 bg-red-500/10 border border-red-500/30 rounded-xl p-8 mb-8">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-400 text-lg font-semibold mb-2">Error</p>
              <p className="text-white/70 mb-4">{error}</p>
              <div className="mt-6 p-4 bg-black/30 rounded-lg text-left">
                <p className="text-white/90 font-medium mb-2">To fix this:</p>
                <ol className="text-white/70 text-sm space-y-1 list-decimal list-inside">
                  <li>Check if data files exist in <code className="bg-black/50 px-2 py-1 rounded">data/db/</code> directory</li>
                  <li>Run <code className="bg-black/50 px-2 py-1 rounded">npm run db:seed</code> to create sample data</li>
                  <li>Make sure the <code className="bg-black/50 px-2 py-1 rounded">data/db</code> directory is writable</li>
                </ol>
              </div>
            </div>
          )}

          {!error && products.length === 0 && (
            <div className="text-center py-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-white text-xl font-semibold mb-2">No products found</p>
              <p className="text-white/70 mb-6">
                {searchParams.category 
                  ? `No products found in this category.` 
                  : `The product catalog is currently empty. Please seed the database to add sample products.`}
              </p>
              {searchParams.category && (
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all mr-4"
                >
                  View All Products
                </Link>
              )}
              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-left max-w-md mx-auto">
                <p className="text-blue-400 text-sm font-medium mb-3">📦 To add products to your database:</p>
                <div className="space-y-2 text-white/70 text-xs">
                  <p><strong className="text-white">Option 1 (Recommended):</strong> Use the direct MongoDB seed script</p>
                  <code className="block bg-black/50 px-3 py-2 rounded mt-2 text-green-400">npm run db:seed-direct</code>
                  
                  <p className="mt-4 text-yellow-400">⚠️ Data will be stored in <code className="bg-black/50 px-2 py-1 rounded">data/db/</code> directory</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

