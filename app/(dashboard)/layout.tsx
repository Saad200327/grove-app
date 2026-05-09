'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/feed', icon: '🏠', label: 'Feed' },
  { href: '/grove-ai', icon: '🤖', label: 'Grove AI' },
  { href: '/community', icon: '👥', label: 'Community' },
  { href: '/vetting', icon: '🔍', label: 'Vetting' },
  { href: '/wellness', icon: '🧠', label: 'Wellness' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      {/* Sidebar — desktop */}
      <aside style={{
        width: '220px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }} className="sidebar-desktop">
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 20px', marginBottom: '32px', textDecoration: 'none' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#C9A84C" fillOpacity="0.15" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#C9A84C" fontSize="15" fontWeight="700" fontFamily="Georgia,serif">G</text>
          </svg>
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '16px', color: '#C9A84C', letterSpacing: '1px' }}>GROVE</span>
        </a>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' }}>
          {NAV.map(n => {
            const active = pathname === n.href || pathname.startsWith(n.href + '/')
            return (
              <a key={n.href} href={n.href} style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                borderRadius: '8px', fontSize: '14px', fontWeight: active ? 600 : 400,
                color: active ? '#C9A84C' : '#888',
                background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: '16px' }}>{n.icon}</span>
                {n.label}
              </a>
            )
          })}
        </nav>
        <div style={{ padding: '0 10px', marginTop: 'auto' }}>
          <a href="/login" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: '#555', transition: 'color 0.2s' }}>
            <span>🚪</span> Sign Out
          </a>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px', alignItems: 'center', justifyContent: 'space-between',
      }} className="mobile-topbar">
        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '18px', color: '#C9A84C' }}>GROVE</span>
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#F0EDE8', fontSize: '20px' }}>☰</button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 49,
          background: '#111', borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '8px 16px',
        }} className="mobile-menu">
          {NAV.map(n => (
            <a key={n.href} href={n.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 0', fontSize: '15px', color: pathname === n.href ? '#C9A84C' : '#F0EDE8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {n.icon} {n.label}
            </a>
          ))}
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0, padding: '32px' }} className="dashboard-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-topbar { display: flex !important; }
          .dashboard-main { padding: 80px 16px 32px !important; }
        }
      `}</style>
    </div>
  )
}
