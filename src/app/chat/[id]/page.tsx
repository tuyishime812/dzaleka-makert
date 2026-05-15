'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Send } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { createBrowserClient } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Message {
  id: string
  sender_id: string
  content: string
  created_at: string
}

interface Conversation {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  products: { title: string; images: string[] }
}

export default function ChatPage() {
  const params = useParams()
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchConversation = async () => {
      const supabase = createBrowserClient()
      
      const { data: conv } = await supabase
        .from('conversations')
        .select(`
          *,
          products (title, images)
        `)
        .eq('id', params.id as string)
        .single()

      if (conv) {
        setConversation(conv)
        
        const { data: msgs } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: true })

        if (msgs) setMessages(msgs)
      }
      
      setLoading(false)
    }

    fetchConversation()

    // Subscribe to new messages
    const supabase = createBrowserClient()
    const channel = supabase
      .channel(`messages:${params.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${params.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [params.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim() || !user?.id) return

    const supabase = createBrowserClient()
    await supabase
      .from('messages')
      .insert({
        conversation_id: params.id,
        sender_id: user.id,
        content: newMessage,
      })

    setNewMessage('')
  }

  if (loading) {
    return <div className="text-center text-[#94a3b8] py-12">Loading...</div>
  }

  if (!conversation) {
    return <div className="text-center text-[#94a3b8] py-12">Conversation not found</div>
  }

  return (
    <div className="min-h-screen bg-[#0f0f23] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a2e] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#2d2d44]">
            <h2 className="text-white font-semibold">
              {conversation.products?.title || 'Chat'}
            </h2>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender_id === user?.id
                      ? 'bg-[#e94560] text-white'
                      : 'bg-[#2d2d44] text-white'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[#2d2d44]">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
