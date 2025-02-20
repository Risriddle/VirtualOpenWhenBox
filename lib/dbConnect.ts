// "use server"

// import mongoose from 'mongoose';


// const MONGODB_URI = process.env.MONGODB_URI || "";

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// interface CachedMongoose {
//   conn: mongoose.Connection | null;
//   promise: Promise<typeof mongoose> | null;
// }

// const cached: CachedMongoose = (global as any).mongoose || { conn: null, promise: null };

// const dbConnect = async () => {
//   if (mongoose.connection.readyState >= 1) {
//     return;
//   }
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     console.log("Mongoose Import:==========================================="); // Debugging

//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         bufferCommands: true,
//       })
//       .then((mongoose) => {
//         console.log("MongoDB Connected");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("MongoDB Connection Error:", err);
//         throw err;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// (global as any).mongoose = cached;
// export default dbConnect;












"use server";

import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Define an interface for caching the Mongoose connection
interface CachedMongoose {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Declare a global variable to persist the connection across hot reloads
declare global {
  var mongoose: CachedMongoose | undefined;
}

// Retrieve the cached connection or initialize a new cache object
const cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

const dbConnect = async (): Promise<Connection> => {
  if (cached.conn) return cached.conn; // Return cached connection if available

  if (!cached.promise) {
    console.log("Mongoose Import:===========================================");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: true,
      })
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose.connection; // Return the actual connection
      })
      .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // Store in global

  return cached.conn;
};

export default dbConnect;
