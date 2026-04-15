import test, { expect } from "@playwright/test";
import { Login } from "../../pages/login.page";
import { getTestUsers } from "../player/fixtures/test-users";





test("multi-user test", async ({ browser }) => {
    test.slow();
    const newUsers = [...getTestUsers().slice(0, 20)];

    await Promise.allSettled(
        newUsers.map(async (user, i) => {
            const userIndex = i + 2;

            const context = await browser.newContext();
            const page = await context.newPage();

            try {
                const login = new Login(page);

                page.on('requestfailed', request => {
                        console.log({
                            url: request.url(),
                            method: request.method(),
                            failure: request.failure()?.errorText,  // ← this is the key field
                            timing: request.timing(),
                        });
                    });
                await login.goto();
                await page.locator("input[type='email']").fill(user.email);

                // // password input
                await page.locator("input[type='password']").fill(user.password);

                await page.locator('button[type="submit"]').click();


                await expect(page.getByRole('dialog', { name: 'Complétez la configuration de' })).toBeVisible({ timeout: 2000 }).then(async () => {
                    await page.getByPlaceholder("Entrez votre pseudonyme")
                        .fill(user.email.split('@')[0]);

                    await page.getByPlaceholder("Entrez votre nouveau mot de passe")
                        .fill("Pass12345@");

                    await page.getByPlaceholder("Confirmez votre mot de passe")
                        .fill("Pass12345@");
                    await page.waitForTimeout(3000)
                    
                    page.on('requestfailed', request => {
                        console.log({
                            url: request.url(),
                            method: request.method(),
                            failure: request.failure()?.errorText,  // ← this is the key field
                            timing: request.timing(),
                        });
                    });
                    await page.getByRole('button', { name: 'Enregistrer et se reconnecter' }).click();


                }).catch(
                    (error) => {
                        // console.log(error)
                    }
                )


            } finally {
                // await context.close();
            }
        })
    );
});
