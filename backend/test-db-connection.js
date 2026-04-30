import mongoose from "mongoose";
import "dotenv/config";

const testConnect = async () => {
  try {
    console.log("Connecting to:", `${process.env.MONGODB_URI}/healthlink`);
    await mongoose.connect(`${process.env.MONGODB_URI}/healthlink`, {
        serverSelectionTimeoutMS: 5000
    });
    console.log("SUCCESS: Connected to MongoDB!");
    process.exit(0);
  } catch (err) {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    process.exit(1);
  }
};

testConnect();
