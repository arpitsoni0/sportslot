import { connectMongo } from './mongo.js';
import Review from './models/Review.js';

const reviews = [
  // Jaipur
  { venueId: 1, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Best cricket turf in Jaipur', text: 'Amazing facility with well-maintained pitch. The floodlights are great for evening sessions. Booked multiple times and never disappointed.' },
  { venueId: 1, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Great ground, could use more parking', text: 'Excellent playing surface and the nets are professional grade. Only downside is limited parking during weekends.' },
  { venueId: 1, userId: 29, userName: 'Sneha Jain', rating: 5, title: 'Perfect for corporate tournaments', text: 'We organized our company cricket tournament here. The facilities were top-notch and the owner was very accommodating.' },
  { venueId: 2, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Superb badminton courts', text: 'The wooden courts are excellent quality. AC keeps the hall comfortable even in summer. Love playing here every weekend!' },
  { venueId: 2, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Good courts, fair pricing', text: 'Clean courts and good lighting. The coaching staff is knowledgeable. Equipment rental is convenient for beginners.' },
  { venueId: 3, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Solid football turf', text: 'Good quality artificial grass. Perfect for 5-a-side matches. The floodlights make evening games enjoyable.' },
  { venueId: 4, userId: 30, userName: 'Amit Sharma', rating: 5, title: 'Professional tennis experience', text: 'Both clay and hard courts are maintained beautifully. The coaching is excellent. Best tennis facility in Jaipur.' },
  { venueId: 5, userId: 27, userName: 'Arpit Soni', rating: 4, title: 'Nice multi-sport complex', text: 'Good variety of sports available. The cricket nets and football turf are well maintained. Cafeteria food is good too.' },
  { venueId: 6, userId: 28, userName: 'Rohit Verma', rating: 5, title: 'Pickleball paradise!', text: 'Finally a dedicated pickleball facility in Jaipur! Indoor courts with AC — perfect. The coaching sessions are really helpful.' },
  { venueId: 6, userId: 30, userName: 'Amit Sharma', rating: 5, title: 'Fantastic new venue', text: 'Love this place! Clean indoor courts, friendly staff, and great community events. Pickleball is growing fast here.' },

  // Mumbai
  { venueId: 7, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'World-class cricket facility', text: 'The red-soil pitches are amazing. Feels like playing at a professional ground. Coaching staff includes former Ranji players.' },
  { venueId: 7, userId: 29, userName: 'Sneha Jain', rating: 4, title: 'Premium but worth it', text: 'Expensive but you get what you pay for. The facilities are top-notch. Location near Marine Drive is a bonus.' },
  { venueId: 8, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Great multi-sport hub', text: 'Love the variety here — football, badminton, and even a pool. Perfect weekend spot for the Powai crowd.' },
  { venueId: 8, userId: 31, userName: 'Kavita Rao', rating: 5, title: 'Best sports facility in Powai', text: 'Well-maintained grounds, clean changing rooms, and friendly staff. The gym is a nice bonus after playing.' },
  { venueId: 9, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Best football turf in Mumbai', text: 'Imported grass feels incredible to play on. Drainage is excellent — playable even after rain. Night games are amazing.' },
  { venueId: 9, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Top quality turf', text: 'One of the best football turfs in the city. Gets crowded on weekends so book early. Highly recommended.' },
  { venueId: 10, userId: 29, userName: 'Sneha Jain', rating: 5, title: 'Excellent racquet facility', text: 'Air-conditioned courts, professional coaching, and great equipment rental. Perfect for after-work sessions.' },
  { venueId: 11, userId: 31, userName: 'Kavita Rao', rating: 4, title: 'Unique beachside experience', text: 'Playing cricket with the ocean breeze is something else. The venue is well-maintained and the food is great too.' },

  // Delhi
  { venueId: 12, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Pro-level cricket training', text: 'Bowling machines, video analysis — this place has everything. Several Ranji players train here. The coaching is exceptional.' },
  { venueId: 12, userId: 28, userName: 'Rohit Verma', rating: 5, title: 'Delhi best cricket academy', text: 'State-of-the-art facilities. The practice nets are well-maintained. Great for serious cricketers wanting to improve.' },
  { venueId: 13, userId: 29, userName: 'Sneha Jain', rating: 4, title: 'Great badminton in CP', text: 'Convenient central location. Courts are well-maintained and the lighting is professional grade. Gets busy after 6 PM.' },
  { venueId: 13, userId: 31, userName: 'Kavita Rao', rating: 5, title: 'Best badminton courts in Delhi', text: '10 courts means you always get a slot. The synthetic flooring is excellent. Air conditioning is a must in Delhi summers.' },
  { venueId: 14, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Family-friendly sports complex', text: 'Great for families — kids play area while parents play sports. The running track is a nice addition. Value for money.' },
  { venueId: 15, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Exclusive tennis experience', text: 'The clay courts are beautifully maintained. Feels like a private club. The coaching staff is ATP-certified. Love it!' },
  { venueId: 15, userId: 29, userName: 'Sneha Jain', rating: 5, title: 'Tennis haven in South Delhi', text: 'Gorgeous courts in Hauz Khas. The clubhouse is elegant. Regular tournaments make it competitive and fun.' },
  { venueId: 16, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Solid football turf in Rohini', text: 'Good quality artificial turf. Both 5-a-side and full-size options are great. The floodlights work well for night games.' },

  // Bangalore
  { venueId: 17, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Tech hub favourite', text: 'Our whole office plays here every Friday. Great cricket nets, football turf, and badminton courts all in one place.' },
  { venueId: 17, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Best multi-sport in Koramangala', text: 'Convenient location, good facilities, and reasonable pricing. Corporate packages are excellent for team building.' },
  { venueId: 18, userId: 29, userName: 'Sneha Jain', rating: 5, title: 'Late night badminton heaven', text: 'Love that they have slots until 11 PM! Perfect for us IT folks. Maple wood flooring is top quality.' },
  { venueId: 18, userId: 31, userName: 'Kavita Rao', rating: 5, title: 'Premium badminton experience', text: 'The best badminton facility in Bangalore. 8 courts, excellent flooring, and great AC. Worth every rupee.' },
  { venueId: 19, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Good cricket ground in HSR', text: 'Well-maintained ground with proper practice nets. Weekend league matches are competitive and well-organized.' },
  { venueId: 20, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'ATP-level tennis in Whitefield', text: 'Incredible tennis facility. The coaching staff is world-class. Both clay and hard courts are immaculate.' },
  { venueId: 21, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Great for post-work sports', text: 'Love playing pickleball here after work. The fitness center is a nice bonus. Good facility for Electronic City residents.' },

  // Chennai
  { venueId: 22, userId: 27, userName: 'Arpit Soni', rating: 5, title: 'Historic cricket ground', text: 'The outfield is gorgeous. Playing here feels special. The pavilion and the whole atmosphere remind you of classic cricket.' },
  { venueId: 22, userId: 29, userName: 'Sneha Jain', rating: 4, title: 'Beautiful cricket venue', text: 'Well-maintained ground with excellent facilities. The day-night match experience under floodlights is amazing.' },
  { venueId: 23, userId: 28, userName: 'Rohit Verma', rating: 4, title: 'Good all-round facility', text: 'Nice complex in Anna Nagar with multiple sports. Clean facilities and ample parking. Good for families.' },
  { venueId: 23, userId: 31, userName: 'Kavita Rao', rating: 5, title: 'Best sports complex in Anna Nagar', text: 'Indoor and outdoor facilities both are excellent. My kids love it here. Equipment rental is very convenient.' },
  { venueId: 24, userId: 30, userName: 'Amit Sharma', rating: 4, title: 'Premium football turf on OMR', text: 'FIFA-quality grass makes a real difference. LED floodlights are bright and clear. Popular with IT companies on OMR.' },
  { venueId: 24, userId: 27, userName: 'Arpit Soni', rating: 4, title: 'Great turf for night games', text: 'Love playing here after work. The 7v7 format is perfect for our group. Turf quality is consistently maintained.' },
  { venueId: 25, userId: 29, userName: 'Sneha Jain', rating: 5, title: 'Central location, great courts', text: 'Right in T Nagar! Both badminton and tennis courts are well-maintained. The coaching is professional and affordable.' },
  { venueId: 26, userId: 28, userName: 'Rohit Verma', rating: 5, title: 'Chennai pickleball pioneer', text: 'Great outdoor courts with proper shading. The community is growing fast. Weekend tournaments are really fun.' },
  { venueId: 26, userId: 31, userName: 'Kavita Rao', rating: 4, title: 'Fun new sport, great venue', text: 'Started pickleball here as a complete beginner. The coaches are patient and encouraging. Shaded courts are a blessing in Chennai heat.' },
];

async function seed() {
  await connectMongo();
  await Review.deleteMany({});
  await Review.insertMany(reviews);
  console.log(`Seeded ${reviews.length} reviews`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
