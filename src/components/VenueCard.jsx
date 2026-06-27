import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee } from 'lucide-react';

export default function VenueCard({ venue }) {
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={venue.image} alt={venue.name} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', padding: '5px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={14} color="#eab308" fill="#eab308" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{venue.rating}</span>
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px' }}>
        <h3 style={{ fontWeight: 700, color: '#111', fontSize: 17, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{venue.name}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 13, marginBottom: 12 }}>
          <MapPin size={14} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{venue.address}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {venue.sports.map((sport) => (
            <span key={sport} style={{ padding: '4px 12px', background: '#fef2f2', color: '#dc2626', fontSize: 12, fontWeight: 600, borderRadius: 16 }}>
              {sport}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #f3f4f6', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IndianRupee size={18} color="#111" />
            <span style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>{venue.pricePerHour.toLocaleString()}</span>
            <span style={{ fontSize: 13, color: '#999', marginLeft: 2 }}>/hr</span>
          </div>
          <Link to={`/venue/${venue.id}`} style={{ padding: '9px 20px', background: '#dc2626', color: '#fff', fontSize: 14, fontWeight: 600, borderRadius: 10, textDecoration: 'none' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
