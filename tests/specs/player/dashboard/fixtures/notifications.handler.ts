import { Page } from "@playwright/test";

export async function notificationCountApi(page: Page, count: number) {
    await page.route("**/api/core/user-notifications/unread-count", async (route) => {
        await route.fulfill({
            body: JSON.stringify({
                data: {
                    count,
                }
            })
        })
    })
}