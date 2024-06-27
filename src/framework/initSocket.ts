import { Server, Socket } from "socket.io";
import http from "http";
import { saveRiderLocation, updateRiderStatus } from "../services/rider";

// Define a map to store connected riders
const connectedRiders: Map<
  string,
  { riderId: string; location?: any; status?: string }
> = new Map();

export const initSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Rider connected: ${socket.id}`);

    socket.on("riderConnected", (data) => {
      const { riderId } = data;
      // Store the rider's ID and initialize with default status and location
      connectedRiders.set(socket.id, { riderId });
      console.log(`Rider ${riderId} connected.`);
    });

    socket.on("updateLocation", async (data) => {
      const { riderId, location } = data;
      await saveRiderLocation(riderId, location);
      // Update location in connectedRiders map
      if (connectedRiders.has(socket.id)) {
        connectedRiders.get(socket.id).location = location;
      }
      io.emit("locationUpdated", { riderId, location });
    });

    socket.on("updateStatus", async (data) => {
      const { riderId, status } = data;
      await updateRiderStatus(riderId, status);
      // Update status in connectedRiders map
      if (connectedRiders.has(socket.id)) {
        connectedRiders.get(socket.id).status = status;
      }
      io.emit("statusUpdated", { riderId, status });
    });

    socket.on("disconnect", () => {
      if (connectedRiders.has(socket.id)) {
        const { riderId } = connectedRiders.get(socket.id);
        connectedRiders.delete(socket.id);
        console.log(`Rider ${riderId} disconnected: ${socket.id}`);
      }
    });
  });

  return io;
};
