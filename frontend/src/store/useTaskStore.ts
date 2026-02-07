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
    // Remove existing listeners to prevent duplicates
    socket.off("sync:tasks");
    socket.off("task:create");
    socket.off("task:update");
    socket.off("task:delete");

    // Get all tasks
    socket.on("sync:tasks", (tasks) => {
      set({ tasks, isLoading: false });
      console.log(tasks);
    });

    // Create task
    socket.on("task:create", (task) => {
      set((state) => {
        // Prevent duplicate tasks if the message is received multiple times
        if (state.tasks.some((t) => t._id === task._id)) return state;
        return { tasks: [task, ...state.tasks] };
      });
    });

    // Update task
    socket.on("task:update", (updatedTask) => {
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)),
      }));
    });

    // Delete task
    socket.on("task:delete", (id) => {
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
