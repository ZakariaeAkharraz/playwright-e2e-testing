import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";


test.describe("settings functionality",
    {
        tag: "@AU-SE"
    }, async () => {
        test.beforeEach(async ({ page }) => {
            const dashboard = new Dashboard(page);
            dashboard.goto();
        })
        test("should be redirected to settings page (from sidebar)", {
            tag: "@AU-SE-01"
        }, async ({ page }) => {
            await page.getByTestId("sidebar-nav-settings").click();

            await expect(page).toHaveURL(/.*\/settings/);
            await page.waitForTimeout(3000)
        })

        test.describe("settings page", () => {

            test.beforeEach(async ({ page }) => {
                await page.getByTestId("sidebar-nav-settings").click();
                await page.waitForURL(/.*\/settings/);

            })

            test("should view user correct information", {
                tag: "@AU-SE-02"
            }, async ({ page }) => {
                
            })

            test("should be able to update username", {
                tag: "@AU-SE-03"
            }, async ({ page }) => {

            })

            test("should be able to update password", {
                tag: "@AU-SE-04"
            }, async ({ page }) => {

            })
        })
    })