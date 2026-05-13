import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { QA_USER } from "../../../helpers/test-users";



test.describe("dashboard overview", {
    tag: "@PE-DA",
}, () => {
    

    test.beforeEach(async ({ page }) => {
        const dashboard = new Dashboard(page);
        await dashboard.goto();
    })
    


    test("No content fallback", {
        tag: "@PE-DA-OV-01",
    },
        async ({ page }) => {

            

        })
})