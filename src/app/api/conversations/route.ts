import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      products (*),
      buyer:profiles!conversations_buyer_id_fkey (id, username, avatar_url),
      seller:profiles!conversations_seller_id_fkey (id, username, avatar_url),
      messages!inner (content, created_at, sender_id)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('updated_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const { product_id, seller_id } = body
  
  // Check if conversation already exists
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('product_id', product_id)
    .eq('buyer_id', user.id)
    .eq('seller_id', seller_id)
    .single()
  
  if (existing) {
    return NextResponse.json(existing)
  }
  
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      product_id,
      buyer_id: user.id,
      seller_id,
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
