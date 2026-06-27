import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './mongo.js';
import venueRoutes from './routes/venues.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

connectMongo().then(() => {
  app.listen(PORT, () => console.log(`SportSlot API running on :${PORT}`));
});
