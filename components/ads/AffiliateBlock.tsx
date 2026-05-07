const AFFILIATES = [
  {
    name: 'BeenVerified',
    tagline: "Run a background check before the first date. Know who you're really talking to.",
    cta: 'Try Free',
    url: 'https://www.beenverified.com',
    commission: '$40/signup',
    icon: '🔍',
  },
  {
    name: 'Hims',
    tagline: "Men's health, simplified. Hair, skin, performance — handled.",
    cta: 'Get Started',
    url: 'https://www.forhims.com',
    commission: 'High CPA',
    icon: '💊',
  },
  {
    name: 'BetterHelp',
    tagline: 'Real therapy with real therapists. Strong men ask for help.',
    cta: 'First Week Free',
    url: 'https://www.betterhelp.com',
    commission: '$60-100/signup',
    icon: '🧠',
  },
]

export function AffiliateBlock() {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {AFFILIATES.map(a => (
        <a
          key={a.name}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '14px 16px',
            textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
        >
          <div style={{ fontSize: '24px' }}>{a.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#F0EDE6', marginBottom: '3px' }}>{a.name}</div>
            <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{a.tagline}</div>
          </div>
          <div style={{ fontSize: '12px', color: '#C9A84C', fontWeight: 500, whiteSpace: 'nowrap' }}>{a.cta} →</div>
        </a>
      ))}
    </div>
  )
}
