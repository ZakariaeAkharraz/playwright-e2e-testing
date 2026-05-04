import test, { expect } from "@playwright/test";
import { resetWorkflow } from "../../../../helpers/workflow.helper";
import { QA_USER } from "../../../../helpers/test-users";


import { Program } from "../../../../pages/program.page";
import { Mission } from "../../../../pages/mission.page";
import { test as fileTest } from "../../../../fixtures/file-fixture"
import * as allure from "allure-js-commons";

test.describe("Mission workflow", {
    // tag: "@PE-MI"
}, () => {


    test.beforeEach(async ({ page }) => {
        await resetWorkflow(QA_USER.workflow.id, page.context());

        const program = new Program(page);
        await program.goto(QA_USER.workflow.path);
    })

    test("should go to the mission details page on click", async ({ page }) => {


        const mission_card = await page.locator("div[data-mission-id]").first();
        const mission_id = await mission_card.getAttribute("data-mission-id");
        await mission_card.click();

        await expect(page).toHaveURL(new RegExp(".*stepId=" + mission_id))

    })

    test("reset workfork API should reset the workflow progress", async () => {

    })

    test.describe("mission of type 'doc to read'", {
        tag:"@PE-MI-DR"
    }, () => {
        test.describe.configure({ mode: "serial" });

        test("should be able to download file after mission starts", {
            tag: "@PE-MI-DR-01",
        }, async ({ page }) => {

            const mission = new Mission(page);
            const missionId = await mission.goto("doc to read");
            await mission.startMission();

            const downloadPromise = page.waitForEvent("download");

            // trigger the download action
            // this selector is temporary
            await page.locator('.inline-flex.cursor-pointer.items-center.justify-center.border.gap-2.whitespace-nowrap.font-medium.transition-all.duration-300.focus-visible\\:outline-none.focus-visible\\:ring-3.focus-visible\\:ring-primary\\/50.disabled\\:pointer-events-none.disabled\\:opacity-40.hover\\:shadow-lg.border-primary.bg-white').click();

            const download = await downloadPromise;

            await mission.closeMission();

            await mission.assertMissionComplete(missionId!);

        })
        test("download should not be allowed before starting the mission", {
            tag: "@PE-MI-DR-02"
        }, async ({ page }) => {

            const mission = new Mission(page);
            await mission.goto(0);
            await page.waitForTimeout(1000);
            await expect(page.locator('.inline-flex.cursor-pointer.items-center.justify-center.border.gap-2.whitespace-nowrap.font-medium.transition-all.duration-300.focus-visible\\:outline-none.focus-visible\\:ring-3.focus-visible\\:ring-primary\\/50.disabled\\:pointer-events-none.disabled\\:opacity-40.hover\\:shadow-lg.border-primary.bg-white')).not.toBeVisible();


        })



    })

    test.describe("mission of type media", {
        tag:"@PE-MI-ME"
    }, () => {
        test("should be able to visualize media",{
            tag:"@PE-MI-ME-01"
        }, async ({ page }) => {
            const mission = new Mission(page)
            await mission.missionMediaVisualization();
        })
    })

    test.describe("mission of type game",{
        tag:"@PE-MI-GM"
    }, () => {

        test("should be able to start game step,play the game and complete the mission",{
            tag:"@PE-MI-GM-01"
        }, async ({ page }) => {
            const mission = new Mission(page);
            await mission.missionGame(QA_USER.workflow.id);
        })
    })

    test.describe("mission of type tasks",{
        tag:"@PE-MI-TA"
    }, () => {

        test("should be able to check tasks and complete mission",{
            tag:"@PE-MI-TA-01"
        }, async ({ page }) => {
            const mission = new Mission(page);
            await mission.missionTasks();

        })
    })

    // the upload limit is 50 MB, so we're testing with files based on that limit to make sure the validation works as expected

    test.describe("mission of type 'upload document'", {

        tag: "@PE-MI-UD"
    }, () => {
        test.describe.configure({ mode: "serial" });
        test.beforeEach(async ({ page }) => {

            const mission = new Mission(page);
            await mission.goto(1);
            await mission.startMission();
            await page.waitForTimeout(3000)
        })


        fileTest("should be able to upload file, add file description and complete the mission", {
            tag: "@PE-MI-UD-01"
        }, async ({ page, generateFile }) => {

            const mission = new Mission(page);

            // better to use mission category or something instead of nth mission

            // const missionId = await mission.goto(1);
            // await mission.startMission();
            const fileName = "test-file.docx";
            const filePath = generateFile(fileName, 3);

            // upload file

            await mission.uploadFile(filePath);

            await mission.fillDescription("file description", fileName);

            await mission.addFile();

            await expect(page.locator(".toast-success").first()).toBeVisible();

            await mission.closeMission();

            // await page.waitForTimeout(2000);

        })


        fileTest("should not to upload file larger than the file size limit", {
            tag: "@PE-MI-UD-02"
        }, async ({ page, generateFile }) => {


            const mission = new Mission(page);
            const filePath = generateFile("big-test-file.docx", 20);

            // upload file

            await mission.uploadFile(filePath);

            await expect(page.locator(".toast-error").first()).toBeVisible();
        })

        fileTest("should not allow to upload file without adding description", {
            tag: "@PE-MI-UD-03"
        }, async ({ page, generateFile }) => {

            const mission = new Mission(page);
            const filePath = generateFile("test-file.docx", 10);

            await mission.uploadFile(filePath);

            // await mission.page.
        })

        fileTest("should not allow to upload unsupported file type", {
            tag: "@PE-MI-UD-04"
        }, async ({ page, generateFile }) => {
            // supported file types are : .doc, .docx, .pdf

            const mission = new Mission(page);

            const filePath = generateFile("unsupported-type.txt", 10);

            // upload file

            await mission.uploadUnsupportedFile(filePath, page);

            await expect(page.locator(".toast-error")).toBeVisible();

        })



    })
})