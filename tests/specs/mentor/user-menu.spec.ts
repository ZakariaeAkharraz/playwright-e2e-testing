import test, { expect } from "@playwright/test";
import { describe } from "node:test";
import { Dashboard } from "../../pages/dashboard.page";

describe("verifying how should user menu work for the mentor", () => {
    const mentorRoles = ["Player", "Mentor"];
    test("mentor should have a dropdown menu with roles player and mentor", async ({ page }) => {

        await page.goto("fr/dashboard");
        await page.locator('span[data-slot="avatar"]').click();
        await page.locator('button[role="combobox"]').click();

        const Menu = page.locator('div[role="presentation"]');
        await expect(Menu).toBeVisible();

        const menuRoles = Menu.getByRole("option")
        /*
        I need to know why if used Menu instead of menuRoles to check the user roles 
        it returns a non existing role of "PlayerMentor"
        */
        await expect(menuRoles).toHaveText(mentorRoles);
        await page.pause();
    })

    test("user should always signin as mentor even if he logged out as a player", async ({ page }) => {
        const dashboard = new Dashboard(page);
        const mentorCredentials = {
            email: "mentor3@mentor.com",
            password: "Pass12345@"
        }

        await dashboard.goto();
        await page.locator('span[data-slot="avatar"]').click();
        await page.locator('button[role="combobox"]').click();

        const Menu = page.locator('div[role="presentation"]');
        await expect(Menu).toBeVisible();

        const menuRoles = Menu.getByRole("option")

        await menuRoles.filter({ hasText: /Player/i }).click();

        await page.getByRole("button", { name: /^Oui,|^Yes,/ }).click();

        await expect(Menu).toBeHidden();

        await page.getByRole("button", { name: /Déconnexion|Logout/i }).click();

        await expect(page).toHaveURL(/sign-in$/);


        //login in again---------- 
        await page.locator("input[type='email']").fill(mentorCredentials.email);

        await page.locator("input[type='password']").fill(mentorCredentials.password);
        await page.locator('button[type="submit"]').click();


        // I still need to verify the role after login in--------


    })


})
