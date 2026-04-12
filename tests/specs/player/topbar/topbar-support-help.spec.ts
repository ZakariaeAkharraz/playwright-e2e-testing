import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";


test.describe("help and support functionalities",
    {
        tag:"@AU-HE @AU-SU",
    },()=>{

    test.beforeEach(async ({page})=>{
        const dashboard= new Dashboard(page);

        await dashboard.goto();

        await page.getByTestId("topbar-support").click();
    })

    test("should open the help panel",{
        tag:"@AU-HE-01"
    },async ({page})=>{

        const supportMenu = page.getByRole("menu").filter({has: page.getByRole('menuitem', { name: 'Support' })})
        await supportMenu.getByRole("menuitem").first().click();
        await page.waitForTimeout(3000);
        // await expect().toBeVisible();
    })

    test("should open the support panel",async ({page})=>{

        // const supportMenu = page.getByRole("menu").filter({has: page.getByRole('menuitem', { name: 'Support' })})
        await page.getByRole('menuitem', { name: 'Support' }).click();

        await expect(page.locator(".tawk-flex").first()).toBeVisible();
        await page.waitForTimeout(10000);
        // await expect().toBeVisible();
        
    })

    
})