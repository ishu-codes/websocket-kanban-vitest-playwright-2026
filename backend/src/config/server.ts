import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

const server = http.createServer(app);

export { server };
