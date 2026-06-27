import { useState } from 'react';
import { Calendar, Clock, IndianRupee, Eye, CheckCircle, Image } from 'lucide-react';
import { venues, bookings } from '../data/mockData';

const container = { maxWidth: 1200, margin: '0 auto', padding: '0 32px' };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden' };
const inputStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, color: '#333', outline: 'none', background: '#fff', boxSizing: 'border-box' };

export default function OwnerDashboard() {
  const [tab, setTab] = useState('overview');
  const v = venues[0];
  const ob = bookings.filter((b) => b.venueId === v.id);
  const [vf, setVf] = useState({ name: v.name, description: v.description, address: v.address, city: v.city, pincode: v.pincode, price: v.pricePerHour });
  const [slots, setSlots] = useState(v.timeSlots.map((t) => ({ time: t, available: !v.bookedSlots.includes(t) })));

  const stats = [
    { label: 'Total Bookings', value: ob.length, icon: Calendar, bg: '#eff6ff', color: '#2563eb' },
    { label: 'Revenue', value: `₹${ob.reduce((s, b) => s + b.total, 0).toLocaleString()}`, icon: IndianRupee, bg: '#ecfdf5', color: '#16a34a' },
    { label: 'Active Slots', value: slots.filter((s) => s.available).length, icon: Clock, bg: '#f5f3ff', color: '#7c3aed' },
    { label: 'Rating', value: v.rating, icon: Eye, bg: '#fffbeb', color: '#d97706' },
  ];

  const tabs = ['Overview', 'Venue Details', 'Time Slots', 'Bookings'];

  return (
    <div style={{ ...container, padding: '48px 32px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>Owner Dashboard</h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>Welcome back, {v.owner}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: '#ecfdf5', color: '#16a34a', borderRadius: 24, fontSize: 14, fontWeight: 600 }}><CheckCircle size={16} /> Venue Approved</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 36 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...cardStyle, padding: 24 }}>
            <div style={{ width: 48, height: 48, background: s.bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><s.icon size={22} color={s.color} /></div>
            <div style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111', marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #e5e7eb', marginBottom: 32 }}>
        {tabs.map((t) => { const id = t.toLowerCase().replace(/ /g, ''); return (
          <button key={t} onClick={() => setTab(id === 'venuedetails' ? 'venue' : id === 'timeslots' ? 'slots' : id)}
            style={{ padding: '12px 20px', fontSize: 15, fontWeight: 600, border: 'none', borderBottom: tab === (id === 'venuedetails' ? 'venue' : id === 'timeslots' ? 'slots' : id) ? '2px solid #dc2626' : '2px solid transparent', color: tab === (id === 'venuedetails' ? 'venue' : id === 'timeslots' ? 'slots' : id) ? '#dc2626' : '#999', background: 'none', cursor: 'pointer', marginBottom: -1 }}>
            {t}
          </button>
        ); })}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 28 }}>
          <div style={{ ...cardStyle, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Venue Preview</h2>
            <img src={v.image} alt={v.name} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 14, display: 'block', marginBottom: 18 }} />
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{v.name}</h3>
            <p style={{ fontSize: 15, color: '#888', marginBottom: 14 }}>{v.address}</p>
            <div style={{ display: 'flex', gap: 8 }}>{v.sports.map((s) => <span key={s} style={{ padding: '5px 14px', background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 600, borderRadius: 16 }}>{s}</span>)}</div>
          </div>
          <div style={{ ...cardStyle, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Recent Bookings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ob.map((b) => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#f9fafb', borderRadius: 14 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>{b.userName}</div><div style={{ fontSize: 13, color: '#888', marginTop: 3 }}>{b.sport} &middot; {b.timeSlot}</div></div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontSize: 15, fontWeight: 700 }}>₹{b.total.toLocaleString()}</div><span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 10, fontWeight: 600, background: b.status === 'confirmed' ? '#ecfdf5' : '#fffbeb', color: b.status === 'confirmed' ? '#16a34a' : '#d97706' }}>{b.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'venue' && (
        <div style={{ ...cardStyle, padding: 32, maxWidth: 640 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Edit Venue Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[['Venue Name', 'name', 'text'], ['Description', 'description', 'textarea'], ['Address', 'address', 'text']].map(([l, k, t]) => (
              <div key={k}><label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{l}</label>
                {t === 'textarea' ? <textarea rows={4} value={vf[k]} onChange={e => setVf({...vf, [k]: e.target.value})} style={{ ...inputStyle, resize: 'none' }} /> : <input type="text" value={vf[k]} onChange={e => setVf({...vf, [k]: e.target.value})} style={inputStyle} />}
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>City</label><input type="text" value={vf.city} onChange={e => setVf({...vf, city: e.target.value})} style={inputStyle} /></div>
              <div><label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Pincode</label><input type="text" value={vf.pincode} onChange={e => setVf({...vf, pincode: e.target.value})} style={inputStyle} /></div>
            </div>
            <div><label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Price per Hour (₹)</label><input type="number" value={vf.price} onChange={e => setVf({...vf, price: Number(e.target.value)})} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 10 }}>Upload Images</label>
              <div style={{ border: '2px dashed #e5e7eb', borderRadius: 16, padding: 40, textAlign: 'center', cursor: 'pointer' }}><Image size={36} color="#ccc" style={{ margin: '0 auto 10px', display: 'block' }} /><p style={{ fontSize: 15, color: '#888' }}>Click to upload venue images</p><p style={{ fontSize: 13, color: '#bbb', marginTop: 4 }}>PNG, JPG up to 5MB</p></div>
            </div>
            <button style={{ padding: '14px 32px', background: '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === 'slots' && (
        <div style={{ ...cardStyle, padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>Manage Time Slots</h2><p style={{ fontSize: 14, color: '#888' }}>Click to toggle availability</p></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {slots.map((s, i) => (
              <button key={i} onClick={() => setSlots(p => p.map((x, j) => j === i ? {...x, available: !x.available} : x))}
                style={{ padding: 16, borderRadius: 14, fontSize: 14, fontWeight: 600, border: `2px solid ${s.available ? '#bbf7d0' : '#fecaca'}`, background: s.available ? '#f0fdf4' : '#fef2f2', color: s.available ? '#16a34a' : '#dc2626', cursor: 'pointer', textAlign: 'center' }}>
                <div>{s.time}</div><div style={{ fontSize: 12, marginTop: 6, fontWeight: 500 }}>{s.available ? 'Available' : 'Unavailable'}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 14, color: '#888' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 4 }} /> Available</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, background: '#fef2f2', border: '2px solid #fecaca', borderRadius: 4 }} /> Unavailable</div>
          </div>
        </div>
      )}

      {tab === 'bookings' && (
        <div style={cardStyle}>
          <div style={{ padding: 28, borderBottom: '1px solid #f3f4f6' }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>All Booking Requests</h2></div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#f9fafb' }}>
                {['Booking ID', 'Customer', 'Sport', 'Date & Time', 'Amount', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '14px 24px', fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {ob.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '18px 24px', fontSize: 14, fontWeight: 600 }}>{b.id}</td>
                    <td style={{ padding: '18px 24px' }}><div style={{ fontSize: 14, fontWeight: 600 }}>{b.userName}</div><div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{b.userPhone}</div></td>
                    <td style={{ padding: '18px 24px', fontSize: 14 }}>{b.sport}</td>
                    <td style={{ padding: '18px 24px' }}><div style={{ fontSize: 14 }}>{b.date}</div><div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{b.timeSlot}</div></td>
                    <td style={{ padding: '18px 24px', fontSize: 14, fontWeight: 700 }}>₹{b.total.toLocaleString()}</td>
                    <td style={{ padding: '18px 24px' }}><span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 10, fontWeight: 600, background: b.status === 'confirmed' ? '#ecfdf5' : '#fffbeb', color: b.status === 'confirmed' ? '#16a34a' : '#d97706' }}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
