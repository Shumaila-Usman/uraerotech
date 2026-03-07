'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>
  currentCategory?: string
  currentSearch?: string
}

export function ProductFilters({ categories, currentCategory, currentSearch }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(currentSearch || '')

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-white/70 text-xs sm:text-sm mb-2">Category</label>
          <select
            value={currentCategory || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1 md:col-span-2">
          <label className="block text-white/70 text-xs sm:text-sm mb-2">Search</label>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-gradient-aviation rounded-lg hover:shadow-glow-blue transition-all text-white font-semibold text-sm sm:text-base"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}






