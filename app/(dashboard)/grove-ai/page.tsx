import { GroveAIChat } from '@/components/ui/GroveAIChat'

export default function GroveAIPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Grove AI</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Your private dating coach. Conversations stay on your device.</p>
      </div>
      <GroveAIChat />
      <div style={{ marginTop: '20px', background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 18px', fontSize: '12px', color: '#555', lineHeight: 1.7 }}>
        <strong style={{ color: '#888' }}>Disclaimer:</strong> Grove AI provides general guidance only — not professional therapy, legal, or medical advice. If you are in crisis, text HOME to 741741 (Crisis Text Line).
      </div>
    </div>
  )
}
