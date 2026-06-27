import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Shield, CreditCard } from 'lucide-react';
import { createBooking, isLoggedIn } from '../api';

const container = { maxWidth: 960, margin: '0 auto', padding: '0 32px' };
const inputStyle = { width: '100%', padding: '14px 18px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, color: '#333', outline: 'none', background: '#fff' };
const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 };
const cardStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' };

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  if (!state) return <div style={{ ...container, padding: '100px 32px', textAlign: 'center' }}><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>No booking data</h2><button onClick={() => navigate('/search')} style={{ color: '#dc2626', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>Browse Venues</button></div>;

  const formatDate = (s) => new Date(s).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (confirmed) {
    const bookingId = bookingResult?.id || `BK${Date.now().toString().slice(-6)}`;
    return (
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <CheckCircle size={44} color="#16a34a" />
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111', marginBottom: 10 }}>Booking Confirmed!</h1>
        <p style={{ color: '#888', fontSize: 17, marginBottom: 36 }}>Your booking has been confirmed successfully.</p>
        <div style={{ ...cardStyle, textAlign: 'left', marginBottom: 36 }}>
          {[['Booking ID', bookingId], ['Venue', state.venueName], ['Sport', state.sport], ['Date', formatDate(state.date)], ['Time', state.timeSlot], ['Duration', `${state.duration} hour${state.duration > 1 ? 's' : ''}`]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}><span style={{ color: '#888' }}>{k}</span><span style={{ fontWeight: 600, color: '#111' }}>{v}</span></div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, paddingTop: 14, marginTop: 6 }}><span style={{ fontWeight: 700 }}>Amount Paid</span><span style={{ fontWeight: 800, color: '#16a34a' }}>₹{state.total.toLocaleString()}</span></div>
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/')} style={{ padding: '12px 32px', background: '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 15 }}>Back to Home</button>
          <button onClick={() => navigate('/search')} style={{ padding: '12px 32px', background: '#fff', color: '#555', borderRadius: 12, fontWeight: 600, border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: 15 }}>Book Another Venue</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...container, padding: '48px 32px 80px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: '#888', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32 }}><ChevronLeft size={20} /> Back to venue</button>
      <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', marginBottom: 36, letterSpacing: '-0.5px' }}>Checkout</h1>

      <div className="grid-checkout">
        <div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!form.name || !form.email || !form.phone) return;
            if (!isLoggedIn()) { navigate('/login'); return; }
            setError('');
            setSubmitting(true);
            try {
              const result = await createBooking({ venueId: state.venueId, sport: state.sport, date: state.date, slots: state.slots });
              setBookingResult(result);
              setConfirmed(true);
            } catch (err) { setError(err.message); }
            finally { setSubmitting(false); }
          }}>
            <div style={{ ...cardStyle, marginBottom: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Your Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div><label style={labelStyle}>Full Name</label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Enter your full name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Email Address</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" style={inputStyle} /></div>
                <div><label style={labelStyle}>Phone Number</label><input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210" style={inputStyle} /></div>
              </div>
            </div>
            <div style={cardStyle}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Payment</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, background: '#fee2e2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CreditCard size={20} color="#dc2626" /></div>
                <div><div style={{ fontSize: 15, fontWeight: 600 }}>Online Payment</div><div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>UPI, Credit/Debit Card, Net Banking</div></div>
              </div>
              {error && <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#dc2626', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{error}</div>}
              <button type="submit" disabled={submitting} style={{ width: '100%', padding: '16px 0', background: submitting ? '#f87171' : '#dc2626', color: '#fff', borderRadius: 14, fontWeight: 700, fontSize: 16, border: 'none', cursor: submitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <Shield size={18} /> {submitting ? 'Processing...' : `Pay ₹${state.total.toLocaleString()}`}
              </button>
              <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Shield size={14} /> Secured by 256-bit SSL encryption</p>
            </div>
          </form>
        </div>

        <div>
          <div style={{ ...cardStyle, position: 'sticky', top: 90 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Booking Summary</h2>
            {[['Venue', state.venueName], ['Sport', state.sport], ['Date', formatDate(state.date)], ['Time Slot', state.timeSlot], ['Duration', `${state.duration} hour${state.duration > 1 ? 's' : ''}`], ['Price/hr', `₹${state.pricePerHour.toLocaleString()}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}><span style={{ color: '#888' }}>{k}</span><span style={{ fontWeight: 600, color: '#111', textAlign: 'right' }}>{v}</span></div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, paddingTop: 16, marginTop: 8 }}><span style={{ fontWeight: 700 }}>Total</span><span style={{ fontWeight: 800, color: '#dc2626' }}>₹{state.total.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
