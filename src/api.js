const BASE = '/api';

function getToken() {
  return localStorage.getItem('sportslot_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function saveAuth(token, user) {
  localStorage.setItem('sportslot_token', token);
  localStorage.setItem('sportslot_user', JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem('sportslot_user');
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem('sportslot_token');
  localStorage.removeItem('sportslot_user');
}

export function isLoggedIn() {
  return !!getToken();
}

export async function signup(data) {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  saveAuth(json.token, json.user);
  return json;
}

export async function login(email, password, role) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  saveAuth(json.token, json.user);
  return json;
}

export async function fetchVenues(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/venues${qs ? '?' + qs : ''}`);
  return res.json();
}

export async function fetchVenue(id, date) {
  const qs = date ? `?date=${date}` : '';
  const res = await fetch(`${BASE}/venues/${id}${qs}`);
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}

export async function fetchMyBookings() {
  const res = await fetch(`${BASE}/bookings/my`, { headers: authHeaders() });
  return res.json();
}

export async function fetchReviews(venueId) {
  const res = await fetch(`${BASE}/reviews/venue/${venueId}`);
  return res.json();
}

export async function postReview(venueId, data) {
  const res = await fetch(`${BASE}/reviews/venue/${venueId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
}
