import { Page } from "@playwright/test";







export class Login {

    readonly page: Page;
    // readonly sidebar: Locator;

    constructor(page:Page) {
        this.page = page;
        // this.sidebar = page.getByRole('navigation');
    }

    async goto() {
        await this.page.goto("/fr/sign-in");
    }

    async signin(email:string , password: string ) {
        
        await this.page.locator("input[type='email']").fill(email);
        // // password input
        await this.page.locator("input[type='password']").fill(password);

        await this.page.locator('button[type="submit"]').click();

        await this.page.waitForURL(/.*\/dashboard/);
    }

}






