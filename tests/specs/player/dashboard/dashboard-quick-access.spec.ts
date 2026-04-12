import { test, expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { quickAccessMissionsApi } from "./fixtures/missions.handler";
import { missionComplete, missionExpired, missionInProgress, missionNotStarted, mockMission } from "./fixtures/missions.mock";




test.describe("Quick Access panel functionality", {
    tag: "@PE-DA-QA",
}, () => {



    test("Quick access panel and items are visible", {
        tag: "@PE-DA-QA-01",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickAccessMissionsApi(page, [mockMission]);

        await dashboard.goto();

        await expect(page.getByTestId("quick-access-card")).toBeVisible();
        await expect(page.getByTestId(/^quick-access-item/).first()).toBeVisible();
        await page.waitForTimeout(3000);
    })

    test("Quick access card displays correct details ", {
        tag: "@PE-DA-QA-02",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickAccessMissionsApi(page, [mockMission]);

        await dashboard.goto();
        await page.waitForTimeout(3000);
        const missionMockCard = page.getByTestId("quick-access-item-0")

        await expect(missionMockCard).toContainText(mockMission.title)

    })

    test("Completed mission shows completed indicator", {
        tag: "@PE-DA-QA-03",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickAccessMissionsApi(page, [missionComplete])

        await dashboard.goto();


        const missionCompletedCard = page.getByTestId("quick-access-item-0")

        await expect(missionCompletedCard).toHaveAttribute("data-status","completed")

    })

    test("Expired mission shows expired indicator", {
        tag: "@PE-DA-QA-04",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);


        quickAccessMissionsApi(page, [missionExpired])

        await dashboard.goto();
        const missionExpiredCard = page.getByTestId("quick-access-item-0")
        await expect(missionExpiredCard.getByRole("button")).not.toBeVisible();
        await page.waitForTimeout(3000)
        await expect(missionExpiredCard).toHaveAttribute("data-status","expired")
    })

    test("Available mission shows a not started indicator", {
        tag: "@PE-DA-QA-05",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);
        
        
                quickAccessMissionsApi(page,[missionNotStarted])
        
                await dashboard.goto();
        
        
                const missionNotStartedCard = page.getByTestId("quick-access-item-0")
                await expect(missionNotStartedCard.getByRole("button")).toBeVisible();
        
                await expect(missionNotStartedCard).toHaveAttribute("data-status", "not-started")
    })

    test("Fallback message is shown when no quick access items exist", {
        tag: "@PE-DA-QA-06",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickAccessMissionsApi(page)

        await dashboard.goto();

        await expect(page.getByText('Aucun événement disponibleIl')).toBeVisible();

        await page.waitForTimeout(3000)
    })

})