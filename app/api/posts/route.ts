import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const city = searchParams.get('city')
  const page = parseInt(searchParams.get('page') ?? '0')
  const limit = 20

  let query = supabase
    .from('posts')
    .select(`
      id, category, title, content, city, tags,
      is_anonymous, helpful_count, comment_count, save_count,
      created_at, expires_at,
      users!posts_user_id_fkey(username, avatar_initials, avatar_color)
    `)
    .eq('is_deleted', false)
    .eq('human_approved', true)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)

  if (category) query = query.eq('category', category)
  if (city) query = query.eq('city', city)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data, page, hasMore: data.length === limit })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { category, title, content, city, tags, is_anonymous, user_id } = body

    if (!category || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const banned = ['doxx', 'address', 'social security', 'home address']
    const hasBanned = banned.some(w => content.toLowerCase().includes(w))
    if (hasBanned) {
      return NextResponse.json({ error: 'Content violates community guidelines' }, { status: 400 })
    }

    const { data, error } = await supabase.from('posts').insert({
      user_id, category, title, content, city, tags: tags ?? [],
      is_anonymous: is_anonymous ?? true,
      human_approved: false,
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ post: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
