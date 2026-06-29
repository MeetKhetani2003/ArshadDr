import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not defined. Database operations will be disabled.");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// Helper to get GridFS Bucket
export async function getGridFSBucket() {
  await dbConnect();
  const db = mongoose.connection.db;
  return new mongoose.mongo.GridFSBucket(db, {
    bucketName: "media",
  });
}
