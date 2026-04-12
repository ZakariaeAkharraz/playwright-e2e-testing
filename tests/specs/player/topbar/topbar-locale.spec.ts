import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";


test.describe("i18n functionality", () => {

    test("should view laguage panel", async ({ page }) => {

        const dashboard = new Dashboard(page);

        await dashboard.goto();

        await page.getByTestId("topbar-language").click();
        await expect(page.getByRole("menu").filter({ has: page.getByRole('menuitem', { name: '🇺🇸 English' }) })).toBeVisible();

    })

    test("should change language to english", async ({ page }) => {
        const dashboard = new Dashboard(page);

        await dashboard.goto("fr");

        await page.getByTestId("topbar-language").click();
        await page.getByRole('menuitem', { name: '🇺🇸 English' }).click();

        const url = page.url();
        expect(url).toContain("/en");
    })

    test("links should have correct locale param based on the chosen language", async ({ page }) => {
        const dashboard = new Dashboard(page);

        await dashboard.goto("en");

        const frenchLink = page.locator('a[href^="/fr/"]');

        console.log(frenchLink.first());
        await expect(frenchLink).toHaveCount(0);

    })
})
