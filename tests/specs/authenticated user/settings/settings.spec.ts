import { expect } from "@playwright/test";
import { Dashboard } from "../../../pages/dashboard.page";
import { QA_USER1 } from "../../../helpers/test-users";
import { updatePassword, updateUsername } from "../../../helpers/workflow.helper";
import { Login } from "../../../pages/login.page";
import { test } from "../../../fixtures/parallel-workers-fixture";



test.describe("", () => {

    test.afterEach(async ({ page, account }) => {

        await updateUsername(account.profileId, account.username, page.context());
        console.log("username: ",account.username)
    })

    test("user should be able to update username", {
        tag: "@AU-SE-01"
    }, async ({ page, account }) => {
        console.log("username1: ",account.username)
        const dashboard = new Dashboard(page);

        await dashboard.goto();
        await page.getByTestId("sidebar-nav-settings").click();
        await page.waitForURL(/settings/)

        await page.waitForTimeout(5000)

        const updated_username = account.username + '_updated'
        await page.locator("input[name='username']").fill(updated_username);
        await page.locator("button[type='submit']").click();
        await expect(page.locator(".toast-success")).toBeVisible();
        await page.locator("[data-tutorial='profile-avatar']").click();

        await expect(await page.getByRole("heading", { name: updated_username })).toBeVisible();

    })
})

test.describe(() => {

    test.afterEach(async ({ page, account }) => {
        await updatePassword(account.email, account.password, account.password + "_updated", page.context());

    })

    test("user should be able to update password", {
        tag: "@AU-SE-02"
    }, async ({ page, account }) => {
        const dashboard = new Dashboard(page);

        await dashboard.goto();
        await page.getByTestId("sidebar-nav-settings").click();
        await page.waitForURL(/settings/)

        await page.waitForTimeout(5000)

        await page.getByRole('button', { name: 'Mot de passe' }).click();

        const updated_password = account.password + "_updated";

        await page.locator("input[name='currentPassword']").fill(account.password);
        await page.locator("input[name='newPassword']").fill(updated_password);
        await page.locator("input[name='confirmPassword']").fill(updated_password);


        await page.locator("button[type='submit']").click();
        await expect(page.locator(".toast-success")).toBeVisible();

        // await expect(await page.getByRole("heading", { name: updated_username })).toBeVisible();
        const login = new Login(page);
        await login.goto()
        await login.signin(account.email, updated_password);
        // expect(page.url()).toContain(/dashboard/)

    })

})


