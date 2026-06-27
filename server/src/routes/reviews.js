import { Router } from 'express';
import Review from '../models/Review.js';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/venue/:venueId', async (req, res) => {
  const reviews = await Review.find({ venueId: Number(req.params.venueId) })
    .sort({ createdAt: -1 })
    .limit(50);

  const stats = await Review.aggregate([
    { $match: { venueId: Number(req.params.venueId) } },
    { $group: {
      _id: null,
      avg: { $avg: '$rating' },
      count: { $sum: 1 },
      dist: { $push: '$rating' },
    }},
  ]);

  let distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (stats.length) {
    stats[0].dist.forEach(r => distribution[r]++);
  }

  res.json({
    reviews,
    averageRating: stats.length ? Math.round(stats[0].avg * 10) / 10 : 0,
    totalReviews: stats.length ? stats[0].count : 0,
    distribution,
  });
});

router.post('/venue/:venueId', requireAuth, async (req, res) => {
  const { rating, title, text } = req.body;
  const venueId = Number(req.params.venueId);

  if (!rating || !text) return res.status(400).json({ error: 'Rating and review text are required' });

  const userRow = await pool.query('SELECT name FROM users WHERE id = $1', [req.user.id]);
  const userName = userRow.rows[0]?.name || 'Anonymous';

  const existing = await Review.findOne({ venueId, userId: req.user.id });
  if (existing) return res.status(409).json({ error: 'You have already reviewed this venue' });

  const review = await Review.create({
    venueId,
    userId: req.user.id,
    userName,
    rating,
    title,
    text,
  });

  const agg = await Review.aggregate([
    { $match: { venueId } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);

  if (agg.length) {
    await pool.query(
      'UPDATE venues SET rating = $1, reviews_count = $2 WHERE id = $3',
      [Math.round(agg[0].avg * 10) / 10, agg[0].count, venueId],
    );
  }

  res.status(201).json(review);
});

export default router;
