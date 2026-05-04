import { request } from "@playwright/test";
import dotenv from 'dotenv';
import fs from "fs";
import { BrowserContext } from "@playwright/test";
dotenv.config();

export async function extractAccessTokenFromCookie(context: BrowserContext) {

    const cookies = await context.cookies();
    const access_token = cookies.find((cookie: any) => cookie.name === "__access_token__")?.value;
    return access_token;

}
export async function resetWorkflow(workflowId: string, context: BrowserContext) {

    // const auth = JSON.parse(fs.readFileSync("playwright/.auth/player.json", "utf-8"));
    const token = await extractAccessTokenFromCookie(context)

    console.log('--- Request Context Debug ---');
    console.log('Base URL:', process.env.BACKEND_GAMITOOL);
    console.log('Tenant:', process.env.TENANT);
    console.log('Token :', token);

    const reqContext = await request.newContext({
        baseURL: process.env.BACKEND_GAMITOOL,
        extraHTTPHeaders: {
            "X-Tenant-Name": process.env.TENANT!,
            "Authorization": `Bearer ${token}`
        }
    })

    // console.log(auth.cookies[1].value);

    const reponse = await reqContext.put("/api/core/workflows-progress/reset-workflow-progress/" + workflowId);


    if (!reponse.ok()) {
        console.error('FAILED CALL:', {
                url: reponse.url(),
                status: reponse.status(),
                sentHeaders: reponse.headers(),
                errorBody: await reponse.text()
            });
        throw new Error("Failed to reset workflow progress, status: " + await reponse.body());
    }

    await reqContext.dispose();
}


export async function resetWorkflowForUser(workflowId: string, accessToken: string) {
    const context = await request.newContext({
        baseURL: process.env.BACKEND_GAMITOOL,
        extraHTTPHeaders: {
            "x-tenant-name": process.env.TENANT!,
            "Authorization": `Bearer ${accessToken}`
        }
    })
    const reponse = await context.put("/api/core/workflows-progress/reset-workflow-progress/" + workflowId);

    if (!reponse.ok()) {
        throw new Error("Failed to reset workflow progress, accesstoken: " + accessToken + ", status: " + await reponse.body());
    }

    await context.dispose();
}

async function loginApi(email: string, password: string) {
    const context = await request.newContext({
        baseURL: process.env.BACKEND_GAMITOOL,
        extraHTTPHeaders: {
            "x-tenant-name": process.env.TENANT!,
        }
    })

    return await context.post("/api/core/auth/login", {
        data: {
            email: email,
            password: password,
            remember_me: false
        }
    });
}

export async function resetWorkflowForUserAPI(email: string, password: string, workflowId: string) {


    const response = await loginApi(email, password)

    const body = await response.json();
    const access_token = body.data.accessToken;

    await resetWorkflowForUser(workflowId, access_token);



    if (!response.ok()) {
        throw new Error("Failed to reset workflow progress, accesstoken: " + ", status: " + await response.body());
    }

}
export async function completeStepApi(context: BrowserContext, workflowId: string, stepId: string) {
    const access_token = await extractAccessTokenFromCookie(context);
    const reqContext = await request.newContext({
        baseURL: process.env.BACKEND_GAMITOOL,
        extraHTTPHeaders: {
            "x-tenant-name": process.env.TENANT!,
            "Authorization": `Bearer ${access_token}`
        }
    })
    const response = await reqContext.post(`/api/core/workflows-progress/${workflowId}/step/${stepId}/complete`, {
        data: {
            "success": true,
            "score": 85,
        }
    })
    if (!response.ok()) {
        throw new Error("Failed to failed to complete step, error: " + await response.body());
    }
}
