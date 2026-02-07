import { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  description: String,

  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },

  category: {
    type: String,
    enum: ["Bug", "Feature", "Enhancement"],
    default: "Feature",
  },

  attachments: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Task = model("Task", TaskSchema);
