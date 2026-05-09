'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username, avatar_initials: username.slice(0,2).toUpperCase(), avatar_color: '#C9A84C' } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#111',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '13px 16px',
    color: '#F0EDE8',
    fontSize: '14px',
    outline: 'none',
  }

  if (success) return (
    <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '12px' }}>Check your email</h2>
      <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.7 }}>We sent a confirmation link to <strong style={{ color: '#F0EDE8' }}>{email}</strong>. Click it to activate your Grove account.</p>
    </div>
  )

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Join Grove</h1>
      <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>Sharp minds. Real talk. Brotherhood.</p>

      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '0.5px' }}>USERNAME</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="yourhandle" required minLength={3} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '0.5px' }}>EMAIL</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '0.5px' }}>PASSWORD</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required style={inputStyle} />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#EF4444' }}>
            {error}
          </div>
        )}

        <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.6 }}>
          By joining, you agree to our Terms of Service. Grove is for men 18+.
        </p>

        <button
          type="submit"
          disabled={loading}
          style={{ background: loading ? '#333' : '#C9A84C', color: loading ? '#888' : '#0A0A0A', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '14px', fontWeight: 700, transition: 'all 0.2s' }}
        >{loading ? 'Creating account...' : 'Create Account'}</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#666' }}>
        Already a member?{' '}
        <a href="/login" style={{ color: '#C9A84C', fontWeight: 600 }}>Sign in</a>
      </p>
    </div>
  )
}
