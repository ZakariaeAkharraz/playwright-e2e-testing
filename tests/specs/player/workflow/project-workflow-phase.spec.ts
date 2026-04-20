


// Program phases are displayed	PE-PR-PH-01
// Completed phases are visually distinguished from incomplete phases	PE-PR-PH-02
// Player can click a phase to view its missions	PE-PR-PH-03
// Current phase missions are shown by default	PE-PR-PH-04
// Fallback message is shown when a phase has no missions	PE-PR-PH-05

import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { program } from "../../../helpers/test-program";
import { Arena } from "../../../pages/arena.page";

test.describe("program phases functionality", {
    tag: "@PE-PR-PH",
}, () => {

    test.beforeEach(async ({ page }) => {

        const dashboard = new Dashboard(page);
        await dashboard.goto();


    })

    test("progress workflow is displayed", {
        tag: "@PE-PR-PH-01",
    }, async ({ page }) => {
        const arena = new Arena(page);
        await arena.goto();
        await expect(page.getByTestId("workflow-progress")).toBeVisible();
        await expect(page.getByTestId("journey-map")).toBeVisible();
        await expect(page.locator("div[data-tutorial='active-missions']")).toBeVisible();

    })

    test("should view corresponding missions of a phase when clicking on it", async ({ page }) => {

        const arena = new Arena(page);
        await arena.goto();

        await page.locator("div[data-tutorial='project-cards']").first().click();

        await page.waitForURL(/.*projects.*/)

        // simple way to assert new missions are loaded, it is enough to assert the one of the old mission disappears
        // and there is at least one mission visible afrer clicking on the phase
        const firstMission = await page.locator("div[data-tutorial='active-missions']").locator("div[data-mission-id]").first().getAttribute("data-mission-id");
        await expect(page.locator(`div[data-mission-id="${firstMission}"]`)).toBeVisible();
        
        const phaseRequest = page.waitForRequest("**/steps-progress?phase=" + program[0].phases[0]+"*")
        await page.getByTestId(program[0].phaseTestIds[0]).click();
        await phaseRequest;


        await expect(page.locator("div[data-tutorial='active-missions']").locator("div[data-mission-id]").first()).toBeVisible();
        await expect(page.locator(`div[data-mission-id="${firstMission}"]`)).not.toBeVisible();
    




    })

})