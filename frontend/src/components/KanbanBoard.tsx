import { useState, useEffect } from "react";
// import { useShallow } from "zustand/shallow";
import { useTaskStore } from "@/store/useTaskStore";

const COLUMNS = ["To Do", "In Progress", "Done"];

export default function KanbanBoard() {
  const { tasks, isLoading, init, moveTask } = useTaskStore();

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  return (
    <div>
      <h2>Kanban Board</h2>
      {/* TODO: Implement task rendering and interactions */}
    </div>
  );
}
