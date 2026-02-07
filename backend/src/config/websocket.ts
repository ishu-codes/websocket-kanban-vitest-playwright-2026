import { Server } from "socket.io";

import { server } from "./server.js";
import { Task } from "../models/task.model.js";

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  // Sync all tasks on connection
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    socket.emit("sync:tasks", tasks);
  } catch (err) {
    console.error("Error syncing tasks:", err);
  }

  // Create Task
  socket.on("task:create", async (taskData) => {
    try {
      const newTask = new Task(taskData);
      await newTask.save();
      io.emit("task:create", newTask);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  });

  // Update task
  socket.on("task:update", async (updatedData) => {
    try {
      const { _id, ...rest } = updatedData;
      const updatedTask = await Task.findByIdAndUpdate(_id, rest, { new: true });
      io.emit("task:update", updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  });

  // Move task
  socket.on("task:move", async ({ id, status }) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
      io.emit("task:update", updatedTask);
    } catch (err) {
      console.error("Error moving task:", err);
    }
  });

  // Delete task
  socket.on("task:delete", async (id) => {
    try {
      await Task.findByIdAndDelete(id);
      io.emit("task:delete", id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
