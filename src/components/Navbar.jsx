import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { getUser, logout, isLoggedIn } from '../api';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const user = getUser();
  const loggedIn = isLoggedIn();

  const handleLogout = () => { logout(); navigate('/'); };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Find Venues' },
    { path: '/owner-dashboard', label: 'Owner Dashboard' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: isMobile ? 70 : 100 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo.png" alt="SportSlot" style={{ height: isMobile ? 70 : 120, objectFit: 'contain' }} />
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                style={{ padding: '8px 18px', borderRadius: 10, fontSize: 15, fontWeight: 500, color: isActive(link.path) ? '#dc2626' : '#555', background: isActive(link.path) ? '#fef2f2' : 'transparent', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop auth buttons */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {loggedIn ? <>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{user?.name}</span>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: '#888', background: 'none', border: '1px solid #e5e7eb', borderRadius: 10, padding: '8px 16px', cursor: 'pointer' }}><LogOut size={16} /> Logout</button>
            </> : <>
              <Link to="/login" style={{ fontSize: 15, fontWeight: 500, color: '#555', textDecoration: 'none' }}>Log In</Link>
              <Link to="/signup" style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#dc2626', padding: '9px 24px', borderRadius: 10, textDecoration: 'none' }}>Sign Up</Link>
            </>}
          </div>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button onClick={() => setOpen(!open)}
            style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <X size={26} color="#333" /> : <Menu size={26} color="#333" />}
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && open && (
        <div style={{ padding: '8px 20px 20px', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '14px 16px', borderRadius: 10, fontSize: 16, fontWeight: 500, color: isActive(link.path) ? '#dc2626' : '#555', background: isActive(link.path) ? '#fef2f2' : 'transparent', textDecoration: 'none', marginBottom: 4 }}>
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid #f0f0f0', margin: '8px 0 12px' }} />
          {loggedIn ? <>
            <div style={{ padding: '14px 16px', fontSize: 15, fontWeight: 600, color: '#333' }}>{user?.name}</div>
            <button onClick={() => { setOpen(false); handleLogout(); }} style={{ display: 'block', width: '100%', padding: '14px 16px', fontSize: 16, fontWeight: 600, color: '#dc2626', background: '#fef2f2', borderRadius: 12, textAlign: 'center', border: 'none', cursor: 'pointer', marginTop: 8 }}>Logout</button>
          </> : <>
            <Link to="/login" onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: 16, fontWeight: 500, color: '#555', textDecoration: 'none' }}>Log In</Link>
            <Link to="/signup" onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: 16, fontWeight: 600, color: '#fff', background: '#dc2626', borderRadius: 12, textAlign: 'center', textDecoration: 'none', marginTop: 8 }}>Sign Up</Link>
          </>}
        </div>
      )}
    </nav>
  );
}
