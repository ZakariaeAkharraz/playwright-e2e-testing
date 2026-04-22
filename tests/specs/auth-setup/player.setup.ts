import { expect, test as setup } from "@playwright/test"
import path from "path";

import { PROD_USER, QA_USER } from "../../helpers/test-users";

const playerAuthFile = path.join("./playwright/.auth/player.json")

setup("player auth setup", async ({ page, }) => {

    

    await page.addInitScript((userId)=>{
        // console.log("Setting guided tutorial local storage for user: ");
        // console.log("dashboard guided tutorial key: "+QA_USER.id);
        window.localStorage.setItem(`dashboardGuidedTutorial_${userId}` ,JSON.stringify({"currentStepIndex":1,"completed":true}));
        window.localStorage.setItem(`arenaGuidedTutorial_${userId}`,JSON.stringify({"currentStepIndex":1,"completed":true}));
        window.localStorage.setItem(`projectDetailGuidedTutorial_${userId}`,JSON.stringify({"currentStepIndex":1,"completed":true}));
    },QA_USER.id)

    await page.goto("/fr/sign-in");
    // await page.getByRole('textbox', { name: 'Votre e-mail' }).click();
    await page.locator("input[type='email']").fill(QA_USER.email);
    // await page.getByRole('textbox', { name: '••••••••' }).click();
    await page.locator("input[type='password']").fill(QA_USER.password);
    await page.locator('button[type="submit"]').click();


    

    await page.waitForURL(/.*\/dashboard$/);


    await page.context().storageState({ path: playerAuthFile });
});