'use client'

import { useState } from 'react'
import { Search, Calendar, MapPin, Filter } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'

const allEvents: Product[] = [
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
    id: '9',
    seller_id: '9',
    category_id: '1',
    title: 'Jazz Night Under the Stars',
    description: 'An enchanting evening of smooth jazz music',
    price: 89,
    original_price: 129,
    images: ['https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800'],
    stock: 80,
    is_event_ticket: true,
    event_date: '2026-06-20T19:00:00Z',
    event_location: 'Rooftop Gardens, Chicago',
    status: 'active',
    views: 340,
    created_at: '2026-01-09',
    updated_at: '2026-01-09',
    average_rating: 4.9,
  },
  {
    id: '10',
    seller_id: '10',
    category_id: '2',
    title: 'Championship Game - Finals',
    description: 'Watch the ultimate showdown live',
    price: 150,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1461896836934- voices-of-the-crowd?w=800'],
    stock: 200,
    is_event_ticket: true,
    event_date: '2026-08-05T15:00:00Z',
    event_location: 'National Stadium',
    status: 'active',
    views: 1800,
    created_at: '2026-01-10',
    updated_at: '2026-01-10',
    average_rating: 4.8,
  },
  {
    id: '11',
    seller_id: '11',
    category_id: '3',
    title: 'International Food Festival',
    description: 'Taste cuisines from around the world',
    price: 35,
    original_price: null,
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'],
    stock: 500,
    is_event_ticket: true,
    event_date: '2026-07-01T10:00:00Z',
    event_location: 'Convention Center, Miami',
    status: 'active',
    views: 920,
    created_at: '2026-01-11',
    updated_at: '2026-01-11',
    average_rating: 4.6,
  },
]

const eventCategories = [
  { value: '', label: 'All Events' },
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'tech', label: 'Tech' },
  { value: 'food', label: 'Food & Drink' },
  { value: 'art', label: 'Art & Culture' },
]

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
]

const months = [
  'All Months',
  'May 2026',
  'June 2026',
  'July 2026',
  'August 2026',
  'September 2026',
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [selectedMonth, setSelectedMonth] = useState('')

  const filteredEvents = allEvents.filter((event) => {
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-[#e94560]" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Events
            </h1>
          </div>
          <p className="text-[#94a3b8] text-lg">
            Find tickets to concerts, sports, theater, and more
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select
              options={eventCategories}
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
            <Select
              options={months.map((m, i) => ({ value: i.toString(), label: m }))}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-40"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="accent">All Events</Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            Today
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            This Weekend
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            Free
          </Badge>
          <Badge variant="default" className="cursor-pointer hover:bg-[#e94560]">
            VIP
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <ProductCard key={event.id} product={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="font-heading text-xl font-semibold text-white mb-2">
              No events found
            </h3>
            <p className="text-[#94a3b8] mb-6">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => setSearchQuery('')}>Clear Filters</Button>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More Events</Button>
        </div>
      </div>
    </div>
  )
}