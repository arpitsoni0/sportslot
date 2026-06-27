import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { sports } from '../data/mockData';
import { fetchVenues } from '../api';
import VenueCard from '../components/VenueCard';

const container = { maxWidth: 1200, margin: '0 auto', padding: '0 32px' };

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sportFilter, setSportFilter] = useState(searchParams.get('sport') || '');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [maxDistance, setMaxDistance] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    const params = {};
    if (sportFilter) params.sport = sportFilter;
    const city = searchParams.get('city');
    if (city) params.city = city;
    const pincode = searchParams.get('pincode');
    if (pincode) params.pincode = pincode;
    if (maxPrice < 5000) params.maxPrice = maxPrice;
    if (maxDistance < 10) params.maxDistance = maxDistance;
    if (minRating > 0) params.minRating = minRating;
    fetchVenues(params).then(setFilteredVenues);
  }, [sportFilter, maxPrice, maxDistance, minRating, searchParams]);

  const clearFilters = () => { setSportFilter(''); setMaxPrice(5000); setMaxDistance(10); setMinRating(0); };
  const activeFilterCount = [sportFilter, maxPrice < 5000, maxDistance < 10, minRating > 0].filter(Boolean).length;

  const labelStyle = { display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 10 };
  const selectStyle = { width: '100%', padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, background: '#fff', outline: 'none' };

  return (
    <div style={{ ...container, padding: '48px 32px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>Search Results</h1>
          <p style={{ color: '#888', marginTop: 8, fontSize: 16 }}>{filteredVenues.length} venues found</p>
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          <SlidersHorizontal size={18} /> Filters
          {activeFilterCount > 0 && <span style={{ width: 22, height: 22, background: '#dc2626', color: '#fff', borderRadius: '50%', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeFilterCount}</span>}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 40 }}>
        <aside className={`sidebar-search ${showFilters ? 'show-mobile' : ''}`}>
          {showFilters && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Filters</h2>
              <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
            </div>
          )}
          {!showFilters && <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 28 }}>Filters</h2>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <label style={labelStyle}>Sport Type</label>
              <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)} style={selectStyle}>
                <option value="">All Sports</option>
                {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Max Price: <span style={{ color: '#dc2626' }}>₹{maxPrice.toLocaleString()}/hr</span></label>
              <input type="range" min="200" max="5000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#dc2626' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#aaa', marginTop: 6 }}><span>₹200</span><span>₹5,000</span></div>
            </div>
            <div>
              <label style={labelStyle}>Max Distance: <span style={{ color: '#dc2626' }}>{maxDistance} km</span></label>
              <input type="range" min="1" max="10" step="0.5" value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} style={{ width: '100%', accentColor: '#dc2626' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#aaa', marginTop: 6 }}><span>1 km</span><span>10 km</span></div>
            </div>
            <div>
              <label style={labelStyle}>Minimum Rating</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button key={r} onClick={() => setMinRating(r)}
                    style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: minRating === r ? '#dc2626' : '#f3f4f6', color: minRating === r ? '#fff' : '#555' }}>
                    {r === 0 ? 'All' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} style={{ padding: '12px 0', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 14, fontWeight: 600, color: '#555', background: '#fff', cursor: 'pointer' }}>Clear All Filters</button>
            )}
          </div>
        </aside>

        <div style={{ flex: 1 }}>
          {filteredVenues.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {filteredVenues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🏟️</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 10 }}>No venues found</h3>
              <p style={{ color: '#888', marginBottom: 28, fontSize: 16 }}>Try adjusting your filters or search in a different area.</p>
              <button onClick={clearFilters} style={{ padding: '12px 32px', background: '#dc2626', color: '#fff', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
