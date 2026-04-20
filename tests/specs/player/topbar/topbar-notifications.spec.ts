import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";




test.describe("notification functionality", () => {


    test("should view the count of unread notifications", async ({ page }) => {

        // const notificationsCount = 13;
        // await notificationCountApi(page, notificationsCount);

        // const dashboard = new Dashboard(page);
        // await dashboard.goto();

        // await expect(page.getByTestId("topbar-notifications")).toContainText(notificationsCount.toString());
    })

    test("should open notification panel", async ({ page }) => {

        const dashboard = new Dashboard(page);
        await dashboard.goto();

        await page.getByTestId("topbar-notifications").click();

        // await expect().toBeVisible();
    })
})