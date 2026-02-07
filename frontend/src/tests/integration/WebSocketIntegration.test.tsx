import { render, screen } from "@testing-library/react";
import { expect, vi, describe, beforeEach, it } from "vitest";

import KanbanBoard from "@/components/KanbanBoard";
import { useTaskStore } from "@/store/useTaskStore";

// Mock the store
vi.mock("@/store/useTaskStore", () => ({
  useTaskStore: vi.fn(),
}));

describe("WebSocket Integration", () => {
  const mockTasks = [{ _id: "1", title: "Task 1", status: "To Do", priority: "Low", category: "Bug" }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays tasks synced from WebSocket", () => {
    (useTaskStore as any).mockReturnValue({
      tasks: mockTasks,
      loading: false,
      init: vi.fn(),
    });

    render(<KanbanBoard />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("shows correct task count in columns", () => {
    (useTaskStore as any).mockReturnValue({
      tasks: mockTasks,
      loading: false,
      init: vi.fn(),
    });

    render(<KanbanBoard />);
    const todoCount = screen.getByText("1"); // Badge count for To Do
    expect(todoCount).toBeInTheDocument();
  });
});
