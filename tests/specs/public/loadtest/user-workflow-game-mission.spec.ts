import test from "@playwright/test";

import { metrics } from "../../../helpers/metrics";
import { generateTestUsers } from "../../../helpers/test-users";
import { missionWorkflow } from "../../../helpers/loadtest-helper";
import { resetWorkflowForUserAPI } from "../../../helpers/workflow.helper";


const NBR_USERS = 20;
const index = 1;

const TEST_USERS = generateTestUsers(NBR_USERS, index)

test("game workflow", async ({ browser }) => {
    test.setTimeout(300_000)
    test.slow();
    // test.skip();
    await missionWorkflow(
        (mission) => mission.missionGame(TEST_USERS[0].workflowId),
        TEST_USERS,
        browser
    )

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