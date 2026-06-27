import { connectMongo } from './mongo.js';
import Review from './models/Review.js';

const reviews = [
  { venueId: 1, userId: 7, userName: 'Arpit Soni', rating: 5, title: 'Best cricket turf in Jaipur', text: 'Amazing facility with well-maintained pitch. The floodlights are great for evening sessions. Booked multiple times and never disappointed.' },
  { venueId: 1, userId: 8, userName: 'Rohit Verma', rating: 4, title: 'Great ground, could use more parking', text: 'Excellent playing surface and the nets are professional grade. Only downside is limited parking during weekends. Staff is very helpful.' },
  { venueId: 1, userId: 9, userName: 'Sneha Jain', rating: 5, title: 'Perfect for corporate tournaments', text: 'We organized our company cricket tournament here. The facilities were top-notch and the owner was very accommodating with scheduling.' },
  { venueId: 2, userId: 7, userName: 'Arpit Soni', rating: 5, title: 'Superb badminton courts', text: 'The wooden courts are excellent quality. AC keeps the hall comfortable even in summer. Love playing here every weekend!' },
  { venueId: 2, userId: 10, userName: 'Amit Sharma', rating: 4, title: 'Good courts, fair pricing', text: 'Clean courts and good lighting. The coaching staff is knowledgeable. Equipment rental is convenient for beginners. Worth the price.' },
  { venueId: 2, userId: 11, userName: 'Kavita Rao', rating: 5, title: 'My go-to badminton spot', text: 'Been coming here for 3 months. Courts are always clean, AC works well, and the cafeteria has decent snacks. Highly recommend!' },
  { venueId: 3, userId: 8, userName: 'Rohit Verma', rating: 4, title: 'Solid football turf', text: 'Good quality artificial grass. Perfect for 5-a-side matches. The floodlights make evening games enjoyable. Would love more water stations.' },
  { venueId: 3, userId: 9, userName: 'Sneha Jain', rating: 4, title: 'Fun place for weekend football', text: 'Great turf quality and the goal posts are sturdy. Changing rooms are clean. A bit far from the city center but worth the drive.' },
  { venueId: 4, userId: 10, userName: 'Amit Sharma', rating: 5, title: 'Professional tennis experience', text: 'Both clay and hard courts are maintained beautifully. The coaching is excellent. Best tennis facility in Jaipur without a doubt.' },
  { venueId: 4, userId: 11, userName: 'Kavita Rao', rating: 4, title: 'Great for tennis lovers', text: 'Beautiful courts and professional atmosphere. The pro shop has decent equipment. Would love if they extended evening hours.' },
  { venueId: 5, userId: 7, userName: 'Arpit Soni', rating: 4, title: 'Nice multi-sport complex', text: 'Good variety of sports available. The cricket nets and football turf are well maintained. Cafeteria food is good too.' },
  { venueId: 5, userId: 9, userName: 'Sneha Jain', rating: 4, title: 'Decent all-round facility', text: 'Good for groups wanting to play different sports. Weekend tournament packages are value for money. Seating gallery is a nice touch.' },
  { venueId: 6, userId: 8, userName: 'Rohit Verma', rating: 5, title: 'Pickleball paradise!', text: 'Finally a dedicated pickleball facility in Jaipur! Indoor courts with AC — perfect. Equipment provided is good quality. The coaching sessions are really helpful for beginners.' },
  { venueId: 6, userId: 10, userName: 'Amit Sharma', rating: 5, title: 'Fantastic new venue', text: 'Love this place! Clean indoor courts, friendly staff, and great community events. Pickleball is growing fast and this venue is leading the way in Jaipur.' },
  { venueId: 6, userId: 11, userName: 'Kavita Rao', rating: 4, title: 'Great for beginners', text: 'Started playing pickleball here last month. The coaches are patient and the community is welcoming. Courts are always available on weekday mornings.' },
];

async function seed() {
  await connectMongo();
  await Review.deleteMany({});
  await Review.insertMany(reviews);
  console.log(`Seeded ${reviews.length} reviews`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
