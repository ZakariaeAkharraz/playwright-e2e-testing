import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { completeStepApi, resetWorkflow, startAndCompleteStepApi } from "../../../helpers/workflow.helper";
import { QA_USER } from "../../../helpers/test-users";
import { Arena } from "../../../helpers/test-project";




test.describe("dashboard metrics", {

}, () => {

    
    // const dashboardStats = {
    //     "xp": 24,
    //     "missions": 4,
    //     "quests": -4,
    //     "badges": -7,
    //     "avg_completion_time": -12,
    //     "engagement_rate": -94,
    //     "completion_rate": -4,
    //     "performance_score": -21,
    //     "steps_completion_rate": -0.10344827586206896

    // }


    test("should display correct metrics values ", {
        tag: "@PE-DA-ME-01"
    }, async ({ page }) => {

        const dashboard = new Dashboard(page);

        // await page.route("**/api/core/dashboard-stats", async (route) => {
        //     await route.fulfill({
        //         status: 200,
        //         contentType: 'applicaiton/json',
        //         body: JSON.stringify({
        //             data: dashboardStats,
        //         })
        //     })
        // })
        await dashboard.goto();
        // await expect(page.locator('div[data-tutorial="stats-xp"]').filter({ hasText: dashboardStats.xp+" Coins" })).toBeVisible();
        await expect(page.getByTestId('stats-card-xp').filter({ hasText: /[0-9]+/ })).toBeVisible();
        await expect(page.getByTestId('stats-card-missions').filter({ hasText: /[0-9]+/ })).toBeVisible();
        await expect(page.getByTestId('stats-card-quests').filter({ hasText: /[0-9]+/ })).toBeVisible();
        await expect(page.getByTestId('stats-card-badges').filter({ hasText: /[0-9]+/ })).toBeVisible();
        await expect(page.getByTestId('stats-card-engagement_rate').filter({ hasText: /[0-9]+/ })).toBeVisible();
        await expect(page.getByTestId('stats-card-avg_completion_time').filter({ hasText: /[0-9]+/ })).toBeVisible();

        console.log((await page.getByTestId('stats-card-missions').innerText()).match(/\d/)?.[0])
    })

    test("metrics values should be updated after a mission is completed",{
        tag:"@PE-DA-ME-02"
    }, async ({ page }) => {
        // 0 reset workflow

        await resetWorkflow(Arena.project.workflowId,page.context())
        
        // 1 get the current value of the xp

        const dashboard = new Dashboard(page);
        await dashboard.goto();
        const currentXP = (await page.getByTestId('stats-card-xp').textContent())!.match(/\d+/)?.[0];
        const currentMissionNbr = (await page.getByTestId('stats-card-missions').textContent())!.match(/\d+/)?.[0];
        console.log("current Xp: ",currentXP);

        // 2 complete a mission
        await startAndCompleteStepApi(page.context(), Arena.project.workflowId, Arena.project.phase[0].steps.GAME.id);

        await page.reload()
        await page.waitForLoadState()
        // 3 get the new value of the xp 
        const newXP = (await page.getByTestId('stats-card-xp').textContent())!.match(/\d+/)?.[0];
        const newMissionNbr = (await page.getByTestId('stats-card-missions').textContent())!.match(/\d+/)?.[0];
        // 4 assert the value difference
        expect(parseInt(newXP!)).toBeGreaterThan(parseInt(currentXP!))
    })

    test("should display fallback state on API error", {
        tag: "@PE-DA-ME-03"
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