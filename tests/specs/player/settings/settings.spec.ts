import test, { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { QA_USER } from "../../../helpers/test-users";
import { updatePassword, updateUsername } from "../../../helpers/workflow.helper";
import { Login } from "../../../pages/login.page";



test.describe("", () => {

    test.afterEach(async ({ page }) => {
    await updateUsername(QA_USER.username, page.context());

})

    test("user should be able to update username", {
        tag: "@AU-SE-01"
    }, async ({ page }) => {

        const dashboard = new Dashboard(page);

        dashboard.goto();
        await page.getByTestId("sidebar-nav-settings").click();
        await page.waitForURL(/settings/)

        await page.waitForTimeout(5000)

        const updated_username = QA_USER.username + '_updated'
        await page.locator("input[name='username']").fill(updated_username);
        await page.locator("button[type='submit']").click();
        await expect(page.locator(".toast-success")).toBeVisible();
        await page.locator("[data-tutorial='profile-avatar']").click();

        await expect(await page.getByRole("heading", { name: updated_username })).toBeVisible();

    })
})

test.describe(() => {

    test.afterEach(async ({ page }) => {
    await updatePassword(QA_USER.password, QA_USER.password + "_updated", page.context());

})

    test("user should be able to update password", {
        tag: "@AU-SE-02"
    }, async ({ page }) => {
        const dashboard = new Dashboard(page);

        dashboard.goto();
        await page.getByTestId("sidebar-nav-settings").click();
        await page.waitForURL(/settings/)

        await page.waitForTimeout(5000)

        await page.getByRole('button', { name: 'Mot de passe' }).click();

        const updated_password = QA_USER.password + "_updated";

        await page.locator("input[name='currentPassword']").fill(QA_USER.password);
        await page.locator("input[name='newPassword']").fill(updated_password);
        await page.locator("input[name='confirmPassword']").fill(updated_password);


        await page.locator("button[type='submit']").click();
        await expect(page.locator(".toast-success")).toBeVisible();

        // await expect(await page.getByRole("heading", { name: updated_username })).toBeVisible();
        const login = new Login(page);
        await login.goto()
        await login.signin(QA_USER.email, updated_password);
        // expect(page.url()).toContain(/dashboard/)

    })

})


