import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import {sendResultsToSquash} from "./squash-reporter-helper"
import dotenv from 'dotenv'

dotenv.config();
class SquashReporter implements Reporter {

    private baseUrl = process.env.SQUASH_API;
    private iterationId = 4; // Replace with your actual ID from Step 1
    

    async onTestEnd(test: TestCase, result: TestResult) {
        console.log("in the reporter")
        const automationKey = test.tags.findLast(tag => tag.startsWith("@PE-"))
        if (!automationKey) {
            console.warn(`⚠️ Skipping Squash update: No 'PE-' tag found for test: ${test.title}`);
            return;
        }

        console.log(`📡 Sending result for [${automationKey}] to Squash TM...`);
        const statusMap = {
            passed: 'SUCCESS',
            failed: 'FAILURE',
            timedOut: 'FAILURE',
            skipped: 'BLOCKED',
            interrupted: null
        };
        const squashStatus = statusMap[result.status] || 'FAILURE';
        
        try {
            // 3. API CALL
            await sendResultsToSquash(this.iterationId,[{reference:automationKey,status:squashStatus}],this.baseUrl!)
            // const response = await fetch(`${this.baseUrl}/iterations/${this.iterationId}/executions`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Basic ${this.auth}`,
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         _type: 'execution',
            //         status: squashStatus,
            //         automation_key: automationKey,
            //         notes: result.error ? `Error: ${result.error.message}` : `Automated execution of ${test.title}`
            //     }),
            // });
            // if (response.ok) {
            //     console.log(`✅ Squash TM updated: ${automationKey} -> ${squashStatus}`);
            // } else {
            //     const errorBody = await response.text();
            //     console.error(`❌ Squash API Error (${response.status}): ${errorBody}`);
            // }
        }
        catch (error) {
            // console.error('❌ Failed to connect to Squash TM:', error);
        }

    }
}
export default SquashReporter;