import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { resetWorkflow, startAndCompleteStepApi } from "../../../helpers/workflow.helper";
import { QA_USER } from "../../../helpers/test-users";
import { Arena } from "../../../helpers/test-project";




test.describe("notification functionality", () => {


    test.beforeEach(async ({ context }) => {
        await resetWorkflow(Arena.project.workflowId, context);
    })
    test("notification workflow", {
        tag: "@AU-NO-01"
    }, async ({ page }) => {

        // reset workflow
        // await resetWorkflow(Arena.project.workflowId, page.context());

        const dashboard = new Dashboard(page);
        const notificationResponse = page.waitForResponse(/unread-count/)
        await dashboard.goto();

        await notificationResponse;
        await page.waitForLoadState("networkidle")

        const notificationButton = await page.getByRole("button", { name: "notification" })
        await expect(notificationButton).not.toHaveText(/^0$/, { timeout: 5000 }).catch(() => {
            // If it stays 0, that's a valid starting state — continue
        });

        const currentNotificationNbr = parseInt(
            (await notificationButton.textContent())!.match(/\d+/)?.[0] ?? "0"
        );

        await startAndCompleteStepApi(page.context(), Arena.project.workflowId, Arena.project.phase[0].steps.GAME.id);
        
        
        

        const newNotificationResponse = page.waitForResponse(/unread-count/)
        await page.reload()
        await newNotificationResponse;

        const newNotificationNbr = parseInt(
            (await notificationButton.textContent())!.match(/\d+/)?.[0] ?? "0"
        );
        console.log("New notification:", newNotificationNbr);
        expect(newNotificationNbr).toBeGreaterThan(currentNotificationNbr)

        // open the notification panel
        await dashboard.openNotification();

        // click on the first notification to mark it as unread
        const notificationItem = await page.getByTestId("notification-item").first();
        await expect(notificationItem).toBeVisible()
        await notificationItem.click();
        await dashboard.closeNotification();

        // assert the notification number to be less
        const readNotificationNbr = parseInt(
            (await notificationButton.textContent())!.match(/\d+/)?.[0] ?? "0"
        );
        expect(readNotificationNbr).toBeLessThan(newNotificationNbr)
    })
})