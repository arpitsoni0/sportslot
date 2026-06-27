import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, CreditCard, CheckCircle, ChevronRight, Star, Users, Building2 } from 'lucide-react';
import { sports } from '../data/mockData';
import { fetchVenues } from '../api';
import VenueCard from '../components/VenueCard';

export default function Home() {
  const navigate = useNavigate();
  const [sport, setSport] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [featured, setFeatured] = useState([]);

  useEffect(() => { fetchVenues().then(v => setFeatured(v.slice(0, 3))); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sport) params.set('sport', sport);
    if (city) params.set('city', city);
    if (pincode) params.set('pincode', pincode);
    navigate(`/search?${params.toString()}`);
  };

  const steps = [
    { icon: Search, title: 'Search', desc: 'Find sports venues near you by sport, city, or pincode' },
    { icon: Clock, title: 'Select Slot', desc: 'Choose your preferred date and available time slot' },
    { icon: CreditCard, title: 'Pay Online', desc: 'Securely pay online and confirm your booking instantly' },
    { icon: CheckCircle, title: 'Play!', desc: 'Show up at the venue and enjoy your game' },
  ];

  const inputStyle = {
    flex: '1 1 180px', padding: '14px 18px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb',
    fontSize: 15, color: '#333', outline: 'none', minWidth: 0, boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <div style={{ position: 'absolute', top: -100, left: '20%', width: 500, height: 500, background: '#fff', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: -100, right: '20%', width: 600, height: 600, background: '#fff', borderRadius: '50%', filter: 'blur(120px)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 70px', position: 'relative', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: 30, fontSize: 13, fontWeight: 500, marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
              500+ venues across India
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 7vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 20 }}>
              Book Sports Venues<br />Near You
            </h1>
            <p style={{ fontSize: 'clamp(15px, 3vw, 20px)', color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.6, maxWidth: 560, margin: '0 auto 36px', padding: '0 10px' }}>
              Find and book cricket turfs, football grounds, badminton courts, tennis courts, pickleball courts and more.
            </p>

            <form onSubmit={handleSearch} style={{ background: '#fff', borderRadius: 16, padding: 8, display: 'flex', flexWrap: 'wrap', gap: 8, boxShadow: '0 20px 60px rgba(0,0,0,0.15)', maxWidth: 740, margin: '0 auto' }}>
              <select value={sport} onChange={(e) => setSport(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">All Sports</option>
                {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input type="text" placeholder="City (e.g. Jaipur)" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} style={inputStyle} />
              <button type="submit" style={{ flex: '1 1 180px', padding: '14px 24px', background: '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                <Search size={18} /> Search
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 40px)', marginTop: 32, fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.7)', flexWrap: 'wrap' }}>
              {[[Building2, '500+ Venues'], [Users, '10,000+ Users'], [Star, '4.8 Rating']].map(([Icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={16} /> <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Sport */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: '#dc2626', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Explore</p>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: 10 }}>Browse by Sport</h2>
          <p style={{ color: '#888', fontSize: 'clamp(14px, 2vw, 16px)' }}>Choose your favourite sport and find venues near you</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
          {sports.map((s) => (
            <button key={s.id} onClick={() => navigate(`/search?sport=${s.id}`)}
              style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '24px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 'clamp(32px, 6vw, 48px)', marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#111', fontSize: 15, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: '#999' }}>{s.venues} venues</div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Venues */}
      <section style={{ background: '#f9fafb', padding: '60px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ color: '#dc2626', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Top Picks</p>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: 8 }}>Featured Venues</h2>
              <p style={{ color: '#888', fontSize: 'clamp(14px, 2vw, 16px)' }}>Top-rated sports facilities in Jaipur</p>
            </div>
            <button onClick={() => navigate('/search')} style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#dc2626', fontWeight: 600, fontSize: 15, background: 'none', border: 'none', cursor: 'pointer' }}>
              View All <ChevronRight size={18} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {featured.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: '#dc2626', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>Simple Process</p>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: 10 }}>How It Works</h2>
          <p style={{ color: '#888', fontSize: 'clamp(14px, 2vw, 16px)' }}>Book your venue in 4 simple steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 12px' }}>
              <div style={{ width: 64, height: 64, background: '#fef2f2', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', position: 'relative' }}>
                <step.icon size={26} color="#dc2626" />
                <div style={{ position: 'absolute', top: -8, right: -8, width: 26, height: 26, background: '#dc2626', color: '#fff', borderRadius: '50%', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              </div>
              <h3 style={{ fontWeight: 700, color: '#111', fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #111827, #1f2937)', color: '#fff', padding: '60px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <p style={{ color: '#f87171', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 }}>For Venue Owners</p>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 16 }}>Own a Sports Venue?</h2>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 32px', padding: '0 10px' }}>
            List your sports complex on SportSlot and reach thousands of sports enthusiasts. Manage bookings, time slots, and payments — all in one place.
          </p>
          <button onClick={() => navigate('/signup')} style={{ padding: '14px 36px', background: '#dc2626', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 12, border: 'none', cursor: 'pointer' }}>
            List Your Sports Complex
          </button>
        </div>
      </section>
    </div>
  );
}
