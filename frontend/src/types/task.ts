export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskCategory = "Bug" | "Feature" | "Enhancement";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  attachments: (string | ArrayBuffer | null)[];
};
