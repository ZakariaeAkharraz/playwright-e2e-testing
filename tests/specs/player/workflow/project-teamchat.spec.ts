import test, { expect } from "@playwright/test";
import { Arena } from "../../../pages/arena.page.ts";
import { Project } from "../../../pages/project.page.ts";





test.describe("Project Team Chat functionality", {
    tag: "@PE-PR-TC"
}, () => {
    test.skip()
    test.beforeEach(async ({ page }) => {
        const project = new Project(page);
        await project.goto();
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