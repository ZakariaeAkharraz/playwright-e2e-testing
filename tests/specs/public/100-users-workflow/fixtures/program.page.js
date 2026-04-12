import { Arena } from "./arena.page.js";
// import { QA_USER } from "../specs/player/fixtures/test-users";


export class Program {
  // readonly page: Page;
  // readonly sidebar: Locator;

  constructor(page) {
    this.page = page;
    // this.sidebar = page.getByRole('navigation');
  }

  async goto(path) {
    // const arena = new Arena(this.page);
    // await arena.goto();

    // await this.page.locator("div[data-tutorial='project-cards']").nth(nthProgram).click();
    await this.page.goto(QA_USER.workflow.path);


  }

  async gotoProgramThroughArena() {
    await this.page.locator("div[data-tutorial='project-cards']").first().click();
  }
}