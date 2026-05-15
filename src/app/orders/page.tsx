'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ArrowLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { createBrowserClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price_at_purchase: number
  product?: { title: string; images: string[] }
}

interface Order {
  id: string
  status: string
  total_amount: number
  created_at: string
  items?: OrderItem[]
}

export default function OrdersPage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      const supabase = createBrowserClient()
      const { data } = await supabase
        .from('orders')
        .select('*, items:order_items(*, product:products(title, images))')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false })
      if (data) setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  }, [user])

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-[#94a3b8] hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <h1 className="font-heading text-3xl font-bold text-white mb-8">My Orders</h1>

        {loading ? (
          <div className="text-center text-[#94a3b8] py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
            <p className="text-[#94a3b8] mb-6">Start shopping to see your orders here</p>
            <Link href="/marketplace">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#94a3b8]">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-[#94a3b8]">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'danger' : 'default'}>
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-3 mb-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden bg-[#0f0f23] flex-shrink-0">
                        <Image src={item.product?.images?.[0] || '/placeholder.jpg'} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.product?.title}</p>
                        <p className="text-[#94a3b8] text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-white text-sm">${(item.price_at_purchase * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#2d2d44]">
                  <span className="text-[#94a3b8] text-sm">Total</span>
                  <span className="text-white font-semibold">${order.total_amount.toFixed(2)}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
