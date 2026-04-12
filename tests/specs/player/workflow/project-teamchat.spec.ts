import test, { expect } from "@playwright/test";
import { Arena } from "../../../pages/arena.page.ts";
import { Program } from "../../../pages/program.page.ts";





test.describe("Program Team Chat functionality", {
    tag: "@PE-PR-TC"
}, () => {

    test.beforeEach(async ({ page }) => {
        const program = new Program(page);
        await program.goto();
    })

    test("Team chat and members are visible in the arena", {
        tag: "@PE-PR-TC-01",
    }, async ({ page }) => {
        await expect(page.getByTestId("team-section")).toBeVisible();
        await expect(page.getByTestId("team-mentor-card")).toBeVisible();
        await expect(page.getByTestId("team-member-card").first()).toBeVisible();
    })

    test("Clicking a member opens the correct conversation",{},async ({page})=>{
        
        await page.getByTestId("team-member-card").first().click();

        // asser the chat box is open and the header contains the correct member name
        // still need some test ids for this part
    })
})