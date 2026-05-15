import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { createAdminClient } from '@/lib/supabase-admin'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      products (*),
      messages!inner (content, created_at, sender_id)
    `)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order('updated_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const supabase = createAdminClient()
  
  const body = await request.json()
  const { product_id, seller_id } = body
  
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('product_id', product_id)
    .eq('buyer_id', userId)
    .eq('seller_id', seller_id)
    .single()
  
  if (existing) {
    return NextResponse.json(existing)
  }
  
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      product_id,
      buyer_id: userId,
      seller_id,
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
