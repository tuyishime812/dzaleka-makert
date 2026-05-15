'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, Heart, Settings, TrendingUp, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { useUser } from '@clerk/nextjs'
import { createBrowserClient } from '@/lib/supabase'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'products', label: 'My Products', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useUser()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return
      
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

      if (data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [user])

  const stats = [
    { label: 'Total Products', value: products.length.toString(), change: '', icon: Package, color: 'text-blue-400' },
    { label: 'Active Listings', value: products.filter(p => p.status === 'active').length.toString(), change: '', icon: ShoppingCart, color: 'text-green-400' },
    { label: 'Sold Items', value: products.filter(p => p.status === 'sold').length.toString(), change: '', icon: Package, color: 'text-purple-400' },
    { label: 'Total Views', value: products.reduce((acc, p) => acc + (p.views || 0), 0).toString(), change: '', icon: TrendingUp, color: 'text-yellow-400' },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-[#94a3b8]">Manage your products and account</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#2d2d44]">
              {user?.imageUrl ? (
                <Image 
                  src={user.imageUrl} 
                  alt={user.fullName || 'User'} 
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e94560] to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user?.firstName?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-white">
                    {user?.fullName || 'Guest User'}
                  </h2>
                  <p className="text-sm text-[#94a3b8]">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#e94560] text-white'
                        : 'text-[#94a3b8] hover:text-white hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>

            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Total Products</span>
                  <span className="text-white font-semibold">{products.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Active</span>
                  <span className="text-white font-semibold">{products.filter(p => p.status === 'active').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Sold</span>
                  <span className="text-white font-semibold">{products.filter(p => p.status === 'sold').length}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#94a3b8] text-sm">{stat.label}</span>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6">
                  <h3 className="font-semibold text-white mb-4">Recent Products</h3>
                  {loading ? (
                    <div className="text-center text-[#94a3b8] py-8">Loading...</div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#94a3b8] mb-4">No products yet</p>
                      <Link href="/seller/signup">
                        <Button>Create Your First Listing</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {products.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-3 bg-[#0f0f23] rounded-lg">
                        <Image src={product.images[0] || '/placeholder.jpg'} alt="" width={48} height={48} className="rounded object-cover" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{product.title}</p>
                            <p className="text-sm text-[#94a3b8]">${product.price}</p>
                          </div>
                          <Badge variant={product.status === 'active' ? 'accent' : 'danger'}>
                            {product.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-white">My Products</h2>
                  <Link href="/seller/signup">
                    <Button>Add New Product</Button>
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center text-[#94a3b8] py-8">Loading...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && <WishlistTab userId={user?.id} />}

            {activeTab === 'settings' && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-white mb-6">Account Settings</h2>
                
                <Card className="p-6 mb-4">
                  <h3 className="font-semibold text-white mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-[#94a3b8]">First Name</label>
                        <p className="text-white">{user?.firstName || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-[#94a3b8]">Last Name</label>
                        <p className="text-white">{user?.lastName || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#94a3b8]">Email</label>
                      <p className="text-white">{user?.primaryEmailAddress?.emailAddress || 'N/A'}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function WishlistTab({ userId }: { userId?: string | null }) {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    const fetchWishlist = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('wishlist')
        .select('products (*)')
        .eq('user_id', userId)
      if (data) {
        const products = data
          .map((w: Record<string, unknown>) => w.products)
          .filter(Boolean)
          .flat() as Product[]
        setWishlistProducts(products)
      }
      setLoading(false)
    }
    fetchWishlist()
  }, [userId])

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-white mb-6">Wishlist</h2>
      {loading ? (
        <div className="text-center text-[#94a3b8] py-8">Loading...</div>
      ) : wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
          <p className="text-[#94a3b8]">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
