-- Seed data for SportSlot

INSERT INTO sports VALUES
  ('cricket',    'Cricket',    '🏏'),
  ('football',   'Football',   '⚽'),
  ('badminton',  'Badminton',  '🏸'),
  ('tennis',     'Tennis',     '🎾'),
  ('pickleball', 'Pickleball', '🏓');

-- password = 'password123'
INSERT INTO users (name, email, phone, password_hash, role, business_name, city, pincode, status, created_at) VALUES
  -- Jaipur owners (1-6)
  ('Vikram Singh', 'vikram@example.com', '+91 98765 43210', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Rajasthan Sports Arena',    'Jaipur', '302021', 'approved', '2025-12-01'),
  ('Priya Sharma', 'priya@example.com',  '+91 98123 45678', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Pink City Badminton Hub',   'Jaipur', '302021', 'approved', '2026-01-10'),
  ('Rahul Meena',  'rahul@example.com',  '+91 99876 54321', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Jaipur Football Ground',    'Jaipur', '302021', 'approved', '2026-01-25'),
  ('Anil Kumar',   'anil@example.com',   '+91 97654 32109', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Royal Tennis Academy',      'Jaipur', '302021', 'approved', '2026-05-20'),
  ('Suresh Patel', 'suresh@example.com', '+91 98111 22334', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Mansarovar Sports Complex', 'Jaipur', '302020', 'approved', '2026-02-15'),
  ('Neha Gupta',   'neha@example.com',   '+91 99887 66554', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Apex Pickleball Arena',     'Jaipur', '302021', 'approved', '2026-05-28'),
  -- Mumbai owners (7-11)
  ('Rohan Desai',    'rohan@example.com',    '+91 98200 11001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Mumbai Cricket Zone',       'Mumbai', '400001', 'approved', '2026-01-05'),
  ('Meera Nair',     'meera@example.com',    '+91 98200 11002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Powai Sports Hub',          'Mumbai', '400076', 'approved', '2026-01-12'),
  ('Sanjay Patil',   'sanjay@example.com',   '+91 98200 11003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Bandra Football Club',      'Mumbai', '400050', 'approved', '2026-02-01'),
  ('Deepika Joshi',  'deepika@example.com',  '+91 98200 11004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Andheri Racquet Club',       'Mumbai', '400069', 'approved', '2026-02-10'),
  ('Varun Mehta',    'varun@example.com',    '+91 98200 11005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Juhu Sports Arena',         'Mumbai', '400049', 'approved', '2026-02-20'),
  -- Delhi owners (12-16)
  ('Karan Malhotra', 'karan@example.com',    '+91 98100 22001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Delhi Cricket Academy',     'Delhi', '110001', 'approved', '2026-01-08'),
  ('Nisha Kapoor',   'nisha@example.com',    '+91 98100 22002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'CP Badminton Center',       'Delhi', '110001', 'approved', '2026-01-15'),
  ('Ravi Tandon',    'ravi@example.com',     '+91 98100 22003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Dwarka Sports Complex',     'Delhi', '110075', 'approved', '2026-02-05'),
  ('Ananya Singh',   'ananya@example.com',   '+91 98100 22004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'South Delhi Tennis Club',   'Delhi', '110017', 'approved', '2026-02-12'),
  ('Manish Arora',   'manish@example.com',   '+91 98100 22005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Rohini Football Ground',    'Delhi', '110085', 'approved', '2026-02-25'),
  -- Bangalore owners (17-21)
  ('Arun Reddy',     'arun@example.com',     '+91 98450 33001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Koramangala Sports Hub',    'Bangalore', '560034', 'approved', '2026-01-10'),
  ('Divya Hegde',    'divya@example.com',    '+91 98450 33002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Indiranagar Badminton Club','Bangalore', '560038', 'approved', '2026-01-18'),
  ('Prasad Rao',     'prasad@example.com',   '+91 98450 33003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'HSR Cricket Ground',       'Bangalore', '560102', 'approved', '2026-02-08'),
  ('Swathi Kumar',   'swathi@example.com',   '+91 98450 33004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Whitefield Tennis Academy', 'Bangalore', '560066', 'approved', '2026-02-15'),
  ('Nitin Gowda',    'nitin@example.com',    '+91 98450 33005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Electronic City Sports',    'Bangalore', '560100', 'approved', '2026-03-01'),
  -- Chennai owners (22-26)
  ('Rajesh Iyer',    'rajesh@example.com',   '+91 98410 44001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Nungambakkam Cricket Club', 'Chennai', '600034', 'approved', '2026-01-12'),
  ('Lakshmi Raman',  'lakshmi@example.com',  '+91 98410 44002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Anna Nagar Sports Arena',   'Chennai', '600040', 'approved', '2026-01-20'),
  ('Ganesh Suresh',  'ganesh@example.com',   '+91 98410 44003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'OMR Football Zone',         'Chennai', '600119', 'approved', '2026-02-10'),
  ('Preethi Das',    'preethi@example.com',  '+91 98410 44004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'T Nagar Racquet Center',    'Chennai', '600017', 'approved', '2026-02-18'),
  ('Siva Prakash',   'siva@example.com',     '+91 98410 44005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'owner', 'Adyar Pickleball Court',    'Chennai', '600020', 'approved', '2026-03-05'),
  -- Regular users (27-31)
  ('Arpit Soni',   'arpit@example.com',  '+91 98765 00001', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-01-15'),
  ('Rohit Verma',  'rohit2@example.com', '+91 98765 00002', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-02-20'),
  ('Sneha Jain',   'sneha@example.com',  '+91 98765 00003', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-03-10'),
  ('Amit Sharma',  'amit@example.com',   '+91 98765 00004', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-04-05'),
  ('Kavita Rao',   'kavita@example.com', '+91 98765 00005', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'user',  NULL, NULL, NULL, 'approved', '2026-05-01'),
  -- Admin
  ('Admin',        'admin@sportslot.in', '+91 77278 92092', '$2b$10$lAlfK0MW9FuVvhxVHLjXt.6KXz4Eb.BmiYyeVvjMwLOv9uSQUpI5m', 'admin', NULL, NULL, NULL, 'approved', '2025-11-01');

-- VENUES
INSERT INTO venues (owner_id, name, description, image, city, state, pincode, address, price_per_hour, rating, reviews_count, distance) VALUES
  -- Jaipur (1-6)
  (1, 'Rajasthan Sports Arena',    'Premium cricket turf with international-standard facilities. Features floodlights for night play, well-maintained pitch, and professional-grade nets.',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', 'Plot No. 45, Malviya Nagar, Jaipur, Rajasthan 302021', 2000, 4.5, 128, 2.3),
  (2, 'Pink City Badminton Hub',   'State-of-the-art indoor badminton facility with 6 wooden courts. Air-conditioned halls with professional lighting.',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '12, Tonk Road, Near Durgapura Station, Jaipur, Rajasthan 302021', 800, 4.7, 95, 3.1),
  (3, 'Jaipur Football Ground',    'Full-size football turf with FIFA-standard artificial grass. Perfect for 5-a-side, 7-a-side, and full matches.',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '78, Vaishali Nagar, Near Gaurav Tower, Jaipur, Rajasthan 302021', 1500, 4.3, 67, 4.5),
  (4, 'Royal Tennis Academy',      'Professional tennis courts with clay and hard court options. Certified coaches available for all skill levels.',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '34, C-Scheme, Near Raj Mandir, Jaipur, Rajasthan 302021', 1200, 4.6, 52, 1.8),
  (5, 'Mansarovar Sports Complex', 'Multi-sport complex offering cricket nets, football turf, and badminton courts. Weekend tournament packages available.',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302020', '56, Mansarovar, Sector 9, Jaipur, Rajasthan 302020', 1800, 4.2, 89, 5.2),
  (6, 'Apex Pickleball Arena',     'Jaipur''s first dedicated pickleball facility with 4 indoor courts. Regular coaching sessions and community events.',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop', 'Jaipur', 'Rajasthan', '302021', '22, Ajmer Road, Jhotwara, Jaipur, Rajasthan 302021', 600, 4.8, 34, 3.7),

  -- Mumbai (7-11)
  (7, 'Mumbai Cricket Zone',       'World-class cricket nets and turf pitches in the heart of Mumbai. Practice under lights, bowl on real red-soil pitches.',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop', 'Mumbai', 'Maharashtra', '400001', '15, Marine Drive, Fort, Mumbai, Maharashtra 400001', 2500, 4.6, 210, 1.5),
  (8, 'Powai Sports Hub',          'Multi-sport facility near IIT Bombay with football turf, badminton courts, and a swimming pool. Perfect for weekend warriors.',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop', 'Mumbai', 'Maharashtra', '400076', '42, Hiranandani Gardens, Powai, Mumbai, Maharashtra 400076', 1800, 4.4, 156, 3.8),
  (9, 'Bandra Football Club',      'Premium 7-a-side football turf with imported artificial grass. Floodlit for evening games. The best turf in Western Mumbai.',
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop', 'Mumbai', 'Maharashtra', '400050', '88, Turner Road, Bandra West, Mumbai, Maharashtra 400050', 2200, 4.7, 178, 2.1),
  (10, 'Andheri Racquet Club',     'Indoor badminton and tennis facility with 8 courts. Air-conditioned, professional coaching, and equipment rental available.',
      'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop', 'Mumbai', 'Maharashtra', '400069', '23, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400069', 1000, 4.5, 132, 4.2),
  (11, 'Juhu Sports Arena',        'Beachside sports complex with cricket, football, and volleyball. Enjoy ocean breeze while you play under premium floodlights.',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop', 'Mumbai', 'Maharashtra', '400049', '7, Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049', 2000, 4.3, 98, 5.0),

  -- Delhi (12-16)
  (12, 'Delhi Cricket Academy',    'Professional cricket training facility with 4 practice nets, bowling machines, and video analysis. Used by Ranji players.',
      'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=500&fit=crop', 'Delhi', 'Delhi', '110001', '45, Rajpath Area, Near India Gate, Delhi 110001', 2200, 4.7, 245, 2.0),
  (13, 'CP Badminton Center',      'Central Delhi''s premium indoor badminton facility. 10 synthetic courts with international-standard lighting and flooring.',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop', 'Delhi', 'Delhi', '110001', '18, Barakhamba Road, Connaught Place, Delhi 110001', 900, 4.6, 187, 1.2),
  (14, 'Dwarka Sports Complex',    'Sprawling multi-sport complex with football fields, tennis courts, and a running track. Family-friendly with kids play area.',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop', 'Delhi', 'Delhi', '110075', '67, Sector 12, Dwarka, Delhi 110075', 1600, 4.4, 134, 6.5),
  (15, 'South Delhi Tennis Club',  'Exclusive tennis club with 6 clay courts and 2 hard courts. Regular tournaments, professional coaching, and a clubhouse.',
      'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=800&h=500&fit=crop', 'Delhi', 'Delhi', '110017', '92, Hauz Khas Village, South Delhi 110017', 1400, 4.8, 76, 3.3),
  (16, 'Rohini Football Ground',   'North Delhi''s largest football turf with both 5-a-side and full-size options. Floodlit, artificial turf, all-weather play.',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', 'Delhi', 'Delhi', '110085', '34, Sector 15, Rohini, Delhi 110085', 1300, 4.2, 112, 7.1),

  -- Bangalore (17-21)
  (17, 'Koramangala Sports Hub',   'Tech hub''s favorite sports destination. Cricket, football, and badminton under one roof. Corporate tournament packages available.',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop', 'Bangalore', 'Karnataka', '560034', '55, 80 Feet Road, Koramangala 4th Block, Bangalore 560034', 1800, 4.5, 198, 2.5),
  (18, 'Indiranagar Badminton Club','Premium indoor badminton with 8 courts and maple wood flooring. Late-night slots available until 11 PM.',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop', 'Bangalore', 'Karnataka', '560038', '12, 100 Feet Road, Indiranagar, Bangalore 560038', 850, 4.7, 165, 3.0),
  (19, 'HSR Cricket Ground',       'Well-maintained cricket ground with 3 pitches and practice nets. Weekend league matches and corporate events welcome.',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop', 'Bangalore', 'Karnataka', '560102', '78, HSR Layout Sector 2, Bangalore 560102', 1500, 4.3, 142, 4.8),
  (20, 'Whitefield Tennis Academy', 'International-standard tennis facility with 4 hard courts and 2 clay courts. ATP-certified coaching staff.',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop', 'Bangalore', 'Karnataka', '560066', '33, ITPL Road, Whitefield, Bangalore 560066', 1100, 4.6, 88, 8.2),
  (21, 'Electronic City Sports',   'Multi-sport arena for the tech corridor. Football turf, pickleball courts, and fitness center. Post-work sessions popular.',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop', 'Bangalore', 'Karnataka', '560100', '90, Electronic City Phase 1, Bangalore 560100', 1200, 4.4, 107, 10.0),

  -- Chennai (22-26)
  (22, 'Nungambakkam Cricket Club', 'Historic cricket club with lush green outfield. Day-night matches, well-equipped pavilion, and experienced groundsmen.',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop', 'Chennai', 'Tamil Nadu', '600034', '14, Nungambakkam High Road, Chennai 600034', 2000, 4.5, 176, 1.8),
  (23, 'Anna Nagar Sports Arena',  'Family-friendly multi-sport complex with badminton, football, and cricket. Indoor and outdoor facilities with ample parking.',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop', 'Chennai', 'Tamil Nadu', '600040', '78, 2nd Avenue, Anna Nagar, Chennai 600040', 1400, 4.4, 145, 3.5),
  (24, 'OMR Football Zone',        'IT corridor''s premier football turf. FIFA-quality artificial grass, night games under LED floodlights. 5v5 and 7v7 options.',
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop', 'Chennai', 'Tamil Nadu', '600119', '45, OMR Road, Sholinganallur, Chennai 600119', 1600, 4.3, 134, 7.2),
  (25, 'T Nagar Racquet Center',   'Centrally located badminton and tennis facility. 6 badminton courts and 3 tennis courts with professional coaching.',
      'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop', 'Chennai', 'Tamil Nadu', '600017', '22, Usman Road, T Nagar, Chennai 600017', 900, 4.6, 98, 2.4),
  (26, 'Adyar Pickleball Court',   'Chennai''s trending pickleball destination. 6 outdoor courts with shade, coaching for beginners, and weekend tournaments.',
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop', 'Chennai', 'Tamil Nadu', '600020', '56, LB Road, Adyar, Chennai 600020', 700, 4.7, 56, 4.0);

-- VENUE SPORTS
INSERT INTO venue_sports (venue_id, sport_id) VALUES
  -- Jaipur
  (1,'cricket'), (1,'football'),
  (2,'badminton'),
  (3,'football'),
  (4,'tennis'), (4,'pickleball'),
  (5,'cricket'), (5,'football'), (5,'badminton'),
  (6,'pickleball'), (6,'tennis'),
  -- Mumbai
  (7,'cricket'),
  (8,'football'), (8,'badminton'), (8,'cricket'),
  (9,'football'),
  (10,'badminton'), (10,'tennis'),
  (11,'cricket'), (11,'football'),
  -- Delhi
  (12,'cricket'),
  (13,'badminton'),
  (14,'football'), (14,'tennis'), (14,'cricket'),
  (15,'tennis'),
  (16,'football'),
  -- Bangalore
  (17,'cricket'), (17,'football'), (17,'badminton'),
  (18,'badminton'),
  (19,'cricket'),
  (20,'tennis'),
  (21,'football'), (21,'pickleball'),
  -- Chennai
  (22,'cricket'),
  (23,'badminton'), (23,'football'), (23,'cricket'),
  (24,'football'),
  (25,'badminton'), (25,'tennis'),
  (26,'pickleball');

-- VENUE GALLERY
INSERT INTO venue_gallery (venue_id, image_url, sort_order) VALUES
  (1,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',0),
  (1,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (2,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',0),
  (2,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',1),
  (3,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',0),
  (3,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (4,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',0),
  (4,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',1),
  (5,'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop',0),
  (5,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',1),
  (6,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',0),
  (6,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',1),
  (7,'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',0),
  (7,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',1),
  (8,'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',0),
  (8,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',1),
  (9,'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop',0),
  (9,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (10,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',0),
  (10,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',1),
  (11,'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop',0),
  (11,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',1),
  (12,'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=500&fit=crop',0),
  (12,'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',1),
  (13,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',0),
  (13,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',1),
  (14,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',0),
  (14,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',1),
  (15,'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=800&h=500&fit=crop',0),
  (15,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',1),
  (16,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',0),
  (16,'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop',1),
  (17,'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=500&fit=crop',0),
  (17,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',1),
  (18,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',0),
  (18,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',1),
  (19,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',0),
  (19,'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',1),
  (20,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',0),
  (20,'https://images.unsplash.com/photo-1545809074-59472b3f5ecc?w=800&h=500&fit=crop',1),
  (21,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',0),
  (21,'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',1),
  (22,'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',0),
  (22,'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop',1),
  (23,'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop',0),
  (23,'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',1),
  (24,'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop',0),
  (24,'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop',1),
  (25,'https://images.unsplash.com/photo-1613918431703-aa50889e3be4?w=800&h=500&fit=crop',0),
  (25,'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop',1),
  (26,'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&h=500&fit=crop',0),
  (26,'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop',1);

-- VENUE AMENITIES
INSERT INTO venue_amenities (venue_id, amenity) VALUES
  (1,'Floodlights'),(1,'Changing Rooms'),(1,'Parking'),(1,'Drinking Water'),(1,'First Aid'),(1,'Washrooms'),
  (2,'Air Conditioning'),(2,'Wooden Courts'),(2,'Coaching Available'),(2,'Parking'),(2,'Cafeteria'),(2,'Washrooms'),
  (3,'Artificial Turf'),(3,'Floodlights'),(3,'Changing Rooms'),(3,'Parking'),(3,'Drinking Water'),
  (4,'Clay Courts'),(4,'Hard Courts'),(4,'Coaching'),(4,'Pro Shop'),(4,'Parking'),(4,'Locker Rooms'),
  (5,'Multiple Courts'),(5,'Floodlights'),(5,'Cafeteria'),(5,'Parking'),(5,'Equipment Rental'),(5,'Washrooms'),
  (6,'Indoor Courts'),(6,'Equipment Provided'),(6,'Coaching'),(6,'Parking'),(6,'Air Conditioning'),
  (7,'Practice Nets'),(7,'Floodlights'),(7,'Coaching'),(7,'Changing Rooms'),(7,'Parking'),(7,'Cafeteria'),
  (8,'Swimming Pool'),(8,'Floodlights'),(8,'Parking'),(8,'Cafeteria'),(8,'Washrooms'),(8,'Gym'),
  (9,'Imported Turf'),(9,'Floodlights'),(9,'Changing Rooms'),(9,'Parking'),(9,'Drinking Water'),
  (10,'Air Conditioning'),(10,'Equipment Rental'),(10,'Coaching'),(10,'Parking'),(10,'Washrooms'),(10,'Cafeteria'),
  (11,'Floodlights'),(11,'Parking'),(11,'Changing Rooms'),(11,'Cafeteria'),(11,'Ocean View'),
  (12,'Bowling Machine'),(12,'Video Analysis'),(12,'Coaching'),(12,'Parking'),(12,'Changing Rooms'),(12,'Cafeteria'),
  (13,'Synthetic Courts'),(13,'Air Conditioning'),(13,'Parking'),(13,'Equipment Rental'),(13,'Washrooms'),
  (14,'Running Track'),(14,'Kids Play Area'),(14,'Parking'),(14,'Cafeteria'),(14,'Washrooms'),(14,'Floodlights'),
  (15,'Clay Courts'),(15,'Clubhouse'),(15,'Coaching'),(15,'Parking'),(15,'Locker Rooms'),(15,'Pro Shop'),
  (16,'Artificial Turf'),(16,'Floodlights'),(16,'Changing Rooms'),(16,'Parking'),(16,'Drinking Water'),
  (17,'Multiple Sports'),(17,'Floodlights'),(17,'Parking'),(17,'Cafeteria'),(17,'Washrooms'),(17,'Equipment Rental'),
  (18,'Maple Wood Floor'),(18,'Air Conditioning'),(18,'Late Night Slots'),(18,'Parking'),(18,'Washrooms'),
  (19,'Practice Nets'),(19,'Floodlights'),(19,'Parking'),(19,'Drinking Water'),(19,'Washrooms'),
  (20,'Clay Courts'),(20,'Hard Courts'),(20,'Coaching'),(20,'Parking'),(20,'Locker Rooms'),
  (21,'Football Turf'),(21,'Pickleball Courts'),(21,'Parking'),(21,'Cafeteria'),(21,'Fitness Center'),
  (22,'Green Outfield'),(22,'Pavilion'),(22,'Floodlights'),(22,'Parking'),(22,'Changing Rooms'),(22,'Cafeteria'),
  (23,'Indoor Facility'),(23,'Outdoor Facility'),(23,'Parking'),(23,'Cafeteria'),(23,'Washrooms'),(23,'Equipment Rental'),
  (24,'LED Floodlights'),(24,'Artificial Turf'),(24,'Changing Rooms'),(24,'Parking'),(24,'Drinking Water'),
  (25,'Air Conditioning'),(25,'Coaching'),(25,'Parking'),(25,'Washrooms'),(25,'Equipment Rental'),
  (26,'Shaded Courts'),(26,'Coaching'),(26,'Parking'),(26,'Drinking Water'),(26,'Washrooms'),(26,'Tournament Hosting');

-- VENUE TIME SLOTS (all venues get standard slots)
INSERT INTO venue_time_slots (venue_id, slot_time)
SELECT v.id, s.slot FROM
  (SELECT id FROM venues) v
  CROSS JOIN
  (VALUES ('6:00 AM'),('7:00 AM'),('8:00 AM'),('9:00 AM'),('10:00 AM'),('11:00 AM'),
          ('12:00 PM'),('1:00 PM'),('2:00 PM'),('3:00 PM'),('4:00 PM'),('5:00 PM'),
          ('6:00 PM'),('7:00 PM'),('8:00 PM'),('9:00 PM')) AS s(slot);

-- Sample bookings
INSERT INTO bookings (venue_id, user_id, sport, date, start_time, end_time, duration, price_per_hour, total, status) VALUES
  (1, 27,  'Cricket',   '2026-07-07', '5:00 PM', '7:00 PM', 2, 2000, 4000, 'confirmed'),
  (2, 28,  'Badminton', '2026-07-08', '9:00 AM', '10:00 AM', 1, 800,  800,  'confirmed'),
  (7, 29,  'Cricket',   '2026-07-09', '6:00 PM', '8:00 PM', 2, 2500, 5000, 'confirmed'),
  (12, 30, 'Cricket',   '2026-07-10', '7:00 AM', '9:00 AM', 2, 2200, 4400, 'confirmed'),
  (17, 31, 'Football',  '2026-07-11', '4:00 PM', '6:00 PM', 2, 1800, 3600, 'confirmed');

INSERT INTO booked_slots (booking_id, venue_id, date, slot_time) VALUES
  ('BK000001', 1, '2026-07-07', '5:00 PM'), ('BK000001', 1, '2026-07-07', '6:00 PM'),
  ('BK000002', 2, '2026-07-08', '9:00 AM'),
  ('BK000003', 7, '2026-07-09', '6:00 PM'), ('BK000003', 7, '2026-07-09', '7:00 PM'),
  ('BK000004', 12, '2026-07-10', '7:00 AM'), ('BK000004', 12, '2026-07-10', '8:00 AM'),
  ('BK000005', 17, '2026-07-11', '4:00 PM'), ('BK000005', 17, '2026-07-11', '5:00 PM');
