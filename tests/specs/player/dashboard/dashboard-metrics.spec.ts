import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";




test.describe("dashboard metrics", {

}, () => {

    const dashboardStats = {
        "xp": 24,
        "missions": 4,
        "quests": 4,
        "badges": 7,
        "avg_completion_time": 12,
        "engagement_rate": 94,
        "completion_rate": 4,
        "performance_score": 21,
        "steps_completion_rate": 0.10344827586206896

    }


    test("should display correct metrics values ", {
        tag: "@PE-DA-ME-01 "
    }, async ({ page }) => {

        const dashboard = new Dashboard(page);

        await page.route("**/api/core/dashboard-stats", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'applicaiton/json',
                body: JSON.stringify({
                    data: dashboardStats,
                })
            })
        })
        await dashboard.goto();
        // await expect(page.locator('div[data-tutorial="stats-xp"]').filter({ hasText: dashboardStats.xp+" Coins" })).toBeVisible();

        await expect(page.getByTestId('stats-card-missions').filter({ hasText: dashboardStats.missions.toString() })).toBeVisible();
        await expect(page.getByTestId('stats-card-quests').filter({ hasText: dashboardStats.quests.toString() })).toBeVisible();
        await expect(page.getByTestId('stats-card-badges').filter({ hasText: dashboardStats.badges.toString() })).toBeVisible();
        await expect(page.getByTestId('stats-card-engagement_rate').filter({ hasText: dashboardStats.engagement_rate.toString() })).toBeVisible();
        await expect(page.getByTestId('stats-card-avg_completion_time').filter({ hasText: dashboardStats.avg_completion_time.toString() })).toBeVisible();

    })

    test("should display fallback state on API error", {
        tag: "@PE-DA-ME-02"
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);
        
        await page.route("**/api/core/dashboard-stats", async (route) => {
            console.log("eroooooooor")
            await route.fulfill({
                status: 500,
                contentType: 'applicaiton/json',
            })
        })

        await dashboard.goto();

    })


})