'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/feed'
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
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Welcome back</h1>
      <p style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>Sign in to your Grove account</p>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '0.5px' }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '0.5px' }}>PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ ...inputStyle, paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPass(s => !s)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', fontSize: '12px' }}
            >{showPass ? 'Hide' : 'Show'}</button>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#EF4444' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#333' : '#C9A84C',
            color: loading ? '#888' : '#0A0A0A',
            border: 'none',
            borderRadius: '10px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            marginTop: '4px',
            transition: 'all 0.2s',
          }}
        >{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#666' }}>
        Don&apos;t have an account?{' '}
        <a href="/signup" style={{ color: '#C9A84C', fontWeight: 600 }}>Join Grove</a>
      </p>
    </div>
  )
}
