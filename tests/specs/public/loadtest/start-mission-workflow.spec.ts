import test, { Page } from "@playwright/test";
import { generateTestUsers } from "../../player/fixtures/test-users";
import { Login } from "../../../pages/login.page";
import { Program } from "../../../pages/program.page";
import { Arena } from "../../../pages/arena.page";
import { Mission } from "../../../pages/mission.page";
import { resetWorkflowForUser, resetWorkflowForUserAPI } from "../../player/workflow/workflow.fixture";
import { Dashboard } from "../../../pages/dashboard.page";
import { metrics } from "../../../helpers/metrics";

const NBR_USERS = 10;
const index = 1;

const TEST_USERS = generateTestUsers(NBR_USERS,index)
test.describe("testing a user workflow from login to mission", () => {

    // const TEST_USERS = generateTestUsers(NBR_USERS)
    // for (let i = 0; i < TEST_USERS.length; i++) {
    //     const user = TEST_USERS[i];

    //     test(`user ${i + 1}`, async ({ browser }) => {
    //         const context = await browser.newContext();
    //         const page = await context.newPage();

    //         try {
    //             const login = new Login(page);
    //             const program = new Program(page);
    //             const arena = new Arena(page);
    //             const mission = new Mission(page);
    //             await login.goto();
    //             await login.signin(user.email, user.password);

    //             // now we're in the dashboard

    //             // close dashboard tutorial
    //             await page.getByRole('button', { name: 'Close tutorial' }).click();

    //             await arena.goto();

    //             // close Arena tutorial
    //             await page.getByRole('button', { name: 'Close tutorial' }).click();

    //             await program.gotoProgramThroughArena();

    //             // close Program tutorial
    //             await page.getByRole('button', { name: 'Close tutorial' }).click();

    //             // now we should be in the program page

    //             // accessing the first mission 'Doc to read'
    //             await mission.goto(0);


    //             await mission.startMission();

    //             await mission.closeMission();

    //             // await page.waitForTimeout(2000)
    //         } finally {



    //             // await page.close();
    //             // await context.close();

    //         }
    //     })
    // }

    test("multiple users inside one test", async ({ browser }) => {
        test.setTimeout(300_000)
        // test.slow();
        // test.skip();

        // Arrays to collect timestamps
        const startTimestamps: number[] = [];

        const endTimestamps: number[] = [];

        const runWorkflow = async (user: { email: string, password: string }) => {
            const context = await browser.newContext();
            const page = await context.newPage();

            startTimestamps.push(performance.now());
            try {
                const login = new Login(page);
                const dashboard = new Dashboard(page);
                const program = new Program(page);
                const arena = new Arena(page);
                const mission = new Mission(page);


                await metrics.measure(page,"login + load dashboard", async () => {
                    await login.goto();
                    await login.signin(user.email, user.password);
                    await page.getByRole('button', { name: 'Close tutorial' }).click();
                })

                await metrics.measure(page,"dashboard to arena", async () => {

                    // now we're in the dashboard
                    // close dashboard tutorial

                    await arena.goto();

                    // close Arena tutorial
                    await page.getByRole('button', { name: 'Close tutorial' }).click();

                    await arena.openSpecificArena();
                })



                // add a project to the favorite
                // await arena.addFirstProgramToFavorite();


                // await dashboard.gotoFavorite();

                // verify if the program was added to favorite
                // await program.assertProgramExist();

                await metrics.measure(page,"load a project", async () => {
                    await program.gotoProgram();

                    // close Program tutorial
                    await page.getByRole('button', { name: 'Close tutorial' }).click();

                    // now we should be in the program page
                })

                await metrics.measure(page,"goto mission page", async () => {

                    // accessing the first mission 'Doc to read'
                    await mission.goto(0);
                })



                await metrics.measure(page,"start a mission", async () => {
                    await mission.startMission();
                })

                await metrics.measure(page,"complete a mission", async () => {
                    await mission.closeMission();
                })

                // remove program from favorite
                // await arena.goto();
                // await arena.removeProgramFromFavorite();


                // await dashboard.openNotification();

                // await dashboard.assertNotificationExist();

                // await dashboard.closeNotification();

            } finally {

                // endTimestamps.push(performance.now());

                // await page.close();
                // await context.close();

            }
        };

        await Promise.all(TEST_USERS.map(user => runWorkflow(user)))
    })

    test.afterAll(() => {
        metrics.print();
    })

    // test("reset workflows with api", async () => { })

    test.beforeAll("reset workflow for multiple users", async ({ browser }) => {


        const runWorkflow = async (user: { email: string, password: string, workflowId: string }) => {

            try {

                await resetWorkflowForUserAPI(user.email, user.password, user.workflowId);

            } finally {
            }
        };

        await Promise.all(TEST_USERS.map(user => runWorkflow(user)))

    })

})
