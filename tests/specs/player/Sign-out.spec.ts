import test, { expect } from "@playwright/test";
import { Dashboard } from "../../pages/dashboard.page";

test("user should be able to sign-out",{
    tag:"@AU-SO-01"
}, async ({ page, request }) => {
    const dashboard = new Dashboard(page)

    await dashboard.goto();

    await page.getByTestId("sidebar-logout-button").click()

    await page.waitForURL("**sign-in**");

    await dashboard.goto()
    await page.reload()
    await page.waitForURL("**sign-in**");


})