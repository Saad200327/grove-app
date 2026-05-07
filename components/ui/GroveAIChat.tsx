'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const QUICK_ACTIONS = [
  { label: '🔍 Decode a text', prompt: 'Help me decode this text message from someone I am dating: ' },
  { label: '📍 Plan a date', prompt: 'Plan a great date for me in [city] with a budget of $[amount]. Tell me the full plan.' },
  { label: '🚩 Red flag check', prompt: 'I want to describe some behavior and get your honest assessment of whether it is a red flag: ' },
  { label: '💬 First message', prompt: 'Help me write a great opening message for someone whose profile says: ' },
]

export function GroveAIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim()
    if (!content || loading) return
    setInput('')
    const userMsg: Message = { role: 'user', content, timestamp: new Date() }
    setMessages(m => [...m, userMsg])
    setLoading(true)
    try {
      const res = await fetch('/api/grove-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.response, timestamp: new Date() }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong. Try again.', timestamp: new Date() }])
    } finally { setLoading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '600px', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>Grove AI</div>
          <div style={{ fontSize: '11px', color: 'var(--green)' }}>● Private · Not stored</div>
        </div>
        <button onClick={() => setMessages([])} style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer' }}>Clear</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧠</div>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Your private dating coach</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>Conversations stay on your device — never our servers.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {QUICK_ACTIONS.map(a => (
                <button key={a.label} onClick={() => setInput(a.prompt)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', fontSize: '12px', color: 'var(--muted)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '14px', display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '12px 14px', borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: m.role === 'user' ? 'rgba(201,168,76,0.15)' : 'var(--surface)',
              border: `1px solid ${m.role === 'user' ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
              fontSize: '13px', lineHeight: 1.7, color: m.role === 'user' ? 'var(--gold)' : 'var(--text)',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '4px', padding: '12px 14px', background: 'var(--surface)', borderRadius: '12px', width: 'fit-content', border: '1px solid var(--border)' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', animation: `pulse 1s ${i*0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask Grove AI anything..."
          style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px', color: 'var(--text)', fontSize: '13px', outline: 'none' }}
        />
        <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ background: 'var(--gold)', border: 'none', borderRadius: '8px', padding: '10px 16px', color: '#0A0A0A', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  )
}
