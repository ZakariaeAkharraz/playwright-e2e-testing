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
        await this.page.getByTestId(/^sidebar-nav-arenas/).click();
        await this.page.waitForURL(/.*arenas.*/);

    }
    async gotoProd(){
        await this.page.locator("[data-tutorial='arena']").first().click();
        await this.page.waitForURL(/.*arenas.*/);
    }

    async openSpecificArena(ArenaName="Qa Arena") {
        // await this.page.waitForLoadState('load')
            if(this.page.getByRole('heading', { name: ArenaName })) return;
            const arenaLink = await this.page.getByTestId(/^sidebar-nav-child-arenas/).filter({
                hasText: ArenaName
            });
            const arenaTestId = await arenaLink.getAttribute("data-testid");
            const arenaId=arenaTestId?.match(/sidebar-nav-child-arenas-([^?]+)/)?.[1];

            const arenaResponsePromise= this.page.waitForResponse(res=>
                res.url().includes("my?arena_id="+arenaId!)
            )
            await expect(arenaLink).toBeVisible().then(async () => {
                await arenaLink.click();
            })

            await arenaResponsePromise;


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