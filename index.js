import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

mongoose
  .connect(process.env.MONGO_NEW)
  .then(() => {
    console.log("Connect to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.listen(3000, () => {
  console.log("server running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
