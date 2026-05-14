import  { expect } from "@playwright/test";
import { Dashboard } from "../../pages/dashboard.page";
import { test } from "../../fixtures/parallel-workers-fixture";

test("user should be able to sign-out",{
    tag:"@AU-SO-01"
}, async ({ page }) => {
    const dashboard = new Dashboard(page)

    await dashboard.goto();

    await page.getByTestId("sidebar-logout-button").click()

    await page.waitForURL("**sign-in**");

    await dashboard.goto()
    await page.reload()
    await page.waitForURL("**sign-in**");


})