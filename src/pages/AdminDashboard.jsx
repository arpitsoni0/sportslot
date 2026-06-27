import { useState } from 'react';
import { Users, Building2, Calendar, IndianRupee, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { users, owners, bookings } from '../data/mockData';

const container = { maxWidth: 1200, margin: '0 auto', padding: '0 32px' };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden' };

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const totalRevenue = bookings.reduce((s, b) => s + b.total, 0);
  const commission = Math.round(totalRevenue * 0.1);

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, bg: '#eff6ff', color: '#2563eb', change: '+12%' },
    { label: 'Venue Owners', value: owners.length, icon: Building2, bg: '#f5f3ff', color: '#7c3aed', change: '+8%' },
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, bg: '#ecfdf5', color: '#16a34a', change: '+23%' },
    { label: 'Commission (10%)', value: `₹${commission.toLocaleString()}`, icon: IndianRupee, bg: '#fffbeb', color: '#d97706', change: '+18%' },
  ];

  const tabs = ['Overview', 'Users', 'Venue Owners', 'Bookings'];
  const thStyle = { textAlign: 'left', padding: '14px 24px', fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 };
  const tdStyle = { padding: '18px 24px', fontSize: 14 };

  return (
    <div style={{ ...container, padding: '48px 32px 80px' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>Admin Dashboard</h1>
        <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>Platform overview and management</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ ...cardStyle, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, background: s.bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><s.icon size={22} color={s.color} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#16a34a', background: '#ecfdf5', padding: '4px 10px', borderRadius: 12 }}><TrendingUp size={14} /> {s.change}</div>
            </div>
            <div style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111', marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: 20, padding: '36px 40px', color: '#fff', marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Total Platform Revenue</p><p style={{ fontSize: 42, fontWeight: 800, marginTop: 6, letterSpacing: '-1px' }}>₹{totalRevenue.toLocaleString()}</p></div>
        <div style={{ textAlign: 'right' }}><p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Platform Commission (10%)</p><p style={{ fontSize: 32, fontWeight: 800, marginTop: 6 }}>₹{commission.toLocaleString()}</p></div>
      </div>

      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #e5e7eb', marginBottom: 32 }}>
        {tabs.map((t) => { const id = t.toLowerCase().replace(/ /g, ''); return (
          <button key={t} onClick={() => setTab(id === 'venueowners' ? 'owners' : id)}
            style={{ padding: '12px 20px', fontSize: 15, fontWeight: 600, border: 'none', borderBottom: tab === (id === 'venueowners' ? 'owners' : id) ? '2px solid #dc2626' : '2px solid transparent', color: tab === (id === 'venueowners' ? 'owners' : id) ? '#dc2626' : '#999', background: 'none', cursor: 'pointer', marginBottom: -1 }}>
            {t}
          </button>
        ); })}
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 28 }}>
          <div style={{ ...cardStyle, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Recent Bookings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#f9fafb', borderRadius: 14 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 600 }}>{b.userName}</div><div style={{ fontSize: 13, color: '#888', marginTop: 3 }}>{b.venueName} &middot; {b.sport}</div></div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontSize: 15, fontWeight: 700 }}>₹{b.total.toLocaleString()}</div><span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 10, fontWeight: 600, background: b.status === 'confirmed' ? '#ecfdf5' : '#fffbeb', color: b.status === 'confirmed' ? '#16a34a' : '#d97706' }}>{b.status}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...cardStyle, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Pending Approvals</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {owners.filter(o => o.status === 'pending').map((o) => (
                <div key={o.id} style={{ padding: 20, background: '#f9fafb', borderRadius: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div><div style={{ fontSize: 15, fontWeight: 600 }}>{o.businessName}</div><div style={{ fontSize: 13, color: '#888', marginTop: 3 }}>{o.name} &middot; {o.city}</div></div>
                    <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 10, fontWeight: 600, background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> Pending</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button style={{ flex: 1, padding: '10px 0', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><CheckCircle size={16} /> Approve</button>
                    <button style={{ flex: 1, padding: '10px 0', background: '#fff', color: '#555', border: '1px solid #e5e7eb', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><XCircle size={16} /> Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div style={cardStyle}>
          <div style={{ padding: 28, borderBottom: '1px solid #f3f4f6' }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>All Users</h2></div>
          <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: '#f9fafb' }}>{['Name', 'Email', 'Phone', 'Join Date'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
            <tbody>{users.map(u => <tr key={u.id} style={{ borderBottom: '1px solid #f5f5f5' }}><td style={{ ...tdStyle, fontWeight: 600 }}>{u.name}</td><td style={tdStyle}>{u.email}</td><td style={tdStyle}>{u.phone}</td><td style={{ ...tdStyle, color: '#888' }}>{u.joinDate}</td></tr>)}</tbody>
          </table></div>
        </div>
      )}

      {tab === 'owners' && (
        <div style={cardStyle}>
          <div style={{ padding: 28, borderBottom: '1px solid #f3f4f6' }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>All Venue Owners</h2></div>
          <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: '#f9fafb' }}>{['Owner', 'Business', 'City', 'Status', 'Actions'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
            <tbody>{owners.map(o => <tr key={o.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
              <td style={tdStyle}><div style={{ fontWeight: 600 }}>{o.name}</div><div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{o.email}</div></td>
              <td style={{ ...tdStyle, fontWeight: 500 }}>{o.businessName}</td>
              <td style={tdStyle}>{o.city}, {o.pincode}</td>
              <td style={tdStyle}><span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 10, fontWeight: 600, background: o.status === 'approved' ? '#ecfdf5' : '#fffbeb', color: o.status === 'approved' ? '#16a34a' : '#d97706' }}>{o.status}</span></td>
              <td style={tdStyle}>{o.status === 'pending' ? <div style={{ display: 'flex', gap: 8 }}><button style={{ padding: '6px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Approve</button><button style={{ padding: '6px 16px', background: '#fff', color: '#555', border: '1px solid #e5e7eb', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Reject</button></div> : <span style={{ color: '#ccc' }}>&mdash;</span>}</td>
            </tr>)}</tbody>
          </table></div>
        </div>
      )}

      {tab === 'bookings' && (
        <div style={cardStyle}>
          <div style={{ padding: 28, borderBottom: '1px solid #f3f4f6' }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>All Bookings</h2></div>
          <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ background: '#f9fafb' }}>{['ID', 'User', 'Venue', 'Sport', 'Date & Time', 'Amount', 'Status'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
            <tbody>{bookings.map(b => <tr key={b.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{b.id}</td>
              <td style={{ ...tdStyle, fontWeight: 500 }}>{b.userName}</td>
              <td style={tdStyle}>{b.venueName}</td>
              <td style={tdStyle}>{b.sport}</td>
              <td style={tdStyle}><div>{b.date}</div><div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{b.timeSlot}</div></td>
              <td style={{ ...tdStyle, fontWeight: 700 }}>₹{b.total.toLocaleString()}</td>
              <td style={tdStyle}><span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 10, fontWeight: 600, background: b.status === 'confirmed' ? '#ecfdf5' : '#fffbeb', color: b.status === 'confirmed' ? '#16a34a' : '#d97706' }}>{b.status}</span></td>
            </tr>)}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}
