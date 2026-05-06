'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'

const searchResults: Product[] = [
  {
    id: '1',
    seller_id: '1',
    category_id: '1',
    title: 'Summer Music Festival 2026 - VIP Pass',
    description: 'Get exclusive VIP access to the biggest music festival',
    price: 299,
    original_price: 399,
    images: ['https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'],
    stock: 50,
    is_event_ticket: true,
    event_date: '2026-07-15T18:00:00Z',
    event_location: 'Central Park, New York',
    status: 'active',
    views: 1250,
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
    average_rating: 4.8,
  },
  {
    id: '2',
    seller_id: '2',
    category_id: '2',
    title: 'Handcrafted Leather Bag',
    description: 'Premium quality leather bag',
    price: 189,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
    stock: 25,
    is_event_ticket: false,
    event_date: null,
    event_location: null,
    status: 'active',
    views: 890,
    created_at: '2026-01-02',
    updated_at: '2026-01-02',
    average_rating: 4.9,
  },
  {
    id: '4',
    seller_id: '4',
    category_id: '4',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Premium sound quality',
    price: 349,
    original_price: 449,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
    stock: 75,
    is_event_ticket: false,
    event_date: null,
    event_location: null,
    status: 'active',
    views: 3200,
    created_at: '2026-01-04',
    updated_at: '2026-01-04',
    average_rating: 4.6,
  },
]

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

interface SearchParams {
  q?: string
  category?: string
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const [searchQuery, setSearchQuery] = useState(searchParams.q || '')
  const [category, setCategory] = useState(searchParams.category || '')
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
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
  }

  const hasFilters = category || sortBy !== 'relevance' || priceRange.min || priceRange.max || selectedRatings.length > 0

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <p className="text-[#94a3b8] mb-6">
          {searchResults.length} results for &quot;{searchQuery || 'all products'}&quot;
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {searchResults.length === 0 && (
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

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}