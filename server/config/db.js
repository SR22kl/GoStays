import mongoose from "mongoose";

//Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/gostays`);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
export default connectDB;
