import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { QA_USER } from "../../../helpers/test-users";



    test.beforeEach(async ({page})=>{
        const dashboard = new Dashboard(page);
        await dashboard.goto();
    })

    test("Arena workflow",{
        tag:"@PE-AR-01",
    },async ({page})=>{

        await page.getByTestId(/^sidebar-nav-arenas/).click();

        const Qa_arena = await page.getByTestId(/^sidebar-nav-child-arenas/).filter({hasText:QA_USER.arena.name});
        await expect(Qa_arena).toBeVisible();

        await page.waitForURL(/.*arenas.*/);

        // await expect(await page.getBy)
        await page.waitForLoadState()
        
        
        await expect(await page.locator("[data-tutorial='project-cards']").first()).toBeVisible();
        
    })

    // test("should display arena correct name", {
    //     tag: "@PE-AR-02",
    // }, async ({ page }) => {

    // })

    // test("should redirect to the arena page on click", {
    //     tag: "@PE-AR-03",
    // }, async ({ page }) => {
        
    // })