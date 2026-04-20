import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { missionComplete, missionExpired, missionFactory, missionInProgress, missionNotStarted, missionFailed, missionExpiredEligible, mockMission } from "../../../helpers/missions.mock";
import { quickMissionsApi } from "../../../helpers/missions.handler";



test.describe("Quick Mission functionality", {
    tag: "@PE-DA-QM",
}, () => {

    test.beforeEach(async ({ page }) => {

    })

    test("should Quick Mission panel and missions be visible", {
        tag: "@PE-DA-QM-01",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);
        await dashboard.goto();
        await expect(page.getByTestId("dashboard-quick-mission-section")).toBeVisible();

        await expect(page.getByTestId("mission-card").first()).toBeVisible();

    })
    test("should mission card display correct details", {
        tag: "@PE-DA-QM-02",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);


        quickMissionsApi(page, [mockMission]);

        await dashboard.goto();

        const mockMissionCard = page.getByTestId("mission-card").first();
        await expect(mockMissionCard).toContainText(mockMission.projectName);
        await expect(mockMissionCard).toContainText(mockMission.title);


    })
    // add data-status indicator to assert the mission status
    test("COMPLETED mission shows complete indicator and earned XPs", {
        tag: "@PE-DA-QM-03",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickMissionsApi(page, [missionComplete])

        await dashboard.goto();


        const missionCompletedCard = page.getByTestId("mission-card").filter({visible: true}).first();

        await expect(missionCompletedCard).toContainText(/[1-9]* XP/i)
        await expect(missionCompletedCard).toHaveAttribute("data-status","completed")
    })

    test("EXPIRED mission shows expired indicator", {
        tag: "@PE-DA-QM-04",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);


        quickMissionsApi(page,[missionExpired])

        await dashboard.goto();
        const missionExpiredCard = page.getByTestId("mission-card").first()
        await expect(missionExpiredCard.getByRole("button")).not.toBeVisible();

        await expect(missionExpiredCard).toHaveAttribute("data-status",/EXPIRED/i)

        

    })

    test("IN_PROGRESS mission shows in progress indicator and continue button", {
        tag: "@PE-DA-QM-05",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        await quickMissionsApi(page, [missionInProgress]);

        await dashboard.goto();

        const missionInProgressCard = page.getByTestId("mission-card").filter({visible: true}).first()
        await expect(missionInProgressCard.getByRole("button")).toBeVisible();
        await expect(missionInProgressCard).toHaveAttribute("data-status", "in-progress")
        


    })

    test("NOT_STARTED mission shows start indicator and start button", {
        tag: "@PE-DA-QM-06",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);


        quickMissionsApi(page,[missionNotStarted])

        await dashboard.goto();

        

        const missionNotStartedCard = page.getByTestId("mission-card").filter({visible: true}).first()
        await expect(missionNotStartedCard.getByRole("button")).toBeVisible();

        await expect(missionNotStartedCard).toHaveAttribute("data-status", "not-started")
    })

    test("Player can scroll to view more missions", {
        tag: "@PE-DA-QM-07"
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickMissionsApi(page, missionFactory);


        await dashboard.goto();
        const nextPageRequest = page.waitForRequest(
            request => request.url().includes("page=2")
        )

        await page.getByTestId("dashboard-quick-mission-section").click();
        await page.keyboard.press("End");

        await nextPageRequest;

    })

    test("Fallback message is shown when no missions exist", {
        tag: "@PE-DA-QM-08",
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        quickMissionsApi(page)

        await dashboard.goto();

        await expect(page.getByTestId("dashboard-quick-mission-section").getByRole("img", { name: /^no+ |^aucune+ /i })).toBeVisible();

        await page.waitForTimeout(3000)
    })






})