'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { createBrowserClient } from '@/lib/supabase'

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'events', label: 'Events' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'home', label: 'Home & Living' },
  { value: 'sports', label: 'Sports' },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  const PAGE_SIZE = 12

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      const supabase = createBrowserClient()
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
      
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`)
      }
      
      if (category === 'events') {
        query = query.eq('is_event_ticket', true)
      } else if (category) {
        query = query.eq('category_id', category)
      }

      const { data } = await query.order('created_at', { ascending: false })
      
      if (data) setResults(data)
      setLoading(false)
    }

    fetchResults()
  }, [searchQuery, category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (category) params.set('category', category)
    
    const url = `/search?${params.toString()}`
    window.history.pushState({}, '', url)
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings(
      selectedRatings.includes(rating)
        ? selectedRatings.filter((r) => r !== rating)
        : [...selectedRatings, rating]
    )
  }

  const clearFilters = () => {
    setCategory('')
    setSortBy('relevance')
    setPriceRange({ min: '', max: '' })
    setSelectedRatings([])
    setSearchQuery('')
    window.history.pushState({}, '', '/search')
  }

  const hasFilters = category || sortBy !== 'relevance' || priceRange.min || priceRange.max || selectedRatings.length > 0
  const displayedResults = results.slice(0, visibleCount)

  return (
    <>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products, events, sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              className="text-lg py-3"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Select
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-40"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-40"
        />
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <Card className="p-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-sm text-[#94a3b8] mb-2 block">Price Range</label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-24"
              />
              <span className="text-[#94a3b8]">-</span>
              <Input
                placeholder="Max"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-24"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-[#94a3b8] mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedRatings.includes(rating)
                      ? 'bg-[#e94560] border-[#e94560] text-white'
                      : 'border-[#2d2d44] text-[#94a3b8] hover:border-[#e94560]'
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="accent">Results</Badge>
        <Badge variant="default">Free Shipping</Badge>
        <Badge variant="default">On Sale</Badge>
        <Badge variant="default">New Arrivals</Badge>
      </div>

      {loading ? (
        <div className="text-center text-[#94a3b8] py-12">Searching...</div>
      ) : (
        <>
          <p className="text-[#94a3b8] mb-6">
            {results.length} results for &quot;{searchQuery || 'all products'}&quot;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                No results found
              </h3>
              <p className="text-[#94a3b8] mb-6">
                Try different keywords or filters
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </>
      )}

      {displayedResults.length < results.length && (
        <div className="flex justify-center mt-12">
          <Button variant="outline" onClick={() => setVisibleCount(v => v + PAGE_SIZE)}>
            Load More ({results.length - displayedResults.length} remaining)
          </Button>
        </div>
      )}
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center text-[#94a3b8] py-12">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}
