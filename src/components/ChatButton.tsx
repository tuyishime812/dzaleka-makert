'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createBrowserClient } from '@/lib/supabase'
import { useUser } from '@clerk/nextjs'

interface ChatButtonProps {
  productId: string
  sellerId: string
}

export function ChatButton({ productId, sellerId }: ChatButtonProps) {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  if (!user || user.id === sellerId) return null

  const handleStartChat = async () => {
    setLoading(true)
    const supabase = createBrowserClient()
    
    // Check if conversation exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('product_id', productId)
      .eq('buyer_id', user.id)
      .eq('seller_id', sellerId)
      .single()

    if (existing) {
      window.location.href = `/chat/${existing.id}`
      return
    }

    // Create new conversation
    const { data } = await supabase
      .from('conversations')
      .insert({
        product_id: productId,
        buyer_id: user.id,
        seller_id: sellerId,
      })
      .select()
      .single()

    if (data) {
      window.location.href = `/chat/${data.id}`
    }
    setLoading(false)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleStartChat}
      disabled={loading}
    >
      <MessageCircle className="w-4 h-4 mr-1" />
      Chat with Seller
    </Button>
  )
}
