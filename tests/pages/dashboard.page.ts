import { Page, Locator, expect } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  // readonly sidebar: Locator;

  constructor(page:Page) {
    this.page = page;
    // this.sidebar = page.getByRole('navigation');
  }

  async goto(locale?: 'fr' | 'en') {
    if (locale) {
      const link = "/" + locale + "/dashboard";
      await this.page.goto(link);
    }
    else {
      await this.page.goto('/fr/dashboard');
    }
    // await this.closeTutorialifVisible();
  }

  async closeTutorialifVisible() {
    const closeButton = this.page.getByRole('button', {
      name: 'Close tutorial',
    });


    await closeButton.click();

  }


  async switchRoleToMentor() {

    await this.goto();
    await this.page.locator('span[data-slot="avatar"]').click();
    await this.page.locator('button[role="combobox"]').click();

    const Menu = this.page.locator('div[role="presentation"]');


    const menuRoles = Menu.getByRole("option")

    await menuRoles.filter({ hasText: /Mentor/i }).click();

    await this.page.getByRole("button", { name: /^Oui,|^Yes,/ }).click();

    await this.page.getByRole("button", { name: /Déconnexion|Logout/i }).click();
  }

  async gotoFavorite(){
    await this.page.getByTestId("sidebar-nav-projects-favorite").click();
    await this.page.waitForURL(/.*favorite.*/);
  }

  async openNotification(){
    await this.page.locator("div[data-tutorial='notifications']").click();
  }
  
  async assertNotificationExist(){
     expect(await this.page.getByTestId("notification-item").count()).toBeGreaterThan(0);
  }
  async closeNotification(){
    await this.page.keyboard.press("Escape")
  }
}
