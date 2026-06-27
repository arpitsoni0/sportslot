#!/bin/bash
set -e

echo "=== SportSlot Deploy Script ==="

# 1. Build and start containers
echo "Building and starting containers..."
docker compose up -d --build

# 2. Wait for services to be healthy
echo "Waiting for databases..."
sleep 8

# 3. Initialize PostgreSQL schema + seed
echo "Initializing PostgreSQL..."
docker compose exec -T api node src/dbInit.js

# 4. Seed MongoDB reviews
echo "Seeding MongoDB reviews..."
docker compose exec -T api node src/seedReviews.js

echo ""
echo "=== SportSlot is live! ==="
echo "Open http://$(curl -s ifconfig.me 2>/dev/null || echo 'your-server-ip') in your browser"
echo ""
echo "Test credentials: arpit@example.com / password123"
