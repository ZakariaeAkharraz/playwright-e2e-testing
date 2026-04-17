import test from "@playwright/test";
import { generateTestUsers } from "../../player/fixtures/test-users";

import { resetWorkflowForUserAPI } from "../../player/workflow/workflow.fixture";

import { metrics } from "../../../helpers/metrics";
import { missionWorkflow } from "./loadtest-helper";

const NBR_USERS = 20;
const index = 1;

const TEST_USERS = generateTestUsers(NBR_USERS, index)

test.beforeAll("reset workflow for multiple users", async ({ browser }) => {
    
    const runWorkflow = async (user: { email: string, password: string, workflowId: string }) => {

        try {

            await resetWorkflowForUserAPI(user.email, user.password, user.workflowId);

        } finally {
        }
    };

    await Promise.all(TEST_USERS.map(user => runWorkflow(user)))

})


test("visualize media mission", async ({ browser }) => {
    test.setTimeout(300_000)
    test.slow();

    await missionWorkflow(
        (mission) => mission.missionMediaVisualization("Présentation Borj"),
        TEST_USERS,
        browser
    )

})

// for (let i = 1; i <= NBR_USERS; i++) {

//     const user = TEST_USERS[i];

//     test(`visualize media user ${i}`, async ({ browser }) => {
//         const context = await browser.newContext();
//         const page = await context.newPage();

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
//         // now we're in the dashboard


//         await metrics.measure(page, "user navigate to arena", async () => {

//             await arena.gotoProd();
//             // close Arena tutorial
//             await page.getByRole('button', { name: 'Close tutorial' }).click();
//         });
//         // now we should be in the program page

//         await metrics.measure(page, "user navigate to program", async () => {
//             await program.gotoProgram();
//             // close Program tutorial
//             await page.getByRole('button', { name: 'Close tutorial' }).click();
//         });

//         await mission.missionUploadFile();
//     })
// }


test.afterAll(() => {
    metrics.print();
})

// test("reset workflows with api", async () => { })



