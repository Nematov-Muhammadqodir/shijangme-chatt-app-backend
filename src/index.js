import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./lib/socket.js"; // keep using same app instance
import path from "path";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

app.use(
  cors({
    origin: [
      "http://kadai.uz",
      "http://localhost:3000",
      "http://72.60.41.172:3000",
      "http://72.60.41.172:5001",
    ],
    credentials: false, // <-- no cookies now
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // <-- important
  })
);

app.use("/uploads", express.static("./uploads"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
