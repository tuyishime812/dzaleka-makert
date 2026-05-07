'use client'

import { useState, useEffect } from 'react'
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react'
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
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'home', label: 'Home & Living' },
  { value: 'sports', label: 'Sports' },
  { value: 'art', label: 'Art & Culture' },
  { value: 'food', label: 'Food & Drink' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_event_ticket', false)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      
      if (data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Marketplace
          </h1>
          <p className="text-[#94a3b8] text-lg">
            Discover unique products from verified sellers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-48"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-48"
            />
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
          <div className="hidden lg:flex gap-1 bg-[#1a1a2e] p-1 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="p-4 mb-8 lg:hidden">
            <h3 className="font-semibold text-white mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#94a3b8] mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>
              <div>
                <label className="text-sm text-[#94a3b8] mb-2 block">Rating</label>
                <div className="flex flex-wrap gap-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <Badge key={rating} variant="default" className="cursor-pointer hover:bg-[#e94560]">
                      {rating}+ Stars
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="accent">All Products</Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            Free Shipping
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            New Arrivals
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            Best Sellers
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            On Sale
          </Badge>
        </div>

        {loading ? (
          <div className="text-center text-[#94a3b8] py-12">Loading products...</div>
        ) : (
          <>
            <div className="mb-4 text-[#94a3b8]">
              Showing {filteredProducts.length} products
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  No products found
                </h3>
                <p className="text-[#94a3b8] mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setCategory('')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}
