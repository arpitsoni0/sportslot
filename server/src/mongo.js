import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sportslot';

export async function connectMongo() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}

export default mongoose;
