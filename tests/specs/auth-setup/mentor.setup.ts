import { test as setup } from "@playwright/test"
import path from "path";

const mentorAuthFile = path.join("./playwright/.auth/mentor.json")


setup("mentor auth setup", async ({ page }) => {

    const mentorCredentials = {
        email: "mentor3@mentor.com",
        password: "Pass12345@"
    }

    await page.goto("/fr/sign-in");

    await page.locator("input[type='email']").fill(mentorCredentials.email);

    await page.locator("input[type='password']").fill(mentorCredentials.password);
    await page.locator('button[type="submit"]').click();

    await page.waitForURL(/.*\/dashboard$/);

    await page.context().storageState({ path: mentorAuthFile })
})