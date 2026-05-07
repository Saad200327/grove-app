'use client'
import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'rectangle' | 'leaderboard' | 'native'
  className?: string
}

export function AdBanner({ slot, format = 'rectangle', className }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle) {
      try {
        ;(window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({})
      } catch {}
    }
  }, [])

  const sizes: Record<string, { width: number; height: number }> = {
    rectangle: { width: 300, height: 250 },
    leaderboard: { width: 728, height: 90 },
    native: { width: 0, height: 0 },
  }

  return (
    <div
      ref={adRef}
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '4px',
          fontSize: '9px',
          color: '#555',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Ad
      </div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: format === 'native' ? '100%' : `${sizes[format].width}px`,
          height: format === 'native' ? 'auto' : `${sizes[format].height}px`,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format === 'native' ? 'fluid' : 'fixed'}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export function NativeFeedAd({ sponsor }: { sponsor: { name: string; tagline: string; cta: string; url: string; category: string } }) {
  return (
    <article
      style={{
        background: 'rgba(201,168,76,0.03)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '12px',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', color: '#555', letterSpacing: '1px', textTransform: 'uppercase' }}>Sponsored</span>
        <span style={{ fontSize: '10px', color: 'rgba(201,168,76,0.6)', background: 'rgba(201,168,76,0.08)', padding: '2px 8px', borderRadius: '20px' }}>{sponsor.category}</span>
      </div>
      <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#F0EDE6' }}>{sponsor.name}</h3>
      <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '14px' }}>{sponsor.tagline}</p>
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer sponsored" style={{ fontSize: '13px', color: '#C9A84C', fontWeight: 500, textDecoration: 'none' }}>{sponsor.cta} →</a>
    </article>
  )
}
