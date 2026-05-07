'use client'

import { useState, useEffect } from 'react'
import { Search, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { createBrowserClient } from '@/lib/supabase'

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

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [events, setEvents] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_event_ticket', true)
        .eq('status', 'active')
        .order('event_date', { ascending: true })
      
      if (data) setEvents(data)
      setLoading(false)
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
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

        {loading ? (
          <div className="text-center text-[#94a3b8] py-12">Loading events...</div>
        ) : (
          <>
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
          </>
        )}

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More Events</Button>
        </div>
      </div>
    </div>
  )
}
