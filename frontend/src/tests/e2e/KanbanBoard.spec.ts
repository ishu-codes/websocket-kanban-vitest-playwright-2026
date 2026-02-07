import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the kanban board", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Kanban Board" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "To Do" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "In Progress" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Done" })).toBeVisible();
  });

  test("should open add task modal", async ({ page }) => {
    await page.getByRole("button", { name: "Add Task" }).click();
    await expect(page.getByText("Create New Task")).toBeVisible();
  });

  test("should be able to fill and create a task", async ({ page }) => {
    const uniqueTitle = `New E2E Task ${Date.now()}`;
    await page.getByRole("button", { name: "Add Task" }).click();
    await page.locator("#title").fill(uniqueTitle);
    await page.locator("#description").fill("This is a test task");
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.getByText(uniqueTitle).first()).toBeVisible();
  });
});
