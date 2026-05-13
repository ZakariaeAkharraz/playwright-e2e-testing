import { request } from "@playwright/test";
import dotenv from 'dotenv';
import fs from "fs";
import { BrowserContext } from "@playwright/test";
import { QA_USER } from "./test-users";
dotenv.config();


export async function extractAccessTokenFromCookie(context: BrowserContext) {

    const cookies = await context.cookies();
    const access_token = cookies.find((cookie: any) => cookie.name === "__access_token__")?.value;
    return access_token;

}
export async function resetWorkflow(workflowId: string, context: BrowserContext) {
    const token = await extractAccessTokenFromCookie(context)

    await resetWorkflowForUser(workflowId, token!);

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
export async function startAndCompleteStepApi(context: BrowserContext, workflowId: string, stepId: string) {
    const reqContext = await prepareReqContext(context);
    let response = await reqContext.put(`/api/core/workflows-progress/${workflowId}/start/${stepId}`)

    if (!response.ok()) {
        throw new Error("Failed to failed to complete step, error: " + await response.body());
    }

    response = await reqContext.post(`/api/core/workflows-progress/${workflowId}/step/${stepId}/complete`, {
        data: {
            "success": true,
            "score": 85,
        }
    })

    if (!response.ok()) {
        throw new Error("Failed to failed to complete step, error: " + await response.body());
    }

}



export async function completeStepApi(context: BrowserContext, workflowId: string, stepId: string) {

    const reqContext = await prepareReqContext(context)
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

async function prepareReqContext(context: BrowserContext, token?: string) {
    const access_token = token !== undefined ? token : await extractAccessTokenFromCookie(context);
    return await request.newContext({
        baseURL: process.env.BACKEND_GAMITOOL,
        extraHTTPHeaders: {
            "x-tenant-name": process.env.TENANT!,
            "Authorization": `Bearer ${access_token}`
        }
    })
}

export async function updateUsername(username = QA_USER.username, context: BrowserContext) {
    const reqContext = await prepareReqContext(context);
    reqContext.post("/api/core/profiles/" + QA_USER.profileId, {
        data: {
            "username": username
        }
    })
}

export async function updatePassword(newPassword: string, currentPassword: string, context: BrowserContext) {
    const response = await loginApi(QA_USER.email, currentPassword)
    const body = await response.json();
    const access_token = body.data.accessToken;

    const reqContext = await prepareReqContext(context, access_token);
    reqContext.post("/api/core/auth/change-password", {
        data: {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
    })
    
}