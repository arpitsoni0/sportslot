import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, phone, password, role, businessName, city, pincode } = req.body;

  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });

  const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (exists.rows.length) return res.status(409).json({ error: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const userRole = role === 'owner' ? 'owner' : 'user';
  const status = userRole === 'owner' ? 'pending' : 'approved';

  const result = await pool.query(
    `INSERT INTO users (name, email, phone, password_hash, role, business_name, city, pincode, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, name, email, role, status`,
    [name, email, phone, passwordHash, userRole, businessName || null, city || null, pincode || null, status],
  );

  const user = result.rows[0];
  const token = signToken(user);
  res.status(201).json({ token, user });
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (!result.rows.length) return res.status(401).json({ error: 'Invalid email or password' });

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

  if (role && user.role !== role) return res.status(403).json({ error: `This account is not registered as ${role}` });

  const token = signToken(user);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status },
  });
});

router.get('/me', requireAuth, async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, phone, role, business_name, city, pincode, status, created_at FROM users WHERE id = $1',
    [req.user.id],
  );
  if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
  res.json(result.rows[0]);
});

export default router;
