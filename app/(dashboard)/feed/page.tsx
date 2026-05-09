'use client'
import { useState, useEffect } from 'react'
import { PostCard } from '@/components/ui/PostCard'

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'green_flag', label: '🟢 Green Flag' },
  { value: 'red_flag', label: '🔴 Red Flag' },
  { value: 'dating_win', label: '🏆 Dating Win' },
  { value: 'decode_help', label: '🔍 Decode Help' },
  { value: 'scene_report', label: '📍 Scene Report' },
  { value: 'expert_tip', label: '💡 Expert Tip' },
]

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  // Compose state
  const [composeTitle, setComposeTitle] = useState('')
  const [composeContent, setComposeContent] = useState('')
  const [composeCat, setComposeCat] = useState('dating_win')
  const [composeCity, setComposeCity] = useState('')
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const fetchPosts = async (cat: string, pg: number, append = false) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(pg) })
    if (cat) params.set('category', cat)
    try {
      const res = await fetch(`/api/posts?${params}`)
      const data = await res.json()
      if (append) setPosts(p => [...p, ...(data.posts ?? [])])
      else setPosts(data.posts ?? [])
      setHasMore(data.hasMore ?? false)
    } catch {
      setPosts([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchPosts(category, 0) }, [category])

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setPosting(true)
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: composeTitle, content: composeContent, category: composeCat, city: composeCity, is_anonymous: true }),
    })
    setPosting(false)
    setPostSuccess(true)
    setComposeTitle(''); setComposeContent(''); setComposeCity('')
    setTimeout(() => { setShowCompose(false); setPostSuccess(false) }, 2000)
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700 }}>Feed</h1>
        <button
          onClick={() => setShowCompose(o => !o)}
          style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 700 }}
        >+ Share</button>
      </div>

      {/* Compose panel */}
      {showCompose && (
        <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '24px', animation: 'fadeIn 0.3s ease' }}>
          {postSuccess
            ? <div style={{ textAlign: 'center', padding: '20px', color: '#22C55E', fontWeight: 600 }}>✓ Post submitted for review!</div>
            : (
              <form onSubmit={handleSubmitPost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <select value={composeCat} onChange={e => setComposeCat(e.target.value)} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#F0EDE8', fontSize: '13px' }}>
                  {CATEGORIES.filter(c => c.value).map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
                <input value={composeTitle} onChange={e => setComposeTitle(e.target.value)} placeholder="Title..." required style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#F0EDE8', fontSize: '13px' }} />
                <textarea value={composeContent} onChange={e => setComposeContent(e.target.value)} placeholder="Share your story, question, or insight..." required rows={4} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#F0EDE8', fontSize: '13px', resize: 'vertical' }} />
                <input value={composeCity} onChange={e => setComposeCity(e.target.value)} placeholder="City (optional)" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#F0EDE8', fontSize: '13px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" disabled={posting} style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700 }}>{posting ? 'Posting...' : 'Post Anonymously'}</button>
                  <button type="button" onClick={() => setShowCompose(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888', borderRadius: '8px', padding: '10px 16px', fontSize: '13px' }}>Cancel</button>
                </div>
              </form>
            )}
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c.value} onClick={() => { setCategory(c.value); setPage(0) }} style={{
            background: category === c.value ? 'rgba(201,168,76,0.15)' : '#111',
            border: `1px solid ${category === c.value ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
            color: category === c.value ? '#C9A84C' : '#888',
            borderRadius: '20px', padding: '7px 14px', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.2s',
          }}>{c.label}</button>
        ))}
      </div>

      {/* Posts */}
      {loading && page === 0
        ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ height: '160px', borderRadius: '12px', marginBottom: '16px' }} className="skeleton" />
          ))
        : posts.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#555' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontWeight: 600, marginBottom: '8px', color: '#888' }}>Nothing here yet</div>
              <div style={{ fontSize: '13px' }}>Be the first to share something.</div>
            </div>
          )
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {posts.map((post: any) => <PostCard key={post.id} post={post} />)}
            </div>
          )
      }

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button onClick={() => { const next = page + 1; setPage(next); fetchPosts(category, next, true) }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888', borderRadius: '8px', padding: '10px 24px', fontSize: '13px' }}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
