import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";

import KanbanBoard from "@/components/KanbanBoard";
import { useTaskStore } from "@/store/useTaskStore";

// Mock the store
vi.mock("@/store/useTaskStore", () => ({
  useTaskStore: vi.fn(),
}));

test("renders Kanban board title", () => {
  (useTaskStore as any).mockReturnValue({
    tasks: [],
    isLoading: false,
    init: vi.fn(),
    moveTask: vi.fn(),
  });

  render(<KanbanBoard />);
  expect(screen.getByText("Kanban Board")).toBeInTheDocument();
});

test("renders columns when loaded", () => {
  (useTaskStore as any).mockReturnValue({
    tasks: [],
    loading: false,
    init: vi.fn(),
  });

  render(<KanbanBoard />);
  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Done")).toBeInTheDocument();
});
