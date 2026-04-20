import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";


test.describe("Arena functionality", {
    tag: "@PE-AR"
}, () => {
    test.beforeEach(async ({page})=>{
        const dashboard = new Dashboard(page);

        await dashboard.goto();
    })

    test("should list existing arenas when clicking on MyArena",{
        tag:"@PE-AR-01",
    },async ({page})=>{

        await page.getByTestId(/^sidebar-nav-arenas/).click();
        const arenasCount = await page.getByTestId(/^sidebar-nav-child-arenas/).count();
        expect(arenasCount).toBeGreaterThanOrEqual(1);
    })

    test("should display arena correct name", {
        tag: "@PE-AR-02",
    }, async ({ page }) => {

    })

    test("should redirect to the arena page on click", {
        tag: "@PE-AR-03",
    }, async ({ page }) => {
        
    })

})