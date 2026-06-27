-- Seed data matching the front-end mockData.js

INSERT INTO sports VALUES
  ('cricket',    'Cricket',    '🏏'),
  ('football',   'Football',   '⚽'),
  ('badminton',  'Badminton',  '🏸'),
  ('tennis',     'Tennis',     '🎾'),
  ('pickleball', 'Pickleball', '🏓');

-- password = 'password123'
INSERT INTO users (name, email, phone, password_hash, role, business_name, city, pincode, status, created_at) VALUES
  ('Vikram Singh', 'vikram@example.com', '+91 98765 43210', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Rajasthan Sports Arena',    'Jaipur', '302021', 'approved', '2025-12-01'),
  ('Priya Sharma', 'priya@example.com',  '+91 98123 45678', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Pink City Badminton Hub',   'Jaipur', '302021', 'approved', '2026-01-10'),
  ('Rahul Meena',  'rahul@example.com',  '+91 99876 54321', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Jaipur Football Ground',    'Jaipur', '302021', 'approved', '2026-01-25'),
  ('Anil Kumar',   'anil@example.com',   '+91 97654 32109', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Royal Tennis Academy',      'Jaipur', '302021', 'pending',  '2026-05-20'),
  ('Suresh Patel', 'suresh@example.com', '+91 98111 22334', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Mansarovar Sports Complex', 'Jaipur', '302020', 'approved', '2026-02-15'),
  ('Neha Gupta',   'neha@example.com',   '+91 99887 66554', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Apex Pickleball Arena',     'Jaipur', '302021', 'pending',  '2026-05-28'),
  ('Arpit Soni',   'arpit@example.com',  '+91 98765 00001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-01-15'),
  ('Rohit Verma',  'rohit@example.com',  '+91 98765 00002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-02-20'),
  ('Sneha Jain',   'sneha@example.com',  '+91 98765 00003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-03-10'),
  ('Amit Sharma',  'amit@example.com',   '+91 98765 00004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-04-05'),
  ('Kavita Rao',   'kavita@example.com', '+91 98765 00005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-05-01'),
  ('Admin',        'admin@sportslot.in', '+91 77278 92092', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'admin', NULL, NULL, NULL, 'approved', '2025-11-01');

INSERT INTO venues (owner_id, name, description, image, city, state, pincode, address, price_per_hour, rating, reviews_count, distance) VALUES
  (1, 'Rajasthan Sports Arena',    'Premium cricket turf with international-standard facilities. Perfect for practice sessions, friendly matches, and corporate tournaments. Features floodlights for night play, well-maintained pitch, and professional-grade nets.',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', 'Plot No. 45, Malviya Nagar, Jaipur, Rajasthan 302021', 2000, 4.5, 128, 2.3),
  (2, 'Pink City Badminton Hub',   'State-of-the-art indoor badminton facility with 6 wooden courts. Air-conditioned halls with professional lighting. Ideal for casual play, training, and local tournaments.',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '12, Tonk Road, Near Durgapura Station, Jaipur, Rajasthan 302021', 800, 4.7, 95, 3.1),
  (3, 'Jaipur Football Ground',    'Full-size football turf with FIFA-standard artificial grass. Perfect for 5-a-side, 7-a-side, and full matches. Night play available with premium floodlights.',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '78, Vaishali Nagar, Near Gaurav Tower, Jaipur, Rajasthan 302021', 1500, 4.3, 67, 4.5),
  (4, 'Royal Tennis Academy',      'Professional tennis courts with clay and hard court options. Certified coaches available for all skill levels. Hosting regular tournaments and training camps.',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '34, C-Scheme, Near Raj Mandir, Jaipur, Rajasthan 302021', 1200, 4.6, 52, 1.8),
  (5, 'Mansarovar Sports Complex', 'Multi-sport complex offering cricket nets, football turf, and badminton courts. Ideal for groups looking for variety. Weekend tournament packages available.',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302020', '56, Mansarovar, Sector 9, Jaipur, Rajasthan 302020', 1800, 4.2, 89, 5.2),
  (6, 'Apex Pickleball Arena',     'Jaipur''s first dedicated pickleball facility with 4 indoor courts. Great for beginners and experienced players. Regular coaching sessions and community events.',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '22, Ajmer Road, Jhotwara, Jaipur, Rajasthan 302021', 600, 4.8, 34, 3.7);

INSERT INTO venue_sports (venue_id, sport_id) VALUES
  (1,'cricket'), (1,'football'),
  (2,'badminton'),
  (3,'football'),
  (4,'tennis'), (4,'pickleball'),
  (5,'cricket'), (5,'football'), (5,'badminton'),
  (6,'pickleball'), (6,'tennis');

INSERT INTO venue_gallery (venue_id, image_url, sort_order) VALUES
  (1,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',0),
  (1,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (1,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',2),
  (1,'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop',3),
  (2,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',0),
  (2,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',1),
  (2,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',2),
  (3,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',0),
  (3,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (3,'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop',2),
  (4,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',0),
  (4,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',1),
  (4,'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=800&h=500&fit=crop',2),
  (5,'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop',0),
  (5,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',1),
  (5,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',2),
  (6,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',0),
  (6,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',1),
  (6,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',2);

INSERT INTO venue_amenities (venue_id, amenity) VALUES
  (1,'Floodlights'),(1,'Changing Rooms'),(1,'Parking'),(1,'Drinking Water'),(1,'First Aid'),(1,'Washrooms'),
  (2,'Air Conditioning'),(2,'Wooden Courts'),(2,'Coaching Available'),(2,'Parking'),(2,'Cafeteria'),(2,'Washrooms'),(2,'Equipment Rental'),
  (3,'Artificial Turf'),(3,'Floodlights'),(3,'Changing Rooms'),(3,'Parking'),(3,'Drinking Water'),(3,'Goal Posts'),
  (4,'Clay Courts'),(4,'Hard Courts'),(4,'Coaching'),(4,'Pro Shop'),(4,'Parking'),(4,'Locker Rooms'),(4,'Shower'),
  (5,'Multiple Courts'),(5,'Floodlights'),(5,'Cafeteria'),(5,'Parking'),(5,'Equipment Rental'),(5,'Washrooms'),(5,'Seating Gallery'),
  (6,'Indoor Courts'),(6,'Equipment Provided'),(6,'Coaching'),(6,'Parking'),(6,'Drinking Water'),(6,'Air Conditioning');

INSERT INTO venue_time_slots (venue_id, slot_time) VALUES
  (1,'6:00 AM'),(1,'7:00 AM'),(1,'8:00 AM'),(1,'9:00 AM'),(1,'10:00 AM'),(1,'11:00 AM'),(1,'12:00 PM'),(1,'1:00 PM'),(1,'2:00 PM'),(1,'3:00 PM'),(1,'4:00 PM'),(1,'5:00 PM'),(1,'6:00 PM'),(1,'7:00 PM'),(1,'8:00 PM'),(1,'9:00 PM'),
  (2,'6:00 AM'),(2,'7:00 AM'),(2,'8:00 AM'),(2,'9:00 AM'),(2,'10:00 AM'),(2,'11:00 AM'),(2,'12:00 PM'),(2,'1:00 PM'),(2,'2:00 PM'),(2,'3:00 PM'),(2,'4:00 PM'),(2,'5:00 PM'),(2,'6:00 PM'),(2,'7:00 PM'),(2,'8:00 PM'),(2,'9:00 PM'),(2,'10:00 PM'),
  (3,'6:00 AM'),(3,'7:00 AM'),(3,'8:00 AM'),(3,'9:00 AM'),(3,'10:00 AM'),(3,'4:00 PM'),(3,'5:00 PM'),(3,'6:00 PM'),(3,'7:00 PM'),(3,'8:00 PM'),(3,'9:00 PM'),
  (4,'6:00 AM'),(4,'7:00 AM'),(4,'8:00 AM'),(4,'9:00 AM'),(4,'10:00 AM'),(4,'11:00 AM'),(4,'4:00 PM'),(4,'5:00 PM'),(4,'6:00 PM'),(4,'7:00 PM'),(4,'8:00 PM'),
  (5,'6:00 AM'),(5,'7:00 AM'),(5,'8:00 AM'),(5,'9:00 AM'),(5,'10:00 AM'),(5,'11:00 AM'),(5,'12:00 PM'),(5,'1:00 PM'),(5,'2:00 PM'),(5,'3:00 PM'),(5,'4:00 PM'),(5,'5:00 PM'),(5,'6:00 PM'),(5,'7:00 PM'),(5,'8:00 PM'),(5,'9:00 PM'),
  (6,'7:00 AM'),(6,'8:00 AM'),(6,'9:00 AM'),(6,'10:00 AM'),(6,'11:00 AM'),(6,'12:00 PM'),(6,'4:00 PM'),(6,'5:00 PM'),(6,'6:00 PM'),(6,'7:00 PM'),(6,'8:00 PM'),(6,'9:00 PM');

INSERT INTO bookings (venue_id, user_id, sport, date, start_time, end_time, duration, price_per_hour, total, status) VALUES
  (1, 7,  'Cricket',   '2026-06-07', '5:00 PM', '7:00 PM', 2, 2000, 4000, 'confirmed'),
  (2, 8,  'Badminton', '2026-06-08', '9:00 AM', '10:00 AM', 1, 800,  800,  'confirmed'),
  (3, 9,  'Football',  '2026-06-09', '6:00 PM', '8:00 PM', 2, 1500, 3000, 'pending'),
  (4, 10, 'Tennis',    '2026-06-10', '7:00 AM', '8:00 AM', 1, 1200, 1200, 'confirmed'),
  (1, 11, 'Football',  '2026-06-11', '4:00 PM', '6:00 PM', 2, 2000, 4000, 'confirmed');

INSERT INTO booked_slots (booking_id, venue_id, date, slot_time) VALUES
  ('BK000001', 1, '2026-06-07', '5:00 PM'), ('BK000001', 1, '2026-06-07', '6:00 PM'),
  ('BK000002', 2, '2026-06-08', '9:00 AM'),
  ('BK000003', 3, '2026-06-09', '6:00 PM'), ('BK000003', 3, '2026-06-09', '7:00 PM'),
  ('BK000004', 4, '2026-06-10', '7:00 AM'),
  ('BK000005', 1, '2026-06-11', '4:00 PM'), ('BK000005', 1, '2026-06-11', '5:00 PM');
