import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// Mock ResponsiveContainer to avoid Recharts warnings in tests
vi.mock("recharts", async () => {
  const OriginalModule = await vi.importActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        "div",
        { style: { width: "100%", height: "100%", minWidth: "0", minHeight: "0" } },
        children,
      ),
  };
});
