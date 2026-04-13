import { expect, Page } from "@playwright/test";
import { Program } from "./program.page";




export class Mission {
    readonly page: Page;
    // readonly sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.sidebar = page.getByRole('navigation');
    }

    async goto(nthMission = 0) {

        const mission = await this.page.locator("div[data-mission-id]").nth(nthMission);
        const mission_id = await mission.getAttribute("data-mission-id");
        await mission.click();
        return mission_id;
    }
    async startMission() {
        await this.page.getByRole('button', { name: 'Démarrer la mission' }).click();
        await this.page.getByRole('button', { name: 'Confirmer' }).click();
        // console.log("waiting for state to be hidden")
        // await expect (this.page.getByRole('dialog').first()).not.toBeVisible();
        // console.log("HIDDEN")

    }

    async closeMission() {
        await this.page.getByRole('button', { name: 'Terminer la mission' }).click();
        await this.page.getByRole('button', { name: 'Confirmer' }).click();
        await this.page.waitForTimeout(3000)
        // await this.page.waitForURL(/.*projects/)

    }

    async assertMissionComplete(missionId: string) {
        const missionCompleted = await this.page.locator(`[data-mission-id="${missionId}"]`);
        // await expect(missionCompleted).toHaveAttribute("data-status","completed");

        await expect(missionCompleted).toHaveText(/[1-9]* coins/i);

    }

    async uploadFile(filePath: string) {

        const fileChooserPromise = this.page.waitForEvent("filechooser");

        await this.page.locator("[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }

    async fillDescription(description: string) {
        await this.page.getByRole('textbox', { name: 'test-file.docx' }).fill(description);
    }

    async addFile(){
        await this.page.getByRole('button', { name: 'Télécharger le document' }).click();
    }

    async uploadUnsupportedFile(filePath: string, page: Page) {

        const fileChooserPromise = page.waitForEvent("filechooser");
        await page.locator("[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }
}