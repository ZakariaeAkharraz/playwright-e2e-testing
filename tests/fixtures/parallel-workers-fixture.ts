import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { accounts, User } from '../helpers/test-users';
import { worker } from 'cluster';

export * from '@playwright/test';
type ParallelWorkersFixture = {
    workerStorageState: string,
    account: User
}
export const test = baseTest.extend<{}, ParallelWorkersFixture>({
    // Use the same storage state for all tests in this worker.
    storageState: ({ workerStorageState }, use) => use(workerStorageState),

    account: [async ({ }, use) => {
        const id = test.info().parallelIndex;
        if (id >= accounts.length) {
            throw new Error(`Worker ${id} exceeds worker account pool size (${accounts.length})`);
        }
        const user = accounts[id];

        await use(user);
    }, { scope: "worker" }],
    // Authenticate once per worker with a worker-scoped fixture.
    workerStorageState: [async ({ browser, account }, use) => {
        // Use parallelIndex as a unique identifier for each worker.
        const id = test.info().parallelIndex;
        const fileName = path.join(`./playwright/.auth/${account.username}.json`);

        console.log("index id: ", id);
        // if (fs.existsSync(fileName)) {
        //     // Reuse existing authentication state if any.
        //     await use(fileName);
        //     return;
        // }

        // Important: make sure we authenticate in a clean environment by unsetting storage state.
        const page = await browser.newPage({ storageState: undefined });

        // Acquire a unique account, for example create a new one.
        // Alternatively, you can have a list of precreated accounts for testing.
        // Make sure that accounts are unique, so that multiple team members
        // can run tests at the same time without interference.
        // const account = accounts[id];

        // Perform authentication steps. Replace these actions with your own.
        await page.addInitScript((userId) => {
            // console.log("Setting guided tutorial local storage for user: ");
            // console.log("dashboard guided tutorial key: "+account.id);
            window.localStorage.setItem(`dashboardGuidedTutorial_${userId}`, JSON.stringify({ "currentStepIndex": 1, "completed": true }));
            window.localStorage.setItem(`arenaGuidedTutorial_${userId}`, JSON.stringify({ "currentStepIndex": 1, "completed": true }));
            window.localStorage.setItem(`projectDetailGuidedTutorial_${userId}`, JSON.stringify({ "currentStepIndex": 1, "completed": true }));
        }, account.id)

        await page.goto(process.env.FRONTEND_GAMITOOL + "/fr/sign-in");
        // await page.getByRole('textbox', { name: 'Votre e-mail' }).click();
        await page.locator("input[type='email']").fill(account.email);
        // await page.getByRole('textbox', { name: '••••••••' }).click();
        await page.locator("input[type='password']").fill(account.password);
        await page.locator('button[type="submit"]').click();
        // Wait until the page receives the cookies.
        //
        // Sometimes login flow sets cookies in the process of several redirects.
        // Wait for the final URL to ensure that the cookies are actually set.
        await page.waitForURL(/.*\/dashboard$/);
        // Alternatively, you can wait until the page reaches a state where all cookies are set.
        // End of authentication steps.

        await page.context().storageState({ path: fileName });
        await page.close();
        await use(fileName);
    }, { scope: 'worker' }],
});