import { expect, Page } from "@playwright/test";
import { arena } from "../helpers/test-project";


export class Project {
  readonly page: Page;
  // readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.sidebar = page.getByRole('navigation');
  }

  async goto(path?: string) {
    // const arena = new Arena(this.page);
    // await arena.goto();

    // await this.page.locator("div[data-tutorial='project-cards']").nth(nthProject).click();
    await this.page.goto(arena.project.path);


  }

  async gotoProject() {
    await this.page.locator("div[data-tutorial='project-cards']").first().click();
  }

  async assertProjectExist(){
    await expect(this.page.locator("div[data-tutorial='project-cards']").first()).toBeVisible();
  }
}