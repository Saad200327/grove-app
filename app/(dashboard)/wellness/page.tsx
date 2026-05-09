'use client'
import { useState } from 'react'

const TRACKERS = [
  { id: 'sleep', label: 'Sleep', icon: '😴', unit: 'hrs', target: 8 },
  { id: 'gym', label: 'Gym Sessions', icon: '💪', unit: 'sessions', target: 4 },
  { id: 'water', label: 'Water', icon: '💧', unit: 'L', target: 3 },
  { id: 'nofap', label: 'Discipline Streak', icon: '🔥', unit: 'days', target: 30 },
]

const RESOURCES = [
  { title: 'How to stop overthinking after dates', time: '4 min read', tag: 'Mindset' },
  { title: 'The gym-confidence loop: why it actually works', time: '6 min read', tag: 'Fitness' },
  { title: 'Handling rejection without spiral', time: '5 min read', tag: 'Resilience' },
  { title: 'Sleep, testosterone, and dating performance', time: '7 min read', tag: 'Health' },
  { title: 'Building unshakeable self-worth (not ego)', time: '8 min read', tag: 'Growth' },
]

const TAG_COLORS: Record<string, string> = {
  Mindset: '#3B82F6', Fitness: '#22C55E', Resilience: '#C9A84C', Health: '#A855F7', Growth: '#F59E0B',
}

export default function WellnessPage() {
  const [values, setValues] = useState<Record<string, number>>({ sleep: 7, gym: 3, water: 2.5, nofap: 12 })

  const update = (id: string, delta: number) => {
    setValues(v => ({ ...v, [id]: Math.max(0, parseFloat(((v[id] ?? 0) + delta).toFixed(1))) }))
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Wellness</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Track your fundamentals. The best version of you is built daily.</p>
      </div>

      {/* Trackers */}
      <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>Today's Trackers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px,100%),1fr))', gap: '14px', marginBottom: '40px' }}>
        {TRACKERS.map(t => {
          const val = values[t.id] ?? 0
          const pct = Math.min(100, Math.round((val / t.target) * 100))
          const color = pct >= 100 ? '#22C55E' : pct >= 60 ? '#C9A84C' : '#EF4444'
          return (
            <div key={t.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.icon}</div>
              <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>{t.label}</div>
              <div style={{ fontSize: '26px', fontWeight: 700, color, marginBottom: '12px' }}>{val}<span style={{ fontSize: '13px', color: '#555', fontWeight: 400 }}> {t.unit}</span></div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '2px', transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button onClick={() => update(t.id, -0.5)} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#888', fontSize: '16px' }}>−</button>
                <button onClick={() => update(t.id, 0.5)} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontSize: '16px' }}>+</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resources */}
      <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>Men's Wellness Reads</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {RESOURCES.map((r, i) => (
          <div key={i} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{r.title}</div>
              <div style={{ fontSize: '12px', color: '#555' }}>{r.time}</div>
            </div>
            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: `${TAG_COLORS[r.tag]}18`, color: TAG_COLORS[r.tag], fontWeight: 600, whiteSpace: 'nowrap' }}>{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
