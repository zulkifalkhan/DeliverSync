import { Server } from "socket.io";
import { saveRiderLocation, updateRiderStatus } from "../services/rider";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Rider connected: ${socket.id}`);

  socket.on("updateLocation", async (data) => {
    const { riderId, location } = data;
    await saveRiderLocation(riderId, location);
    io.emit("locationUpdated", { riderId, location });
  });

  socket.on("updateStatus", async (data) => {
    const { riderId, status } = data;
    await updateRiderStatus(riderId, status);
    io.emit("statusUpdated", { riderId, status });
  });

  socket.on("disconnect", () => {
    console.log(`Rider disconnected: ${socket.id}`);
  });
});

io.listen(3000);
