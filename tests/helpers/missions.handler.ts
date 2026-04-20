import { Page } from "@playwright/test"
import { mockMission } from "./missions.mock"

export async function quickMissionsApi(page: Page, missions: Partial<typeof mockMission>[] = []) {
    await page.route("**/api/core/events/timeline?page=1&limit=10*", async (route) => {
        await route.fulfill({
            
            body: JSON.stringify({ data: missions.map(m => ({ ...mockMission, ...m })) })
        })

    })
}

export async function quickAccessMissionsApi(page: Page, missions: Partial<typeof mockMission>[] = []) {
    await page.route("**/api/core/events/timeline?page=1&limit=4*", async (route) => {
        await route.fulfill({

            body: JSON.stringify({ data: missions.map(m => ({ ...mockMission, ...m })) })
        })

    })
}