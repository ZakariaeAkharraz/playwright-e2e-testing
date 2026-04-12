import { test, expect } from '@playwright/test';

test.describe("testing login feature with different inputs", () => {

    test('testing with correct credentials', async ({ page }) => {
        const correctCredentials = {
            email: "sotavew907@fanlvr.com",
            password: "Pass12345@"
        }

        await page.goto("/fr/sign-in");

        // email input
        await page.locator("input[type='email']").fill(correctCredentials.email);

        // password input
        await page.locator("input[type='password']").fill(correctCredentials.password);

        // submit button
        await page.locator('button[type="submit"]').click();

        await expect(page).toHaveURL(/.*\/dashboard/);
    })

    test("testing with wrong email", async ({ page }) => {
        const falseCredentials = {
            email: "false@email.com",
            password: "Pass12345@"
        }
        await page.goto("/fr/sign-in");

        // email input
        await page.locator("input[type='email']").fill(falseCredentials.email);

        // password input
        await page.locator("input[type='password']").fill(falseCredentials.password);

        // submit button
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('li[data-type="error"]')).toBeVisible();

        await expect(page).toHaveURL(/.*\/sign\-in/)

    })

    test("should block the submit button after 5 failed attempts", async ({ page }) => {
        const falseCredentials = {
            email: "false@email.com",
            password: "Pass12345@"
        }
        await page.goto("/fr/sign-in");

        for (let i = 1; i <= 5; i++) {

            // email input
            await page.locator("input[type='email']").fill(falseCredentials.email);

            // password input
            await page.locator("input[type='password']").fill(falseCredentials.password);

            // submit button
            await page.locator('button[type="submit"]').click();

            // await expect(page.locator('li[data-type="error"]')).toBeVisible();
            // await expect(page.locator('li[data-type="error"]')).toBeHidden();

            if (i >= 3 && i<5) {
                await expect(page.locator('li[data-type="warning"]')).toBeVisible();
                await expect(page.locator('li[data-type="warning"]')).toBeHidden();
            }

        }

        await expect(page.locator('button[type="submit"]')).toBeDisabled();
        


    })

})