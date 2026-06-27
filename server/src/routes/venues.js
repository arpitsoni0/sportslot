import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { sport, city, pincode, maxPrice, maxDistance, minRating } = req.query;

  const rows = await pool.query(`
    SELECT v.*,
           COALESCE(json_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '[]') AS sports,
           COALESCE(json_agg(DISTINCT a.amenity) FILTER (WHERE a.amenity IS NOT NULL), '[]') AS amenities,
           COALESCE(json_agg(DISTINCT g.image_url ORDER BY g.image_url) FILTER (WHERE g.image_url IS NOT NULL), '[]') AS gallery,
           COALESCE(json_agg(DISTINCT t.slot_time) FILTER (WHERE t.slot_time IS NOT NULL), '[]') AS "timeSlots",
           u.name AS owner,
           u.phone AS "ownerPhone"
    FROM venues v
    LEFT JOIN venue_sports vs ON vs.venue_id = v.id
    LEFT JOIN sports s        ON s.id = vs.sport_id
    LEFT JOIN venue_amenities a ON a.venue_id = v.id
    LEFT JOIN venue_gallery g   ON g.venue_id = v.id
    LEFT JOIN venue_time_slots t ON t.venue_id = v.id
    LEFT JOIN users u           ON u.id = v.owner_id
    GROUP BY v.id, u.name, u.phone
    ORDER BY v.rating DESC
  `);

  let venues = rows.rows.map(r => ({
    id: r.id,
    name: r.name,
    image: r.image,
    gallery: r.gallery,
    description: r.description,
    city: r.city,
    state: r.state,
    pincode: r.pincode,
    address: r.address,
    sports: r.sports,
    pricePerHour: r.price_per_hour,
    rating: parseFloat(r.rating),
    reviews: r.reviews_count,
    distance: parseFloat(r.distance),
    amenities: r.amenities,
    timeSlots: r.timeSlots,
    bookedSlots: [],
    owner: r.owner,
    ownerPhone: r.ownerPhone,
  }));

  if (sport) {
    const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);
    venues = venues.filter(v => v.sports.includes(sportName));
  }
  if (city) venues = venues.filter(v => v.city.toLowerCase().includes(city.toLowerCase()));
  if (pincode) venues = venues.filter(v => v.pincode === pincode);
  if (maxPrice) venues = venues.filter(v => v.pricePerHour <= Number(maxPrice));
  if (maxDistance) venues = venues.filter(v => v.distance <= Number(maxDistance));
  if (minRating) venues = venues.filter(v => v.rating >= Number(minRating));

  res.json(venues);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  const rows = await pool.query(`
    SELECT v.*,
           COALESCE(json_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '[]') AS sports,
           COALESCE(json_agg(DISTINCT a.amenity) FILTER (WHERE a.amenity IS NOT NULL), '[]') AS amenities,
           COALESCE(json_agg(DISTINCT g.image_url ORDER BY g.image_url) FILTER (WHERE g.image_url IS NOT NULL), '[]') AS gallery,
           COALESCE(json_agg(DISTINCT t.slot_time) FILTER (WHERE t.slot_time IS NOT NULL), '[]') AS "timeSlots",
           u.name AS owner,
           u.phone AS "ownerPhone"
    FROM venues v
    LEFT JOIN venue_sports vs ON vs.venue_id = v.id
    LEFT JOIN sports s        ON s.id = vs.sport_id
    LEFT JOIN venue_amenities a ON a.venue_id = v.id
    LEFT JOIN venue_gallery g   ON g.venue_id = v.id
    LEFT JOIN venue_time_slots t ON t.venue_id = v.id
    LEFT JOIN users u           ON u.id = v.owner_id
    WHERE v.id = $1
    GROUP BY v.id, u.name, u.phone
  `, [id]);

  if (rows.rows.length === 0) return res.status(404).json({ error: 'Venue not found' });

  const r = rows.rows[0];

  let bookedSlots = [];
  if (date) {
    const bs = await pool.query(
      'SELECT slot_time FROM booked_slots WHERE venue_id = $1 AND date = $2',
      [id, date]
    );
    bookedSlots = bs.rows.map(b => b.slot_time);
  }

  res.json({
    id: r.id,
    name: r.name,
    image: r.image,
    gallery: r.gallery,
    description: r.description,
    city: r.city,
    state: r.state,
    pincode: r.pincode,
    address: r.address,
    sports: r.sports,
    pricePerHour: r.price_per_hour,
    rating: parseFloat(r.rating),
    reviews: r.reviews_count,
    distance: parseFloat(r.distance),
    amenities: r.amenities,
    timeSlots: r.timeSlots,
    bookedSlots,
    owner: r.owner,
    ownerPhone: r.ownerPhone,
  });
});

export default router;
