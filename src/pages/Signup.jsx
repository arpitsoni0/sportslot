import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Building2 } from 'lucide-react';
import { sports } from '../data/mockData';
import { signup } from '../api';

const inputStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, color: '#333', outline: 'none', background: '#fff', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 };

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [showPw, setShowPw] = useState(false);
  const [uf, setUf] = useState({ name: '', email: '', phone: '', password: '' });
  const [of, setOf] = useState({ name: '', email: '', phone: '', password: '', biz: '', city: '', pin: '', sport: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: '#f9fafb' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src="/logo.png" alt="SportSlot" style={{ height: 60, objectFit: 'contain', margin: '0 auto 20px', display: 'block' }} />
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111' }}>Create an account</h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>Join SportSlot today</p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '36px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', padding: 5, background: '#f3f4f6', borderRadius: 14, marginBottom: 28 }}>
            {[['user', User, 'User'], ['owner', Building2, 'Venue Owner']].map(([id, Icon, label]) => (
              <button key={id} type="button" onClick={() => setRole(id)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 10, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', background: role === id ? '#fff' : 'transparent', color: role === id ? '#dc2626' : '#888', boxShadow: role === id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>

          {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{error}</div>}
          <form onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);
            try {
              const data = role === 'user'
                ? { name: uf.name, email: uf.email, phone: uf.phone, password: uf.password, role: 'user' }
                : { name: of.name, email: of.email, phone: of.phone, password: of.password, role: 'owner', businessName: of.biz, city: of.city, pincode: of.pin };
              await signup(data);
              navigate(role === 'owner' ? '/owner-dashboard' : '/');
            } catch (err) { setError(err.message); }
            finally { setLoading(false); }
          }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {role === 'user' ? <>
              <div><label style={labelStyle}>Full Name</label><input type="text" required value={uf.name} onChange={e => setUf({...uf, name: e.target.value})} placeholder="Enter your full name" style={inputStyle} /></div>
              <div><label style={labelStyle}>Email</label><input type="email" required value={uf.email} onChange={e => setUf({...uf, email: e.target.value})} placeholder="your@email.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone</label><input type="tel" required value={uf.phone} onChange={e => setUf({...uf, phone: e.target.value})} placeholder="+91 98765 43210" style={inputStyle} /></div>
              <div><label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} required value={uf.password} onChange={e => setUf({...uf, password: e.target.value})} placeholder="Create a password" style={{ ...inputStyle, paddingRight: 48 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showPw ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}</button>
                </div>
              </div>
            </> : <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={labelStyle}>Full Name</label><input type="text" required value={of.name} onChange={e => setOf({...of, name: e.target.value})} placeholder="Your name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Business Name</label><input type="text" required value={of.biz} onChange={e => setOf({...of, biz: e.target.value})} placeholder="Venue name" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Email</label><input type="email" required value={of.email} onChange={e => setOf({...of, email: e.target.value})} placeholder="your@email.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone</label><input type="tel" required value={of.phone} onChange={e => setOf({...of, phone: e.target.value})} placeholder="+91 98765 43210" style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={labelStyle}>City</label><input type="text" required value={of.city} onChange={e => setOf({...of, city: e.target.value})} placeholder="e.g. Jaipur" style={inputStyle} /></div>
                <div><label style={labelStyle}>Pincode</label><input type="text" required value={of.pin} onChange={e => setOf({...of, pin: e.target.value})} placeholder="302021" style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Primary Sport</label><select required value={of.sport} onChange={e => setOf({...of, sport: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}><option value="">Select sport</option>{sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
              <div><label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} required value={of.password} onChange={e => setOf({...of, password: e.target.value})} placeholder="Create a password" style={{ ...inputStyle, paddingRight: 48 }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>{showPw ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}</button>
                </div>
              </div>
            </>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px 0', background: loading ? '#f87171' : '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: loading ? 'wait' : 'pointer', marginTop: 4 }}>{loading ? 'Creating...' : role === 'owner' ? 'Register as Venue Owner' : 'Create Account'}</button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 15, color: '#888', marginTop: 28 }}>Already have an account? <Link to="/login" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
