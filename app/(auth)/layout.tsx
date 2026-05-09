export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <a href="/" style={{ display: 'inline-block' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-label="Grove">
              <rect width="48" height="48" rx="12" fill="#C9A84C" fillOpacity="0.15" />
              <rect x="1" y="1" width="46" height="46" rx="11" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="1" />
              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#C9A84C" fontSize="22" fontWeight="700" fontFamily="Georgia, serif">G</text>
            </svg>
          </a>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>GROVE</div>
        </div>
        {children}
      </div>
    </div>
  )
}
