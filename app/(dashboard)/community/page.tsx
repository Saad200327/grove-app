'use client'
import { useState } from 'react'

const ROOMS = [
  { id: 1, name: 'Dating Strategy', icon: '🎯', members: 2841, desc: 'Approach, mindset, building genuine confidence.' },
  { id: 2, name: 'Decode This', icon: '🔍', members: 1923, desc: 'Post screenshots, get collective reads.' },
  { id: 3, name: 'Fitness & Body', icon: '💪', members: 3210, desc: 'Training logs, nutrition, physique goals.' },
  { id: 4, name: 'Finance Moves', icon: '💰', members: 1540, desc: 'Income, investing, leveling up your money game.' },
  { id: 5, name: 'Style Guide', icon: '👔', members: 987, desc: 'Fit check, brand recs, grooming advice.' },
  { id: 6, name: 'Mental Edge', icon: '🧠', members: 1267, desc: 'Mindset, stress, stoicism, emotional intelligence.' },
]

const EVENTS = [
  { id: 1, title: 'Weekly AMA: Dating Coach Q&A', date: 'Sat · 8PM EST', type: 'Live', attendees: 142 },
  { id: 2, title: 'Cold Approach Challenge — Week 3', date: 'Ongoing', type: 'Challenge', attendees: 89 },
  { id: 3, title: 'NYC Scene Report Meetup', date: 'Fri · 7PM ET', type: 'Meetup', attendees: 34 },
]

export default function CommunityPage() {
  const [joined, setJoined] = useState<number[]>([])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Community</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Find your room. Real conversations with real men.</p>
      </div>

      {/* Rooms */}
      <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>Rooms</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '14px', marginBottom: '40px' }}>
        {ROOMS.map(room => (
          <div key={room.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px', transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px' }}>{room.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{room.name}</div>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}>{room.desc}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px' }}>
              <span style={{ fontSize: '12px', color: '#555' }}>👥 {room.members.toLocaleString()}</span>
              <button
                onClick={() => setJoined(j => j.includes(room.id) ? j.filter(x => x !== room.id) : [...j, room.id])}
                style={{
                  background: joined.includes(room.id) ? 'rgba(201,168,76,0.1)' : '#C9A84C',
                  color: joined.includes(room.id) ? '#C9A84C' : '#0A0A0A',
                  border: `1px solid ${joined.includes(room.id) ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                  borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, transition: 'all 0.2s',
                }}
              >{joined.includes(room.id) ? '✓ Joined' : 'Join'}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <h2 style={{ fontSize: '13px', letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>Upcoming Events</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{ev.title}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{ev.date} · {ev.attendees} attending</div>
            </div>
            <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: ev.type === 'Live' ? 'rgba(239,68,68,0.1)' : ev.type === 'Challenge' ? 'rgba(201,168,76,0.1)' : 'rgba(59,130,246,0.1)', color: ev.type === 'Live' ? '#EF4444' : ev.type === 'Challenge' ? '#C9A84C' : '#3B82F6', fontWeight: 600 }}>{ev.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
