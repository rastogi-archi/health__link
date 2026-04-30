import mongoose from "mongoose";
import fs from "fs";
import path from "path";

let dbConnected = false;
const dbPath = path.resolve("mock_db.json");

// Load initial data from file if it exists
let mockDoctorsStore = [];
if (fs.existsSync(dbPath)) {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    mockDoctorsStore = JSON.parse(data);
  } catch (err) {
    console.error("Error loading mock database:", err);
  }
} else {
  // Default data
  mockDoctorsStore = [
    {
      _id: "mock1",
      name: "Dr. Richard James",
      image: "https://res.cloudinary.com/dtgsok1pu/image/upload/v1/doctors/doc1.png",
      speciality: "General physician",
      degree: "MBBS",
      experience: "4 Years",
      about: "Dr. Richard has a strong commitment to delivering comprehensive medical care.",
      fees: 50,
      address: { line1: "17th Cross, Richmond", line2: "Circle, Ring Road" },
      available: true
    }
  ];
}

const saveMockDB = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(mockDoctorsStore, null, 2));
  } catch (err) {
    console.error("Error saving mock database:", err);
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/healthlink`, {
      serverSelectionTimeoutMS: 2000
    });
    console.log("Database Connected");
    dbConnected = true;
  } catch (error) {
    console.error("Database connection error:", error.message);
    dbConnected = false;
    console.log("Using persistent JSON Mock Database...");
  }
};

export { connectDB as default, dbConnected, mockDoctorsStore, saveMockDB };
