# SportSlot - Sports Venue Booking Platform

A full-stack sports venue booking marketplace where users can discover, compare, and book sports venues across India. Venue owners can list their facilities, and admins can manage the platform.

**Live:** [sportslot.netlify.app](https://sportslot.netlify.app)

## Tech Stack

**Frontend:** React 19, Vite 8, React Router 6, Lucide Icons, Tailwind CSS 4

**Backend:** Express 5 (ES Modules), JWT Authentication, bcrypt

**Databases:** PostgreSQL 16 (users, venues, bookings), MongoDB 8 (reviews)

**DevOps:** Docker, Docker Compose, Nginx, AWS EC2, Netlify

## Features

- **Venue Discovery** — Browse 26+ venues across 5 cities (Mumbai, Delhi, Bangalore, Chennai, Jaipur) with filters for sport type, price, distance, and rating
- **Real-time Booking** — Select date, pick time slots, and book instantly with double-booking prevention via SQL transactions (`SELECT ... FOR UPDATE`) and unique constraints
- **User Authentication** — JWT-based auth with role-based access (User, Owner, Admin)
- **Reviews & Ratings** — MongoDB-powered review system with rating distribution, one review per user per venue
- **Owner Dashboard** — Venue owners can manage their listed facilities
- **Admin Panel** — Platform admin can approve owners and manage users
- **Responsive Design** — Works on desktop and mobile devices

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Netlify    │────>│  Express API │────>│ PostgreSQL   │
│  (Frontend)  │     │  (Port 3001) │     │ (9 tables)   │
│  React SPA   │     │              │────>│              │
└─────────────┘     │  JWT Auth    │     └──────────────┘
                    │  bcrypt      │
                    │              │────>┌──────────────┐
                    └──────────────┘     │  MongoDB     │
                                        │  (Reviews)   │
                                        └──────────────┘
```

## Database Schema

**PostgreSQL (9 tables):**
- `users` — Unified user table with roles (user/owner/admin)
- `venues` — Venue listings with location, pricing, ratings
- `venue_sports`, `venue_gallery`, `venue_amenities`, `venue_time_slots` — Venue details
- `bookings` — Booking records with auto-generated IDs (BK000001)
- `booked_slots` — Individual booked time slots with `UNIQUE(venue_id, date, slot_time)` constraint
- `sports` — Sport types

**MongoDB:**
- `reviews` — Venue reviews with ratings, unique index on (venueId, userId)

## Double-Booking Prevention

Bookings use PostgreSQL transactions with row-level locking:

```sql
BEGIN;
SELECT 1 FROM booked_slots
  WHERE venue_id = $1 AND date = $2 AND slot_time = ANY($3)
  FOR UPDATE;
-- If rows found → conflict, ROLLBACK
-- Otherwise → INSERT booking + booked_slots, COMMIT
```

Backed by a `UNIQUE(venue_id, date, slot_time)` constraint as a safety net.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user/owner |
| POST | `/api/auth/login` | Login with email/password/role |
| GET | `/api/auth/me` | Get current user (requires auth) |
| GET | `/api/venues` | List venues with filters |
| GET | `/api/venues/:id` | Venue details with booked slots |
| POST | `/api/bookings` | Create booking (requires auth) |
| GET | `/api/bookings/my` | User's bookings (requires auth) |
| GET | `/api/reviews/venue/:id` | Venue reviews with stats |
| POST | `/api/reviews/venue/:id` | Post review (requires auth) |

## Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL 16+
- MongoDB 7+

### Local Development

```bash
# Clone the repo
git clone https://github.com/arpitsoni0/sportslot.git
cd sportslot

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URLs

# Initialize and seed the database
npm run db:init

# Start the backend (from server/)
npm run dev

# Start the frontend (from root, in another terminal)
cd ..
npm run dev
```

The frontend runs on `http://localhost:5173` with API proxy to `http://localhost:3001`.

### Docker Deployment

```bash
# Build and start all services
docker compose up -d --build

# Seed the databases
docker compose exec api node src/dbInit.js
docker compose exec api node src/seedReviews.js
```

Services: PostgreSQL, MongoDB, Express API, Nginx (frontend)

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | arpit@example.com | password123 |
| Owner | vikram@example.com | password123 |
| Admin | admin@sportslot.in | password123 |

## Project Structure

```
sportslot/
├── src/                    # React frontend
│   ├── pages/              # Page components (Home, Search, Venue, Checkout, etc.)
│   ├── components/         # Shared components (Navbar, Footer, VenueCard)
│   ├── data/               # Mock data (used for dropdowns)
│   └── api.js              # API client with auth helpers
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API routes (auth, venues, bookings, reviews)
│   │   ├── middleware/     # JWT auth middleware
│   │   ├── models/         # Mongoose models (Review)
│   │   ├── schema.sql      # PostgreSQL schema
│   │   ├── seed.sql        # Seed data (26 venues, 32 users)
│   │   └── index.js        # Express app entry point
│   └── Dockerfile
├── docker-compose.yml      # 4-service orchestration
├── Dockerfile              # Frontend multi-stage build
├── nginx.conf              # Reverse proxy + SPA routing
└── vite.config.js          # Vite config with API proxy
```

## License

MIT
