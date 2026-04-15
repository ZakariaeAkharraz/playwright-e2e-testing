import { expect, Locator, Page } from "@playwright/test";
import { Program } from "./program.page";
import path from "path";




export class Mission {
    readonly page: Page;
    // readonly sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        // this.sidebar = page.getByRole('navigation');
    }

    goto(nthMission: number): Promise<string>;
    goto(missionName: string): Promise<string>;

    async goto(filter: string | number) {

        let mission: Locator;

        if (typeof filter == "number") {
            mission = await this.page.locator("div[data-mission-id]").nth(filter);
        }
        else {
            mission = await this.page.locator("div[data-mission-id]", { hasText: filter });
        }

        const mission_id = await mission.getAttribute("data-mission-id");
        await mission.click();
        await this.page.waitForURL(/stepId/)

        return mission_id;
    }
    async startMission() {
        const startMissionPromise = this.page.waitForResponse(response =>
            response.url().includes("/start/")
        )
        await this.page.getByRole('button', { name: 'Démarrer la mission' }).click();
        await this.page.getByRole('button', { name: 'Confirmer' }).click();
        // console.log("waiting for state to be hidden")
        // await expect (this.page.getByRole('dialog').first()).not.toBeVisible();
        // console.log("HIDDEN")
        await startMissionPromise;

    }

    async closeMission() {
        const completeMissionPromise = this.page.waitForResponse(response =>
            response.url().includes("complete")
        )

        await this.page.getByRole('button', { name: 'Terminer la mission' }).click();
        await this.page.getByRole('button', { name: 'Confirmer' }).click();

        await completeMissionPromise;
        // await this.page.waitForTimeout(3000)
        // await this.page.waitForURL(/.*projects/)

    }

    async assertMissionComplete(missionId: string) {
        const missionCompleted = await this.page.locator(`[data-mission-id="${missionId}"]`);
        // await expect(missionCompleted).toHaveAttribute("data-status","completed");

        await expect(missionCompleted).toHaveText(/[1-9]* coins/i);

    }
    async missionDownloadFile(missionName = "Doc to read"){
        
            const missionId = await this.goto(missionName);
            await this.startMission();

            const downloadPromise = this.page.waitForEvent("download");

            // trigger the download action
            // this selector is temporary
            await this.page.locator('.inline-flex.cursor-pointer.items-center.justify-center.border.gap-2.whitespace-nowrap.font-medium.transition-all.duration-300.focus-visible\\:outline-none.focus-visible\\:ring-3.focus-visible\\:ring-primary\\/50.disabled\\:pointer-events-none.disabled\\:opacity-40.hover\\:shadow-lg.border-primary.bg-white').click();

            const download = await downloadPromise;

            await this.closeMission();
    }
    async missionUploadFile(missionName = "Upload doc") {
        const missionId = await this.goto(missionName);
        await this.startMission();
        // await generateFile();
        const fileName = "test-file.doc"
        const filepath = path.join("playwright/temp", fileName);

        await this.uploadFile(filepath);
        await this.fillDescription("test descriptiontest descriptiontest description", fileName);
        await this.addFile();
        await this.closeMission();
        // await this.assertMissionComplete(missionId!);
    }

    async missionMediaVisualization(missionName = "media welcome") {
        const missionId = await this.goto(missionName);
        
        await this.startMission();
        const imageResponsePromise = this.page.waitForResponse(response =>
            response.url().includes(missionId) && response.status() === 200 && response.request().method()=="GET"
        );

        await imageResponsePromise;

        await expect(this.page.locator("[data-slot='carousel']").getByRole("img").first()).toBeVisible({timeout:10000});

        await this.closeMission();
    }

    async uploadFile(filePath: string) {

        const fileChooserPromise = this.page.waitForEvent("filechooser");

        await this.page.locator("[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }

    async fillDescription(description: string, fileName: string) {
        await this.page.getByRole('textbox', { name: fileName }).fill(description);
    }

    async addFile() {
        const submitButton = await this.page.getByRole('button', { name: 'Télécharger le document' });
        await submitButton.click();
        await submitButton.waitFor({ state: "hidden" })
    }

    async uploadUnsupportedFile(filePath: string, page: Page) {

        const fileChooserPromise = page.waitForEvent("filechooser");
        await page.locator("[data-slot='file-upload-dropzone']").click();
        await fileChooserPromise.then(fileChooser => fileChooser.setFiles(filePath));

    }
}