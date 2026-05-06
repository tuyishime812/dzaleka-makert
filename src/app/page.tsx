'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Ticket, Store, TrendingUp, Shield, Truck, Headphones, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductCard } from '@/components/ui/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { Product } from '@/types'

const featuredProducts: Product[] = [
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
]

const categories = [
  { name: 'Music Events', slug: 'music', icon: '🎵', count: 150 },
  { name: 'Sports', slug: 'sports', icon: '⚽', count: 89 },
  { name: 'Art & Culture', slug: 'art', icon: '🎨', count: 67 },
  { name: 'Electronics', slug: 'electronics', icon: '📱', count: 234 },
  { name: 'Fashion', slug: 'fashion', icon: '👗', count: 178 },
  { name: 'Home & Living', slug: 'home', icon: '🏠', count: 145 },
  { name: 'Food & Drink', slug: 'food', icon: '🍕', count: 92 },
  { name: 'Books & Education', slug: 'books', icon: '📚', count: 56 },
]

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Protected transactions with escrow services',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping options',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance',
  },
  {
    icon: TrendingUp,
    title: 'Seller Tools',
    description: 'Powerful tools to grow your business',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e94560] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">
              Your Trusted Marketplace
            </Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover Amazing{' '}
              <span className="text-[#e94560]">Events</span> &{' '}
              <span className="text-[#e94560]">Products</span>
            </h1>
            <p className="text-xl text-[#94a3b8] mb-8 animate-fade-in stagger-1">
              The premier destination for event tickets and unique marketplace items.
              Connect with sellers, discover new experiences, and shop with confidence.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in stagger-2">
              <Link href="/marketplace">
                <Button size="lg" className="group">
                  Browse Marketplace
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" size="lg">
                  <Ticket className="mr-2 w-5 h-5" />
                  Find Events
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-8 animate-fade-in stagger-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#0f0f23] bg-gradient-to-br from-[#e94560] to-purple-600 flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-white">{i}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-white font-semibold">4.9</span>
              </div>
              <p className="text-sm text-[#94a3b8]">From 10,000+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#e94560]/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#e94560]" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-[#94a3b8]">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                Browse Categories
              </h2>
              <p className="text-[#94a3b8] mt-1">
                Find exactly what you&apos;re looking for
              </p>
            </div>
            <Link href="/categories">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/search?category=${category.slug}`}>
                <Card hover className="p-6 text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#e94560] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#94a3b8]">{category.count} items</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                Trending Events
              </h2>
              <p className="text-[#94a3b8] mt-1">
                Don&apos;t miss out on these hot tickets
              </p>
            </div>
            <Link href="/events">
              <Button variant="ghost">View All Events</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts
              .filter((p) => p.is_event_ticket)
              .slice(0, 3)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
                Featured Products
              </h2>
              <p className="text-[#94a3b8] mt-1">
                Handpicked items just for you
              </p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost">View All Products</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts
              .filter((p) => !p.is_event_ticket)
              .slice(0, 3)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#e94560] to-[#ff6b8a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Start Selling Today
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of sellers on Dzaleka Business and reach more customers.
            Low fees, powerful tools, and dedicated support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/seller/signup">
              <Button
                size="lg"
                className="bg-white text-[#e94560] hover:bg-white/90"
              >
                <Store className="mr-2 w-5 h-5" />
                Become a Seller
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f0f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Why Choose Dzaleka Business
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e94560]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#e94560]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                Buyer Protection
              </h3>
              <p className="text-[#94a3b8]">
                Every purchase is protected. Get a full refund if the item isn&apos;t
                as described or doesn&apos;t arrive.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e94560]/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-[#e94560]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                Fast Shipping
              </h3>
              <p className="text-[#94a3b8]">
                Quick delivery with tracking. Most orders ship within 24 hours.
              </p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e94560]/10 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-[#e94560]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                24/7 Support
              </h3>
              <p className="text-[#94a3b8]">
                Our support team is always here to help. Reach out anytime via chat,
                email, or phone.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}