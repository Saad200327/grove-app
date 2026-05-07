export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      color: '#F0EDE6',
      fontFamily: 'DM Sans, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        padding: '18px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.1em' }}>GROVE</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#features" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Features</a>
          <a href="#community" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Community</a>
          <a href="#pricing" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Pricing</a>
          <button style={{
            background: '#C9A84C', color: '#0A0A0A', border: 'none',
            borderRadius: '8px', padding: '8px 18px', fontSize: '13px',
            fontWeight: 600, cursor: 'pointer',
          }}>Join Now</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: 'center', maxWidth: '720px',
        paddingTop: '120px', paddingBottom: '80px',
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: '11px', fontWeight: 600, letterSpacing: '2px',
          color: '#C9A84C', background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '20px', padding: '5px 16px', marginBottom: '28px',
          textTransform: 'uppercase',
        }}>Men&apos;s Lifestyle &amp; Dating Intelligence</div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800, lineHeight: 1.1,
          marginBottom: '24px',
          fontFamily: 'DM Serif Display, serif',
        }}>
          Sharp minds.<br />
          <span style={{ color: '#C9A84C' }}>Real talk.</span><br />
          Brotherhood.
        </h1>

        <p style={{
          fontSize: '17px', color: '#888', lineHeight: 1.8,
          maxWidth: '560px', margin: '0 auto 40px',
        }}>
          GROVE is where men share real experiences, decode dating situations, and grow together — with an AI coach available 24/7.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: '#C9A84C', color: '#0A0A0A',
            border: 'none', borderRadius: '10px',
            padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          }}>Join the Brotherhood</button>
          <button style={{
            background: 'transparent', color: '#F0EDE6',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
            padding: '14px 32px', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
          }}>See How It Works</button>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{
        width: '100%', maxWidth: '1100px',
        padding: '80px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {[
          { icon: '📰', title: 'Community Feed', desc: 'Anonymous posts — green flags, red flags, dating wins, scene reports. Real stories from real men.' },
          { icon: '🤖', title: 'Grove AI Coach', desc: 'Decode confusing texts, plan dates, get brutally honest advice. Private. Never stored.' },
          { icon: '🏙️', title: 'City-Based Intel', desc: 'Filter by your city. Know what\'s happening in your local dating scene.' },
          { icon: '🔍', title: 'Vetting Tools', desc: 'Background check integrations and safety resources before you meet up.' },
          { icon: '💪', title: 'Wellness Hub', desc: 'Fitness, mindset, finance, style. Everything a man needs to level up.' },
          { icon: '💎', title: 'Expert Tips', desc: 'Verified relationship coaches and therapists share real, evidence-based advice.' },
        ].map(f => (
          <div key={f.title} style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', padding: '28px',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="pricing" style={{
        width: '100%', maxWidth: '900px', padding: '80px 20px', textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '12px', fontFamily: 'DM Serif Display, serif' }}>Simple Pricing</h2>
        <p style={{ color: '#888', marginBottom: '48px', fontSize: '15px' }}>Start free. Upgrade when you\'re ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { tier: 'Free', price: '$0', features: ['Community feed', '5 AI messages/month', 'City feed', 'Basic vetting'], highlight: false },
            { tier: 'Grove+', price: '$9/mo', features: ['Everything in Free', '100 AI messages/month', 'Save posts', 'Priority feed'], highlight: true },
            { tier: 'Grove Pro', price: '$19/mo', features: ['Everything in Grove+', 'Unlimited AI', 'Expert Q&A access', 'Early features'], highlight: false },
          ].map(p => (
            <div key={p.tier} style={{
              background: p.highlight ? 'rgba(201,168,76,0.08)' : '#161616',
              border: `1px solid ${p.highlight ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '14px', padding: '32px 24px',
            }}>
              <div style={{ fontSize: '13px', color: p.highlight ? '#C9A84C' : '#888', fontWeight: 600, marginBottom: '8px' }}>{p.tier}</div>
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '24px' }}>{p.price}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '13px', color: '#aaa', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%', padding: '12px',
                background: p.highlight ? '#C9A84C' : 'transparent',
                color: p.highlight ? '#0A0A0A' : '#F0EDE6',
                border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        width: '100%', borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '32px 40px', textAlign: 'center',
        color: '#555', fontSize: '12px',
      }}>
        <span style={{ color: '#C9A84C', fontWeight: 700, marginRight: '12px' }}>GROVE</span>
        Sharp minds. Real talk. Brotherhood. &copy; 2025
      </footer>
    </main>
  )
}
