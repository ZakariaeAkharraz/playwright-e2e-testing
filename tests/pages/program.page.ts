import { expect, Page } from "@playwright/test";
import { Arena } from "./arena.page";
import { QA_USER } from "../specs/player/fixtures/test-users";


export class Program {
  readonly page: Page;
  // readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.sidebar = page.getByRole('navigation');
  }

  async goto(path: string) {
    // const arena = new Arena(this.page);
    // await arena.goto();

    // await this.page.locator("div[data-tutorial='project-cards']").nth(nthProgram).click();
    await this.page.goto(QA_USER.workflow.path);


  }

  async gotoProgram() {
    await this.page.locator("div[data-tutorial='project-cards']").first().click();
  }

  async assertProgramExist(){
    await expect(this.page.locator("div[data-tutorial='project-cards']").first()).toBeVisible();
  }
}