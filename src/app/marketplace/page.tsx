'use client'

import { useState } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'

const allProducts: Product[] = [
  {
    id: '1',
    seller_id: '1',
    category_id: '1',
    title: 'Summer Music Festival 2026 - VIP Pass',
    description: 'Get exclusive VIP access to the biggest music festival of the year',
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
    title: 'Handcrafted Leather Bag - Artisan Made',
    description: 'Premium quality leather bag made by local artisans',
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
    id: '3',
    seller_id: '3',
    category_id: '3',
    title: 'Tech Conference 2026 - Early Bird',
    description: 'Join the biggest tech conference with industry leaders',
    price: 499,
    original_price: 699,
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
    stock: 100,
    is_event_ticket: true,
    event_date: '2026-09-20T09:00:00Z',
    event_location: 'San Francisco Convention Center',
    status: 'active',
    views: 2100,
    created_at: '2026-01-03',
    updated_at: '2026-01-03',
    average_rating: 4.7,
  },
  {
    id: '4',
    seller_id: '4',
    category_id: '4',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Premium sound quality with industry-leading noise cancellation',
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
  {
    id: '5',
    seller_id: '5',
    category_id: '1',
    title: 'Comedy Night Live - VIP Seating',
    description: 'Enjoy a night of laughter with top comedians',
    price: 75,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800'],
    stock: 30,
    is_event_ticket: true,
    event_date: '2026-05-10T20:00:00Z',
    event_location: 'The Laugh Factory, LA',
    status: 'active',
    views: 560,
    created_at: '2026-01-05',
    updated_at: '2026-01-05',
    average_rating: 4.5,
  },
  {
    id: '6',
    seller_id: '6',
    category_id: '5',
    title: 'Organic Coffee Beans - Premium Blend',
    description: 'Sustainably sourced, freshly roasted organic coffee',
    price: 29,
    original_price: 39,
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'],
    stock: 200,
    is_event_ticket: false,
    event_date: null,
    event_location: null,
    status: 'active',
    views: 780,
    created_at: '2026-01-06',
    updated_at: '2026-01-06',
    average_rating: 4.8,
  },
  {
    id: '7',
    seller_id: '7',
    category_id: '4',
    title: 'Smart Watch Pro - Titanium',
    description: 'Advanced fitness tracking with titanium build',
    price: 599,
    original_price: 749,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    stock: 40,
    is_event_ticket: false,
    event_date: null,
    event_location: null,
    status: 'active',
    views: 1800,
    created_at: '2026-01-07',
    updated_at: '2026-01-07',
    average_rating: 4.7,
  },
  {
    id: '8',
    seller_id: '8',
    category_id: '2',
    title: 'Artisan Wooden Chair',
    description: 'Hand-carved wooden chair, perfect for any home',
    price: 450,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1503602642458-232111445657?w=800'],
    stock: 15,
    is_event_ticket: false,
    event_date: null,
    event_location: null,
    status: 'active',
    views: 420,
    created_at: '2026-01-08',
    updated_at: '2026-01-08',
    average_rating: 4.9,
  },
]

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

  const filteredProducts = allProducts.filter((product) => {
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

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}