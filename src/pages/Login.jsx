import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Building2, ShieldCheck } from 'lucide-react';
import { login } from '../api';

const inputStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, color: '#333', outline: 'none', background: '#fff', boxSizing: 'border-box' };

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'user', label: 'User', icon: User },
    { id: 'owner', label: 'Venue Owner', icon: Building2 },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await login(form.email, form.password, role);
      if (user.role === 'owner') navigate('/owner-dashboard');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: '#f9fafb' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src="/logo.png" alt="SportSlot" style={{ height: 60, objectFit: 'contain', margin: '0 auto 20px', display: 'block' }} />
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111' }}>Welcome back</h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>Sign in to your SportSlot account</p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '36px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Login as</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {roles.map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  style={{ padding: '16px 8px', borderRadius: 14, textAlign: 'center', cursor: 'pointer', border: role === r.id ? '2px solid #dc2626' : '2px solid #f3f4f6', background: role === r.id ? '#fef2f2' : '#f9fafb', transition: 'all 0.2s' }}>
                  <r.icon size={22} color={role === r.id ? '#dc2626' : '#999'} style={{ margin: '0 auto 8px', display: 'block' }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: role === r.id ? '#dc2626' : '#666' }}>{r.label}</div>
                </button>
              ))}
            </div>
          </div>

          {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{error}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Enter your password" style={{ ...inputStyle, paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPw ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#666' }}><input type="checkbox" style={{ accentColor: '#dc2626' }} /> Remember me</label>
              <a href="#" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px 0', background: loading ? '#f87171' : '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: loading ? 'wait' : 'pointer', marginTop: 4 }}>{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 15, color: '#888', marginTop: 28 }}>
            Don't have an account? <Link to="/signup" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
