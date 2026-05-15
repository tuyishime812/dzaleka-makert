import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { id } = await params
  const supabase = createAdminClient()
  
  const { data: conv } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single()
  
  if (!conv) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { id } = await params
  const supabase = createAdminClient()
  
  const body = await request.json()
  
  const { data: conv } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single()
  
  if (!conv) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: id,
      sender_id: userId,
      content: body.content,
    })
    .select()
    .single()
  
  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
