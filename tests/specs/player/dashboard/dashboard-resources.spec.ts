import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";

test.describe("dashboard resources", {
    tag: "@PE-DA-RE",
}, () => {






    test("resources panel is visible on the dashboard", {
        tag: "@PE-DA-RE-01",
    },
        async ({ page }) => {
            const dashboard = new Dashboard(page);

            dashboard.goto();

            await expect(page.getByTestId("resources-card")).toBeVisible();
            await page.waitForTimeout(3000)
        })

    test("should download a resource from the resources panel", {
        tag: "@PE-DA-RE-02",
    },
        async ({ page }) => {
            const dashboard = new Dashboard(page);


            dashboard.goto();

            const downloadPromise = page.waitForEvent("download");
            
            const resourceElement = page.getByTestId("resource-item-0")

            await resourceElement.getByRole("button").click();

            const download = await downloadPromise;


        })
})