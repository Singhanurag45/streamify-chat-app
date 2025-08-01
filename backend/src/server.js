import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';

const app = express();//  Middleware to parse JSON bodies
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Add this in your `.env`
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// ✅ LOG COOKIE MIDDLEWARE (add here)
app.use((req, res, next) => {
  console.log("Cookies received:", req.cookies); // 💡 Shows jwt if present
  next();
});


import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/chatApp"; // default to local MongoDB if not set

mongoose
  .connect(mongoURI) // connect to MongoDB
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat", chatRoutes); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(`MongoDB URI: ${mongoURI}`); // Log the MongoDB URI for debugging
  // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`); // Log
  // console.log("🔑 JWT Secret:", process.env.JWT_SECRET_KEY); // Add this in login controller
});