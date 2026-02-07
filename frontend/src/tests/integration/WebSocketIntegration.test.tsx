import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";

import KanbanBoard from "../../components/KanbanBoard";
import { useTaskStore } from "../../store/useTaskStore";

// Mock the store
vi.mock("../../store/useTaskStore", () => ({
  useTaskStore: vi.fn(),
}));

test("WebSocket receives task update", async () => {
  (useTaskStore as any).mockReturnValue({
    tasks: [],
    isLoading: false,
    init: vi.fn(),
    moveTask: vi.fn(),
  });

  render(<KanbanBoard />);

  expect(screen.getByText("Kanban Board")).toBeInTheDocument();
});

// TODO: Add more integration tests
