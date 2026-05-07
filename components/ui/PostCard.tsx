'use client'
import { useState } from 'react'

type PostCategory = 'green_flag' | 'red_flag' | 'dating_win' | 'decode_help' | 'scene_report' | 'expert_tip'

interface Post {
  id: string
  category: PostCategory
  title: string
  content: string
  city?: string
  tags: string[]
  is_anonymous: boolean
  helpful_count: number
  comment_count: number
  save_count: number
  created_at: string
  author?: { username: string; avatar_initials: string; avatar_color: string }
}

const CATEGORY_CONFIG: Record<PostCategory, { label: string; color: string; bg: string }> = {
  green_flag: { label: 'Green Flag', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  red_flag: { label: 'Red Flag', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  dating_win: { label: 'Dating Win', color: '#C9A84C', bg: 'rgba(201,168,76,0.1)' },
  decode_help: { label: 'Decode Help', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  scene_report: { label: 'Scene Report', color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
  expert_tip: { label: 'Expert Tip', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
}

export function PostCard({ post }: { post: Post }) {
  const [helpful, setHelpful] = useState(post.helpful_count)
  const [saved, setSaved] = useState(false)
  const [voted, setVoted] = useState(false)
  const cat = CATEGORY_CONFIG[post.category]
  const timeAgo = new Date(post.created_at).toLocaleDateString()

  const handleHelpful = () => {
    if (!voted) { setHelpful(h => h + 1); setVoted(true) }
  }

  return (
    <article style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '20px',
      transition: 'border-color 0.2s',
    }}>
      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: post.author ? `${post.author.avatar_color}22` : '#C9A84C22',
          border: `1px solid ${post.author?.avatar_color ?? '#C9A84C'}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 600, color: post.author?.avatar_color ?? '#C9A84C',
        }}>
          {post.is_anonymous ? 'A' : (post.author?.avatar_initials ?? '?')}
        </div>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
          {post.is_anonymous ? 'Anonymous' : post.author?.username} · {timeAgo}
        </span>
        {post.city && (
          <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: 'auto' }}>📍 {post.city}</span>
        )}
        <span style={{
          fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 500,
          color: cat.color, background: cat.bg,
        }}>{cat.label}</span>
      </div>

      {/* Content */}
      <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>
        {post.title}
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '14px' }}>
        {post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content}
      </p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '11px', color: '#555', background: 'rgba(255,255,255,0.04)',
              padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border)',
            }}>#{tag}</span>
          ))}
        </div>
      )}

      {/* Engagement */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button onClick={handleHelpful} style={{
          background: voted ? 'rgba(201,168,76,0.1)' : 'transparent',
          border: `1px solid ${voted ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
          color: voted ? 'var(--gold)' : 'var(--muted)',
          borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer',
          transition: 'all 0.2s',
        }}>👍 {helpful} helpful</button>
        <span style={{ fontSize: '12px', color: '#555', cursor: 'pointer' }}>💬 {post.comment_count}</span>
        <button onClick={() => setSaved(s => !s)} style={{
          marginLeft: 'auto', background: 'transparent', border: 'none',
          color: saved ? 'var(--gold)' : '#555', fontSize: '16px', cursor: 'pointer',
        }}>{saved ? '🔖' : '🔖'}</button>
      </div>
    </article>
  )
}
