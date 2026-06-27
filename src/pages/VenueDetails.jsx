import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, IndianRupee, CheckCircle, ChevronLeft, ChevronRight, Wifi, Car, Droplets, ShieldCheck, Coffee, Dumbbell, Send } from 'lucide-react';
import { fetchVenue, fetchReviews, postReview, isLoggedIn } from '../api';

const amenityIcons = { 'Floodlights': Wifi, 'Parking': Car, 'Drinking Water': Droplets, 'First Aid': ShieldCheck, 'Cafeteria': Coffee, 'Air Conditioning': Wifi, 'Changing Rooms': Dumbbell };

export default function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => { fetchVenue(id).then(v => { setVenue(v); setLoading(false); }); }, [id]);

  const [reviewData, setReviewData] = useState({ reviews: [], averageRating: 0, totalReviews: 0, distribution: {} });
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', text: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => { fetchReviews(id).then(setReviewData); }, [id]);

  useEffect(() => {
    if (!selectedDate || !id) return;
    fetchVenue(id, selectedDate).then(v => setVenue(v));
  }, [selectedDate, id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) { navigate('/login'); return; }
    setReviewError('');
    setReviewSubmitting(true);
    try {
      await postReview(id, reviewForm);
      setReviewForm({ rating: 5, title: '', text: '' });
      fetchReviews(id).then(setReviewData);
    } catch (err) { setReviewError(err.message); }
    finally { setReviewSubmitting(false); }
  };

  if (loading) return <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}><p style={{ fontSize: 18, color: '#888' }}>Loading venue...</p></div>;
  if (!venue || venue.error) return <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}><h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Venue not found</h2><button onClick={() => navigate('/search')} style={{ color: '#dc2626', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>Back to Search</button></div>;

  const dates = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toISOString().split('T')[0]; });
  const formatDate = (s) => new Date(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const toggleSlot = (slot) => { if (venue.bookedSlots.includes(slot)) return; setSelectedSlots((p) => p.includes(slot) ? p.filter((s) => s !== slot) : [...p, slot]); };
  const totalHours = selectedSlots.length;
  const totalPrice = totalHours * venue.pricePerHour;
  const sortedSlots = [...selectedSlots].sort((a, b) => { const toMin = (s) => { const [t, p] = s.split(' '); let [h] = t.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h; }; return toMin(a) - toMin(b); });
  const timeRange = sortedSlots.length > 0 ? `${sortedSlots[0]} - ${(() => { const l = sortedSlots[sortedSlots.length - 1]; const [t, p] = l.split(' '); let [h] = t.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; h += 1; const np = h >= 12 ? 'PM' : 'AM'; const dh = h > 12 ? h - 12 : h === 0 ? 12 : h; return `${dh}:00 ${np}`; })()}` : '';

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 20px 60px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: '#888', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28 }}>
        <ChevronLeft size={20} /> Back to results
      </button>

      <div className="grid-venue-detail">
        {/* Left */}
        <div>
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', marginBottom: 16 }}>
            <img src={venue.gallery[currentImage]} alt={venue.name} style={{ width: '100%', height: 'clamp(240px, 40vw, 460px)', objectFit: 'cover', display: 'block' }} />
            {venue.gallery.length > 1 && <>
              <button onClick={() => setCurrentImage(p => p === 0 ? venue.gallery.length - 1 : p - 1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><ChevronLeft size={18} /></button>
              <button onClick={() => setCurrentImage(p => p === venue.gallery.length - 1 ? 0 : p + 1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><ChevronRight size={18} /></button>
            </>}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
            {venue.gallery.map((img, i) => (
              <button key={i} onClick={() => setCurrentImage(i)} style={{ width: 76, height: 52, borderRadius: 10, overflow: 'hidden', border: i === currentImage ? '2px solid #dc2626' : '2px solid transparent', opacity: i === currentImage ? 1 : 0.6, cursor: 'pointer', padding: 0, background: 'none', flexShrink: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: 10 }}>{venue.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <MapPin size={16} /><span>{venue.address}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fffbeb', padding: '4px 12px', borderRadius: 16, marginLeft: 4 }}><Star size={14} color="#eab308" fill="#eab308" /><span style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{venue.rating}</span><span style={{ fontSize: 13, color: '#888' }}>({venue.reviews})</span></span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {venue.sports.map((s) => <span key={s} style={{ padding: '5px 16px', background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 600, borderRadius: 16 }}>{s}</span>)}
            </div>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8 }}>{venue.description}</p>
          </div>

          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 18 }}>Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {venue.amenities.map((a) => { const Icon = amenityIcons[a] || CheckCircle; return (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#f9fafb', borderRadius: 12 }}>
                  <div style={{ width: 32, height: 32, background: '#fef2f2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={16} color="#dc2626" /></div>
                  <span style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>{a}</span>
                </div>
              ); })}
            </div>
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>Reviews</h2>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fffbeb', padding: '6px 14px', borderRadius: 16 }}>
                <Star size={16} color="#eab308" fill="#eab308" />
                <span style={{ fontWeight: 700, fontSize: 16, color: '#111' }}>{reviewData.averageRating}</span>
                <span style={{ fontSize: 13, color: '#888' }}>({reviewData.totalReviews} reviews)</span>
              </span>
            </div>

            {/* Rating distribution */}
            <div style={{ background: '#f9fafb', borderRadius: 14, padding: 20, marginBottom: 28 }}>
              {[5, 4, 3, 2, 1].map(n => {
                const count = reviewData.distribution[n] || 0;
                const pct = reviewData.totalReviews ? Math.round(count / reviewData.totalReviews * 100) : 0;
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: n > 1 ? 8 : 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#555', width: 16 }}>{n}</span>
                    <Star size={13} color="#eab308" fill="#eab308" />
                    <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: '#eab308', borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, color: '#888', width: 24, textAlign: 'right' }}>{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Write a review */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, marginBottom: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Write a Review</h3>
              {reviewError && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{reviewError}</div>}
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Rating</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                        <Star size={24} color="#eab308" fill={n <= reviewForm.rating ? '#eab308' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Title (optional)</label>
                  <input type="text" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Sum it up in a few words" maxLength={120}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Your Review</label>
                  <textarea required value={reviewForm.text} onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })} placeholder="Share your experience..." maxLength={1000} rows={3}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" disabled={reviewSubmitting}
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: reviewSubmitting ? '#f87171' : '#dc2626', color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: reviewSubmitting ? 'wait' : 'pointer' }}>
                  <Send size={15} /> {reviewSubmitting ? 'Posting...' : 'Post Review'}
                </button>
              </form>
            </div>

            {/* Review list */}
            {reviewData.reviews.map(r => (
              <div key={r._id} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#dc2626' }}>
                      {r.userName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{r.userName}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(n => <Star key={n} size={14} color="#eab308" fill={n <= r.rating ? '#eab308' : 'none'} />)}
                  </div>
                </div>
                {r.title && <div style={{ fontWeight: 600, fontSize: 15, color: '#111', marginBottom: 4 }}>{r.title}</div>}
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{r.text}</p>
                {r.ownerReply && (
                  <div style={{ marginTop: 12, padding: 14, background: '#f9fafb', borderRadius: 10, borderLeft: '3px solid #dc2626' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#dc2626', marginBottom: 4 }}>Owner Reply</div>
                    <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{r.ownerReply.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18, padding: 24, position: 'sticky', top: 82, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid #f3f4f6' }}>
              <IndianRupee size={22} color="#111" />
              <span style={{ fontSize: 32, fontWeight: 800, color: '#111' }}>{venue.pricePerHour.toLocaleString()}</span>
              <span style={{ fontSize: 15, color: '#999', marginLeft: 4 }}>/hour</span>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 10 }}>Select Date</label>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                {dates.map((d) => (
                  <button key={d} onClick={() => { setSelectedDate(d); setSelectedSlots([]); }}
                    style={{ padding: '9px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', background: selectedDate === d ? '#dc2626' : '#f3f4f6', color: selectedDate === d ? '#fff' : '#555', flexShrink: 0 }}>
                    {formatDate(d)}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 10 }}>Time Slots</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, maxHeight: 240, overflowY: 'auto' }}>
                  {venue.timeSlots.map((slot) => {
                    const booked = venue.bookedSlots.includes(slot);
                    const selected = selectedSlots.includes(slot);
                    return (
                      <button key={slot} onClick={() => toggleSlot(slot)} disabled={booked}
                        style={{ padding: '9px 4px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: booked ? 'not-allowed' : 'pointer',
                          background: booked ? '#f3f4f6' : selected ? '#dc2626' : '#f9fafb',
                          color: booked ? '#ccc' : selected ? '#fff' : '#555',
                          textDecoration: booked ? 'line-through' : 'none',
                        }}>{slot}</button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: '#999' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 2 }} />Available</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, background: '#dc2626', borderRadius: 2 }} />Selected</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, background: '#f3f4f6', borderRadius: 2 }} />Booked</div>
                </div>
              </div>
            )}

            {selectedSlots.length > 0 && (
              <div style={{ background: '#fef2f2', borderRadius: 14, padding: 18, marginBottom: 22 }}>
                <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#111' }}>Booking Summary</h3>
                {[['Date', formatDate(selectedDate)], ['Time', timeRange], ['Duration', `${totalHours} hr${totalHours > 1 ? 's' : ''}`], ['Rate', `₹${venue.pricePerHour.toLocaleString()}/hr`]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span style={{ color: '#888' }}>{k}</span><span style={{ fontWeight: 600, color: '#111' }}>{v}</span></div>
                ))}
                <div style={{ borderTop: '1px solid #fecaca', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 17 }}>
                  <span style={{ fontWeight: 700 }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#dc2626' }}>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            <button onClick={() => { if (!selectedDate || !selectedSlots.length) return; navigate('/checkout', { state: { venueId: venue.id, venueName: venue.name, sport: venue.sports[0], date: selectedDate, timeSlot: timeRange, duration: totalHours, pricePerHour: venue.pricePerHour, total: totalPrice, slots: selectedSlots } }); }}
              disabled={!selectedDate || !selectedSlots.length}
              style={{ width: '100%', padding: '14px 0', borderRadius: 12, fontWeight: 700, fontSize: 15, border: 'none', cursor: selectedDate && selectedSlots.length ? 'pointer' : 'not-allowed',
                background: selectedDate && selectedSlots.length ? '#dc2626' : '#e5e7eb', color: selectedDate && selectedSlots.length ? '#fff' : '#aaa' }}>
              {!selectedDate ? 'Select a date first' : !selectedSlots.length ? 'Select time slots' : `Book Now — ₹${totalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
