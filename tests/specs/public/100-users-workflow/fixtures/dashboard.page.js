

export class Dashboard {
  // readonly page: Page;
  // readonly sidebar: Locator;

  constructor(page) {
    this.page = page;
    // this.sidebar = page.getByRole('navigation');
  }

  async goto(locale) {
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
}
