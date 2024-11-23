import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

export const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");

    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("Database connection failed", error.message);
    process.exit(1); // Exit process with failure
  }
};
