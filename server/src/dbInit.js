import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function init() {
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf8');

  console.log('Dropping existing tables…');
  await pool.query(`
    DROP TABLE IF EXISTS booked_slots, bookings, venue_time_slots,
      venue_amenities, venue_gallery, venue_sports, venues, users, sports CASCADE;
    DROP SEQUENCE IF EXISTS booking_id_seq;
  `);

  console.log('Creating schema…');
  await pool.query(schema);

  console.log('Seeding data…');
  await pool.query(seed);

  console.log('Done — database ready.');
  await pool.end();
}

init().catch(err => { console.error(err); process.exit(1); });
