'use client'
import { useState } from 'react'

const GREEN_FLAGS = [
  'Remembers small details you mentioned',
  'Has genuine friendships outside of romance',
  'Communicates needs without drama',
  'Consistent behavior across contexts',
  'Takes accountability without being asked',
  'Respects your time and boundaries',
  'Has her own goals and ambitions',
  'You feel calm, not anxious, around her',
]

const RED_FLAGS = [
  'Inconsistent or hot-and-cold behavior',
  'Bad-mouths every ex without exception',
  'Tests you or plays games early on',
  'Isolates you from friends/family',
  'Reactions disproportionate to situations',
  'No accountability — always someone else's fault',
  'Love-bombing followed by withdrawal',
  'Disrespects service staff or strangers',
]

const CHECKLIST_ITEMS = [
  { id: 'c1', label: 'Have I seen her in 3+ different social environments?', weight: 2 },
  { id: 'c2', label: 'Do her words consistently match her actions?', weight: 3 },
  { id: 'c3', label: 'Have I met at least some of her friends/family?', weight: 1 },
  { id: 'c4', label: 'Am I genuinely excited — not just physically attracted?', weight: 2 },
  { id: 'c5', label: 'Have we handled a minor conflict well together?', weight: 3 },
  { id: 'c6', label: 'Does she bring value to my life beyond validation?', weight: 2 },
  { id: 'c7', label: 'Do I feel like my authentic self around her?', weight: 3 },
  { id: 'c8', label: 'Am I choosing her, not just afraid of being alone?', weight: 2 },
]

export default function VettingPage() {
  const [checked, setChecked] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'checklist' | 'flags'>('checklist')

  const score = checked.reduce((acc, id) => {
    const item = CHECKLIST_ITEMS.find(c => c.id === id)
    return acc + (item?.weight ?? 0)
  }, 0)
  const maxScore = CHECKLIST_ITEMS.reduce((acc, c) => acc + c.weight, 0)
  const pct = Math.round((score / maxScore) * 100)

  const verdict = pct >= 80 ? { text: 'Strong compatibility signals', color: '#22C55E' }
    : pct >= 50 ? { text: 'Proceed with awareness', color: '#C9A84C' }
    : { text: 'Too early to tell — gather more data', color: '#888' }

  const toggle = (id: string) => setChecked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])

  const tabStyle = (active: boolean): React.CSSProperties => ({
    background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
    border: `1px solid ${active ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
    color: active ? '#C9A84C' : '#888',
    borderRadius: '8px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
  })

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Vetting Intel</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Evidence-based tools to evaluate compatibility — not games.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <button style={tabStyle(activeTab === 'checklist')} onClick={() => setActiveTab('checklist')}>📋 Readiness Checklist</button>
        <button style={tabStyle(activeTab === 'flags')} onClick={() => setActiveTab('flags')}>🚩 Flag Guide</button>
      </div>

      {activeTab === 'checklist' && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          {/* Score card */}
          <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', color: '#888' }}>Compatibility Score</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: verdict.color }}>{pct}%</div>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: verdict.color, borderRadius: '3px', transition: 'width 0.4s ease' }} />
            </div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: verdict.color, fontWeight: 600 }}>{verdict.text}</div>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CHECKLIST_ITEMS.map(item => (
              <button key={item.id} onClick={() => toggle(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: '14px', background: '#161616',
                border: `1px solid ${checked.includes(item.id) ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '10px', padding: '14px 16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  background: checked.includes(item.id) ? '#C9A84C' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${checked.includes(item.id) ? '#C9A84C' : 'rgba(255,255,255,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#0A0A0A',
                }}>{checked.includes(item.id) ? '✓' : ''}</div>
                <span style={{ fontSize: '14px', color: checked.includes(item.id) ? '#F0EDE8' : '#888', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '11px', color: '#555' }}>{'★'.repeat(item.weight)}</span>
              </button>
            ))}
          </div>

          <button onClick={() => setChecked([])} style={{ marginTop: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: '#555', borderRadius: '8px', padding: '8px 16px', fontSize: '12px' }}>Reset</button>
        </div>
      )}

      {activeTab === 'flags' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          <div>
            <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#22C55E', textTransform: 'uppercase', marginBottom: '14px' }}>🟢 Green Flags</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {GREEN_FLAGS.map((f, i) => (
                <div key={i} style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#aaa', lineHeight: 1.5 }}>{f}</div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#EF4444', textTransform: 'uppercase', marginBottom: '14px' }}>🔴 Red Flags</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {RED_FLAGS.map((f, i) => (
                <div key={i} style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#aaa', lineHeight: 1.5 }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
