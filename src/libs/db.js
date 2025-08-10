import mongoose from "mongoose";

export const connectDB = async () => {
    if(!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined in environment variables");
    }
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}