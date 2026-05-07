'use client'

import Link from 'next/link'
import { ArrowRight, Ticket, Store, TrendingUp, Shield, Truck, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductCard } from '@/components/ui/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'
import { Product, Category } from '@/types'

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createBrowserClient()
      
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').eq('status', 'active').order('created_at', { ascending: false }).limit(6),
        supabase.from('categories').select('*').order('name'),
      ])

      if (productsRes.data) setFeaturedProducts(productsRes.data)
      if (categoriesRes.data) setCategories(categoriesRes.data)
      setLoading(false)
    }

    fetchData()
  }, [])

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
            {categories.map((category) => (
              <Link key={category.id} href={`/search?category=${category.slug}`}>
                <Card hover className="p-6 text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon || '📦'}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#e94560] transition-colors">
                    {category.name}
                  </h3>
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
          {loading ? (
            <div className="text-center text-[#94a3b8] py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.filter((p) => p.is_event_ticket).slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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
          {loading ? (
            <div className="text-center text-[#94a3b8] py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.filter((p) => !p.is_event_ticket).slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
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
