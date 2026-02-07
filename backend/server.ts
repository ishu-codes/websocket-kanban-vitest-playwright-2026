import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  // TODO: Implement WebSocket events for task management

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));
