-- SportSlot PostgreSQL Schema

CREATE TABLE sports (
  id   VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(10)
);

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  phone         VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'user'
                CHECK (role IN ('user', 'owner', 'admin')),
  business_name VARCHAR(200),
  city          VARCHAR(100),
  pincode       VARCHAR(10),
  status        VARCHAR(20) DEFAULT 'approved'
                CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE venues (
  id             SERIAL PRIMARY KEY,
  owner_id       INTEGER REFERENCES users(id),
  name           VARCHAR(200) NOT NULL,
  description    TEXT,
  image          VARCHAR(500),
  city           VARCHAR(100) NOT NULL,
  state          VARCHAR(100) NOT NULL,
  pincode        VARCHAR(10) NOT NULL,
  address        TEXT NOT NULL,
  price_per_hour INTEGER NOT NULL,
  rating         NUMERIC(2,1) DEFAULT 0,
  reviews_count  INTEGER DEFAULT 0,
  distance       NUMERIC(4,1),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE venue_sports (
  venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
  sport_id VARCHAR(20) REFERENCES sports(id) ON DELETE CASCADE,
  PRIMARY KEY (venue_id, sport_id)
);

CREATE TABLE venue_gallery (
  id         SERIAL PRIMARY KEY,
  venue_id   INTEGER REFERENCES venues(id) ON DELETE CASCADE,
  image_url  VARCHAR(500) NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE venue_amenities (
  id       SERIAL PRIMARY KEY,
  venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
  amenity  VARCHAR(100) NOT NULL
);

CREATE TABLE venue_time_slots (
  id        SERIAL PRIMARY KEY,
  venue_id  INTEGER REFERENCES venues(id) ON DELETE CASCADE,
  slot_time VARCHAR(10) NOT NULL,
  UNIQUE(venue_id, slot_time)
);

CREATE SEQUENCE booking_id_seq START 1;

CREATE TABLE bookings (
  id             TEXT PRIMARY KEY DEFAULT 'BK' || LPAD(nextval('booking_id_seq')::TEXT, 6, '0'),
  venue_id       INTEGER REFERENCES venues(id),
  user_id        INTEGER REFERENCES users(id),
  sport          VARCHAR(50) NOT NULL,
  date           DATE NOT NULL,
  start_time     VARCHAR(10) NOT NULL,
  end_time       VARCHAR(10) NOT NULL,
  duration       INTEGER NOT NULL,
  price_per_hour INTEGER NOT NULL,
  total          INTEGER NOT NULL,
  status         VARCHAR(20) DEFAULT 'pending'
                 CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Each booked hour-slot gets a row here.
-- The UNIQUE constraint is the double-booking guard.
CREATE TABLE booked_slots (
  id         SERIAL PRIMARY KEY,
  booking_id TEXT REFERENCES bookings(id) ON DELETE CASCADE,
  venue_id   INTEGER REFERENCES venues(id),
  date       DATE NOT NULL,
  slot_time  VARCHAR(10) NOT NULL,
  UNIQUE(venue_id, date, slot_time)
);

CREATE INDEX idx_venues_city    ON venues(city);
CREATE INDEX idx_bookings_venue ON bookings(venue_id, date);
CREATE INDEX idx_booked_slots   ON booked_slots(venue_id, date);
