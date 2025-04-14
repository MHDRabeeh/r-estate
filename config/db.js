import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cache object for MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise is pending, start a new connection
  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
        return conn;
      } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      }
    })();
  }

  // Await the connection and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

