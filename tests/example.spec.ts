import { expect, test } from "@playwright/test";

test("🐳", async ({ page }) => {
  await page.goto("/");

  // Note that we don't see the balance on small viewports
  await page.getByText(/Connect Wallet/).click();
  await page.getByText(/Send message/).click();
  await expect(page.getByText("10k ETH")).toBeVisible();
  await expect(page.getByText("0xf3…2266")).toBeVisible();
});
