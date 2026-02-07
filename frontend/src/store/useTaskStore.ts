import { create } from "zustand";
import { io } from "socket.io-client";

import type { Task, TaskStatus } from "@/types/task";

const socket = io(import.meta.env.VITE_WS_URL ?? "http://localhost:5000");

type TaskStore = {
  tasks: Task[];
  isLoading: boolean;

  init: () => void;

  createTask: (taskData: Omit<Task, "_id">) => void;
  updateTask: (taskData: Task) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>((set, _) => ({
  tasks: [],
  isLoading: true,

  init: () => {
    // Get all tasks
    socket.on("sync:tasks", (tasks) => {
      set({ tasks, isLoading: false });
    });

    // Create task
    socket.on("task:create", (task) => {
      set((state) => ({ tasks: [task, ...state] }));
    });

    // Update task
    socket.on("task:update", (updatedTask) => {
      set((state) => state.tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    });

    // Delete task
    socket.on("task:create", (id) => {
      set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
    });
  },

  createTask: (taskData) => {
    socket.emit("task:create", taskData);
  },

  updateTask: (taskData) => {
    socket.emit("task:update", taskData);
  },

  moveTask: (id, status) => {
    socket.emit("task:move", { id, status });
  },

  deleteTask: (id) => {
    socket.emit("task:delete", id);
  },
}));
