
import { Program } from "./program.page.js";




export class Mission {
    // readonly page: Page;
    // readonly sidebar: Locator;

    constructor(page) {
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

    }

    async closeMission() {
        await this.page.getByRole('button', { name: 'Terminer la mission' }).click();
        await this.page.getByRole('button', { name: 'Confirmer' }).click();

    }


    async uploadFile(filePath) {

        const fileChooserPromise = this.page.waitForEvent("filechooser");

        await this.page.locator("div[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }

    async fillDescription(description) {
        await this.page.getByRole('textbox', { name: 'test-file.docx' }).fill(description);
    }

    async addFile(){
        await this.page.getByRole('button', { name: 'Télécharger le document' }).click();
    }

    async uploadUnsupportedFile(filePath, page) {

        const fileChooserPromise = page.waitForEvent("filechooser");
        await page.locator("div[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }
}