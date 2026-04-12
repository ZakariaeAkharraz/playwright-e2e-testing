import { Page } from "@playwright/test";
import { Dashboard } from "./dashboard.page";


export class Arena {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async goto() {
        // const dashboard= new Dashboard(this.page);
        // dashboard.goto();
        await this.page.getByTestId(/^sidebar-nav-arenas/).click();

        // await this.page.waitForURL(/.*arenas.*/);

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