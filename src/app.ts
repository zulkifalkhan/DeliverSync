import express from "express";
import http from "http";
import dotenv from "dotenv";
import initDatabase from "./framework/initDatabase";
import { startOrderConsumer } from "./services/queue";
import { connectRabbitMQ } from "./framework/initRabbitMQ";
import orderRoutes from "./server/routes/orders/orders.routes";
import riderRoutes from "./server/routes/riders/riders.routes";
import { initSocketServer } from "./framework/initSocket";
import redisClient from "./framework/initRedis"; // Import redisClient from initRedis.ts

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to Redis
// No need to create a new redisClient instance here if already imported

// Connect to database
initDatabase();

// Connect to RabbitMQ and start consumer
connectRabbitMQ(() => {
  startOrderConsumer();
});

// Mount routes
app.use("/api", orderRoutes);
app.use("/api", riderRoutes);

// Create HTTP server instance
const server = http.createServer(app);

// Initialize Socket.IO server
export const io = initSocketServer(server);

// Handle Socket.IO server events or errors
io.on("error", (err) => {
  console.error("Socket.IO Error:", err);
});

// Start Express server listening
// app.listen(port, () => {
//   console.log(`Express is listening at http://localhost:${port}`);
// });

// Start HTTP server
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
