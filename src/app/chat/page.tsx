'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'

interface Conversation {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  updated_at: string
  products: { title: string; images: string[] }
  buyer: { username: string; avatar_url: string }
  seller: { username: string; avatar_url: string }
}

export default function ChatsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      const supabase = createBrowserClient()
      
      const { data } = await supabase
        .from('conversations')
        .select(`
          *,
          products (title, images),
          buyer:profiles!conversations_buyer_id_fkey (username, avatar_url),
          seller:profiles!conversations_seller_id_fkey (username, avatar_url)
        `)
        .order('updated_at', { ascending: false })

      if (data) setConversations(data)
      setLoading(false)
    }

    fetchConversations()
  }, [])

  if (loading) {
    return <div className="text-center text-[#94a3b8] py-12">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>

        {conversations.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
            <p className="text-[#94a3b8] mb-6">Start a conversation with a seller</p>
            <Link href="/marketplace">
              <Button>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv) => (
              <Link key={conv.id} href={`/chat/${conv.id}`}>
                <div className="bg-[#1a1a2e] p-4 rounded-lg hover:bg-[#2d2d44] transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={conv.products?.images?.[0] || '/placeholder.jpg'}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{conv.products?.title}</h3>
                      <p className="text-sm text-[#94a3b8]">
                        with {conv.seller?.username || 'Seller'}
                      </p>
                    </div>
                    <span className="text-xs text-[#94a3b8]">
                      {new Date(conv.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
