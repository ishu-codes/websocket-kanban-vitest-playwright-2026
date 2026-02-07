import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "src/tests/e2e",
  testMatch: "**/*.spec.ts",
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: "http://localhost:3000",
    viewport: { width: 1300, height: 720 },
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "pnpm dev",
    port: 3000,
    reuseExistingServer: true,
    env: {
      BROWSER: "none", // Prevent Vite from trying to open browser
    },
  },
});
