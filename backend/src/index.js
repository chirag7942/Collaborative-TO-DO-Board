// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";


import authRoutes from "./routes/auth.js";


import taskRoutes from "./routes/tasks.js";

/*
import logRoutes from "./routes/logs.js";

import { socketHandler } from "./sockets/socketHandler.js";

*/

dotenv.config();

const app = express();

/*
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

*/

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);


app.use("/api/tasks", taskRoutes);

/*
app.use("/api/logs", logRoutes);

// Socket setup
io.on("connection", (socket) => socketHandler(socket, io));

*/

// Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB Connection Error:", err));


  //A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow).