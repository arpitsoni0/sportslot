import { Router } from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  const { venueId, sport, date, slots } = req.body;
  const userId = req.user.id;

  if (!venueId || !sport || !date || !slots?.length) {
    return res.status(400).json({ error: 'venueId, sport, date, and slots[] are required' });
  }

  const venue = await pool.query('SELECT price_per_hour FROM venues WHERE id = $1', [venueId]);
  if (!venue.rows.length) return res.status(404).json({ error: 'Venue not found' });

  const pricePerHour = venue.rows[0].price_per_hour;
  const duration = slots.length;
  const total = duration * pricePerHour;

  const sorted = [...slots].sort((a, b) => {
    const toMin = (s) => { const [t, p] = s.split(' '); let [h] = t.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; return h; };
    return toMin(a) - toMin(b);
  });
  const startTime = sorted[0];
  const lastSlot = sorted[sorted.length - 1];
  const endHour = (() => { const [t, p] = lastSlot.split(' '); let [h] = t.split(':').map(Number); if (p === 'PM' && h !== 12) h += 12; if (p === 'AM' && h === 12) h = 0; h += 1; const np = h >= 12 ? 'PM' : 'AM'; const dh = h > 12 ? h - 12 : h === 0 ? 12 : h; return `${dh}:00 ${np}`; })();

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const conflict = await client.query(
      `SELECT slot_time FROM booked_slots
       WHERE venue_id = $1 AND date = $2 AND slot_time = ANY($3::text[])
       FOR UPDATE`,
      [venueId, date, slots],
    );

    if (conflict.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({
        error: 'Some slots are already booked',
        conflicting: conflict.rows.map(r => r.slot_time),
      });
    }

    const booking = await client.query(
      `INSERT INTO bookings (venue_id, user_id, sport, date, start_time, end_time, duration, price_per_hour, total, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'confirmed') RETURNING id`,
      [venueId, userId, sport, date, startTime, endHour, duration, pricePerHour, total],
    );

    const bookingId = booking.rows[0].id;

    for (const slot of slots) {
      await client.query(
        'INSERT INTO booked_slots (booking_id, venue_id, date, slot_time) VALUES ($1,$2,$3,$4)',
        [bookingId, venueId, date, slot],
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      id: bookingId,
      venueId, sport, date,
      timeSlot: `${startTime} - ${endHour}`,
      duration, pricePerHour, total,
      status: 'confirmed',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Double booking detected — slot taken' });
    }
    throw err;
  } finally {
    client.release();
  }
});

router.get('/my', requireAuth, async (req, res) => {
  const result = await pool.query(
    `SELECT b.*, v.name AS venue_name FROM bookings b
     JOIN venues v ON v.id = b.venue_id
     WHERE b.user_id = $1 ORDER BY b.date DESC`,
    [req.user.id],
  );
  res.json(result.rows.map(r => ({
    id: r.id,
    venueId: r.venue_id,
    venueName: r.venue_name,
    sport: r.sport,
    date: r.date,
    timeSlot: `${r.start_time} - ${r.end_time}`,
    duration: r.duration,
    pricePerHour: r.price_per_hour,
    total: r.total,
    status: r.status,
  })));
});

export default router;
