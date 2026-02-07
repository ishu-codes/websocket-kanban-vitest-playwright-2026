import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongooseUri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/admin";

export async function connectDB() {
  try {
    await mongoose.connect(mongooseUri);
    console.log("Database connected!");
  } catch (err) {
    console.error(`MongoDB failed to connect! ${err}`);
    process.exit(1);
  }
}
