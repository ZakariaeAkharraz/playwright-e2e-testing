import { request } from "@playwright/test";
import dotenv from 'dotenv';
import fs from "fs";
import { BrowserContext } from "@playwright/test";
dotenv.config();

export async function resetWorkflow(workflowId: string) {
    const auth = JSON.parse(fs.readFileSync("playwright/.auth/player.json", "utf-8"));
    const token = auth.cookies.find((cookie: any) => cookie.name === "__access_token__")?.value;
    const context = await request.newContext({
        baseURL: process.env.BACKEND_URL_DEV,
        extraHTTPHeaders: {
            "x-tenant-name": "ocp",
            "Authorization": `Bearer ${token}`
        }
    })

    // console.log(auth.cookies[1].value);

    const reponse = await context.put("/api/core/workflows-progress/reset-workflow-progress/" + workflowId);


    if (!reponse.ok()) {
        throw new Error("Failed to reset workflow progress, status: " + await reponse.body());
    }

    await context.dispose();
}


export async function resetWorkflowForUser(workflowId: string, accessToken: string) {


    const context = await request.newContext({
        baseURL: process.env.BACKEND_URL_DEV,
        extraHTTPHeaders: {
            "x-tenant-name": "ocp",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    // console.log(auth.cookies[1].value);

    const reponse = await context.put("/api/core/workflows-progress/reset-workflow-progress/" + workflowId);

    // console.log(reponse.body);

    if (!reponse.ok()) {
        throw new Error("Failed to reset workflow progress, accesstoken: " + accessToken + ", status: " + await reponse.body());
    }

    await context.dispose();
}


export async function resetWorkflowForUserAPI(email: string, password: string, workflowId: string) {

    const context = await request.newContext({
        baseURL: process.env.BACKEND_URL_DEV,
        extraHTTPHeaders: {
            "x-tenant-name": "ocp",
        }
    })

    const response = await context.post("/api/core/auth/login", {
        data: {
            email: email,
            password: password,
            remember_me: false
        }
    });

    const body = await response.json();
    const access_token = body.data.accessToken;

    await resetWorkflowForUser(workflowId,access_token);



    if (!response.ok()) {
        throw new Error("Failed to reset workflow progress, accesstoken: " + ", status: " + await response.body());
    }

}
