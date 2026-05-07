import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = await createServerClient()
  const { searchParams } = new URL(request.url)
  
  const category = searchParams.get('category')
  const search = searchParams.get('q')
  const seller_id = searchParams.get('seller_id')
  const is_event = searchParams.get('is_event')
  const status = searchParams.get('status') || 'active'
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  
  if (category) {
    query = query.eq('category_id', category)
  }
  
  if (search) {
    query = query.ilike('title', `%${search}%`)
  }
  
  if (seller_id) {
    query = query.eq('seller_id', seller_id)
  }
  
  if (is_event === 'true') {
    query = query.eq('is_event_ticket', true)
  } else if (is_event === 'false') {
    query = query.eq('is_event_ticket', false)
  }
  
  const { data, error } = await query
  
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
  
  const { data, error } = await supabase
    .from('products')
    .insert({
      ...body,
      seller_id: user.id,
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
