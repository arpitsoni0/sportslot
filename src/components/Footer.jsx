import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9ca3af' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px 32px' }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <img src="/logo.png" alt="SportSlot" style={{ height: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>
              India's premier sports venue booking platform. Find and book cricket turfs, football grounds, badminton courts, and more. Book. Play. Win.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[Globe, Send, Heart].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, background: '#1f2937', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color="#9ca3af" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['/', 'Home'], ['/search', 'Find Venues'], ['/signup', 'List Your Venue'], ['/login', 'Login']].map(([to, label]) => (
                <Link key={to} to={to} style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'none' }}>{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Sports</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Cricket', 'Football', 'Badminton', 'Tennis', 'Pickleball'].map((s) => (
                <Link key={s} to={`/search?sport=${s.toLowerCase()}`} style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'none' }}>{s}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[[Mail, 'support@sportslot.in'], [Phone, '+91 7727892092'], [MapPin, 'Vaishali Nagar, Jaipur, Rajasthan 302021']].map(([Icon, text], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <div style={{ width: 32, height: 32, background: '#1f2937', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} color="#f87171" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#6b7280' }}>&copy; 2026 SportSlot. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
