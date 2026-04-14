import { expect, Page } from "@playwright/test";
import { Dashboard } from "./dashboard.page";


export class Arena {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async goto() {
        // const dashboard= new Dashboard(this.page);
        // dashboard.goto();
        // getByTestId('sidebar-nav-child-arenas-19cb7e11-45a1-4a22-ad1e-ed46bc4453a7?arenaName=Demo Arena')
        await this.page.getByTestId(/^sidebar-nav-arenas/).click();
        await this.page.waitForURL(/.*arenas.*/);

    }
    async openSpecificArena() {
        await expect(async () => {
            await this.page.waitForLoadState('networkidle')
            const arenaLink = await this.page.getByTestId(/^sidebar-nav-child-arenas.*Demo Arena/);
            await expect(arenaLink).toBeEnabled();
            await arenaLink.click();
            // We check if the URL changed to know if the click "took"
            await expect(this.page).toHaveURL(/Demo.+Arena/, { timeout: 500 });
        }).toPass({
            intervals: [500, 1000], // Wait a bit between retries
            timeout: 10000          // Try for up to 10 seconds total
        });

        // await this.page.waitForURL(/Demo.Arena/);

    }

    async addFirstProgramToFavorite() {

        const favoriteButton = await this.page.locator("button[data-tutorial='favorite-button']").first();
        if (await favoriteButton.locator("img[src*='heart-favorite-fill']").count() == 0)
            await favoriteButton.click();

    }

    async removeProgramFromFavorite() {
        const favoriteButton = await this.page.locator("button[data-tutorial='favorite-button']").first();
        if (await favoriteButton.locator("img[src*='heart-favorite-fill']").count() > 0) {
            console.log("favorite")
            await favoriteButton.click();
        }

    }
    // async expectProgramTitle(){

    // }
}