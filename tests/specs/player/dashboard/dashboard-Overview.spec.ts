import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";

import { QA_USER } from "../fixtures/test-users";

test.describe("dashboard overview", {
    tag: "@PE-DA",
}, () => {
    

    test.beforeEach(async ({ page }) => {
        const dashboard = new Dashboard(page);

    
        await dashboard.goto();
    })
    


    test("view user welcome", {
        tag: "@PE-DA-OV",
    },
        async ({ page }) => {

            await expect(page.getByTestId("dashboard-welcome-banner")).toContainText(QA_USER.firstname);

        })
})