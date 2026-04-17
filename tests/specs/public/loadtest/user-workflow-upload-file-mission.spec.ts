import test from "@playwright/test";
import { generateTestUsers } from "../../player/fixtures/test-users";
import { resetWorkflowForUserAPI } from "../../player/workflow/workflow.fixture";
import { metrics } from "../../../helpers/metrics";
import { missionWorkflow } from "./loadtest-helper";

const NBR_USERS = 1;
const index = 1;

const TEST_USERS = generateTestUsers(NBR_USERS, index)

test("upload doc workflow", async ({ browser }) => {
    test.setTimeout(300_000)
    test.slow();
    // test.skip();
    await missionWorkflow(
        (mission) => mission.missionUploadFile(),
        TEST_USERS,
        browser
    )

    // const runWorkflow = async (user: { email: string, password: string }) => {
    //     const context = await browser.newContext();
    //     const page = await context.newPage();

    //     try {
    //         const login = new Login(page);
    //         const dashboard = new Dashboard(page);
    //         const program = new Program(page);
    //         const arena = new Arena(page);
    //         const mission = new Mission(page);

    //         await metrics.measure(page, "user login to dashboard", async () => {
    //             await login.goto();
    //             await login.signin(user.email, user.password);
    //             // close dashboard tutorial
    //             await page.getByRole('button', { name: 'Close tutorial' }).click();
    //         });
    //         console.log(`${user.email} in the dashboard`)
    //         // now we're in the dashboard


    //         await metrics.measure(page, "dashboard to arena", async () => {

    //             // now we're in the dashboard
    //             // close dashboard tutorial
    //             await arena.gotoProd();

    //             // close Arena tutorial

    //             await page.getByRole('button', { name: 'Close tutorial' }).click();
    //             await expect(page.getByRole('button', { name: 'Close tutorial' })).not.toBeVisible();

    //             await arena.openSpecificArena();

    //         })
    //         console.log(`${user.email} in the arena page`)



    //         await metrics.measure(page, "user navigate to program", async () => {
    //             await program.gotoProgram();
    //             // close Program tutorial
    //             await page.getByRole('button', { name: 'Close tutorial' }).click();
    //         });
    //         // now we should be in the program page

    //         console.log(`${user.email} in the program page`)

    //         await metrics.measure(page, "mission upload doc", async () => {
    //             await mission.missionUploadFile();
    //         })
    //         console.log(`${user.email} finished mission`)




    //     } finally {
    //         // await page.close()
    //         // await context.close();

    //     }
    // };
    // const results = await Promise.allSettled(TEST_USERS.map(user => runWorkflow(user)));

    // You can then check who failed without stopping the script
    // results.forEach((result, index) => {
    //     if (result.status === 'rejected') {
    //         console.log(`User ${index + 1} failed with error: ${result.reason}`);
    //     }
    // });
    // await Promise.all(TEST_USERS.map(user => runWorkflow(user)))
})


// test("reset workflows with api", async () => { })
test.afterAll("print metrics", async () => {
    metrics.print();
});

test.beforeAll("reset workflow for multiple users", async ({ browser }) => {


    const runWorkflow = async (user: { email: string, password: string, workflowId: string }) => {

        try {

            await resetWorkflowForUserAPI(user.email, user.password, user.workflowId);

        } finally {
        }
    };

    await Promise.all(TEST_USERS.map(user => runWorkflow(user)))

})
