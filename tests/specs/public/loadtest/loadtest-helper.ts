// import { Page } from "@playwright/test";
// import { Arena } from "../../../pages/arena.page";
// import { Login } from "../../../pages/login.page";
// import { Program } from "../../../pages/program.page";

import { Browser, expect } from "@playwright/test";
import { User } from "../../player/fixtures/test-users";
import { Login } from "../../../pages/login.page";
import { Dashboard } from "../../../pages/dashboard.page";
import { Program } from "../../../pages/program.page";
import { Arena } from "../../../pages/arena.page";
import { Mission } from "../../../pages/mission.page";
import { metrics } from "../../../helpers/metrics";


// export async function navigateToMission(page: Page,metrics: any) {
//     const login = new Login(page);

//     const program = new Program(page);
//     const arena = new Arena(page);

//     await metrics.measure(page, "user login to dashboard", async () => {
//         await login.goto();
//         await login.signin(user.email, user.password);
//         // close dashboard tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
//     // now we're in the dashboard


//     await metrics.measure(page, "user navigate to arena", async () => {

//         await arena.goto();
//         // close Arena tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
//     // now we should be in the program page

//     await metrics.measure(page, "user navigate to program", async () => {
//         await program.gotoProgram();
//         // close Program tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
// }

export async function missionWorkflow(missionInstance: (mission: Mission) => Promise<void>,
    TEST_USERS: User[],
    browser: Browser) {
    const runWorkflow = async (user: { email: string, password: string }) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            const login = new Login(page);
            const dashboard = new Dashboard(page);
            const program = new Program(page);
            const arena = new Arena(page);
            const mission = new Mission(page);

            await metrics.measure(page, "user login to dashboard", async () => {
                await login.goto();
                await login.signin(user.email, user.password);
                // close dashboard tutorial
                await page.getByRole('button', { name: 'Close tutorial' }).click();
            });
            console.log(`${user.email} in the dashboard`)
            // now we're in the dashboard


            await metrics.measure(page, "dashboard to arena", async () => {

                // now we're in the dashboard
                // close dashboard tutorial
                await arena.goto();

                // close Arena tutorial

                await page.getByRole('button', { name: 'Close tutorial' }).click();
                await expect(page.getByRole('button', { name: 'Close tutorial' })).not.toBeVisible();

                await arena.openSpecificArena();

            })
            console.log(`${user.email} in the arena page`)



            await metrics.measure(page, "user navigate to program", async () => {
                await program.gotoProgram();
                // close Program tutorial
                await page.getByRole('button', { name: 'Close tutorial' }).click();
            });
            // now we should be in the program page

            console.log(`${user.email} in the program page`)
            await metrics.measure(page, "start and copmlete mission", async () => {
                await missionInstance(mission);

            })


        } finally {
            // await page.close()
            // await context.close();
        }
    };

    const results = await Promise.allSettled(TEST_USERS.map(user => runWorkflow(user)))

    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.log(`User ${index + 1} failed with error: ${result.reason}`);
        }
    });
}