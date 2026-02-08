import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import "./config/websocket.js";
import { app, server } from "./config/server.js";

app.get("/", (_, res) => {
  return res.status(200).json({
    title: "Welcome to Websocket-kanban-vitest project",
    author: {
      name: "Ishu",
      github: "https://github.com/ishu-codes",
      linkedIn: "https://www.linkedin.com/in/ishu-codes/",
    },
  });
});

await connectDB();

export default server;
