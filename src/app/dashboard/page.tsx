'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Package, Heart, Settings, Star, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { useUser } from '@clerk/nextjs'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 6390 },
  { name: 'Jul', sales: 4900 },
]

const revenueData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 2100 },
  { name: 'Wed', revenue: 1800 },
  { name: 'Thu', revenue: 2400 },
  { name: 'Fri', revenue: 3200 },
  { name: 'Sat', revenue: 2800 },
  { name: 'Sun', revenue: 1500 },
]

const mockProducts: Product[] = [
  {
    id: '1',
    seller_id: '1',
    category_id: '1',
    title: 'Summer Music Festival 2026 - VIP Pass',
    description: 'Get exclusive VIP access',
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
]

const orders = [
  { id: '1', status: 'delivered', total: 299, items: 1, date: '2026-01-15' },
  { id: '2', status: 'shipped', total: 189, items: 2, date: '2026-01-20' },
  { id: '3', status: 'processing', total: 499, items: 1, date: '2026-01-22' },
]

const wishlist: Product[] = [
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

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const statusColors: Record<string, 'success' | 'warning' | 'accent'> = {
  delivered: 'success',
  shipped: 'warning',
  processing: 'accent',
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useUser()

  const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Orders', value: '48', change: '+8%', icon: ShoppingCart, color: 'text-blue-400' },
    { label: 'Products Sold', value: '124', change: '+23%', icon: Package, color: 'text-purple-400' },
    { label: 'Avg. Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-yellow-400' },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-[#94a3b8]">Manage your orders, wishlist, and settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#2d2d44]">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'User'} 
                    className="w-16 h-16 rounded-full"
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
                    {tab.id === 'orders' && (
                      <Badge variant="accent" className="ml-auto">3</Badge>
                    )}
                  </button>
                ))}
              </nav>
            </Card>

            <Card className="p-4 mt-4">
              <h3 className="font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Total Orders</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Wishlist Items</span>
                  <span className="text-white font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8]">Reviews Written</span>
                  <span className="text-white font-semibold">8</span>
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
                        <span className="text-green-400 text-sm">{stat.change}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 mb-6">
                  <h3 className="font-semibold text-white mb-4">Sales Overview</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#e94560" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#e94560" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#e94560" fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-white mb-4">Weekly Revenue</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-white">Orders</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-medium">Order #{order.id}</p>
                          <p className="text-sm text-[#94a3b8]">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#94a3b8]">{order.items} item(s)</span>
                        <span className="text-white font-semibold">${order.total}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-white">Wishlist</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-semibold text-white">Account Settings</h2>
                </div>

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

                <Card className="p-6">
                  <h3 className="font-semibold text-white mb-4">Password</h3>
                  <p className="text-[#94a3b8] mb-4">
                    Change your password to keep your account secure.
                  </p>
                  <Button variant="outline">Change Password</Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}