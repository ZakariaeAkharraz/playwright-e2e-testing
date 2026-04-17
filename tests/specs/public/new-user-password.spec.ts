import test, { expect, request } from "@playwright/test";
import { Login } from "../../pages/login.page";
import { getTestUsers } from "../player/fixtures/test-users";





test("update password", async () => {
    test.skip();
    const newUsers = [...getTestUsers("prod_data/PROD_TEST_USERS.json")];
    await Promise.allSettled(
        newUsers.map(async (user) => {
            const loginContext = await request.newContext({
                baseURL: process.env.BACKEND_URL_PROD,
                extraHTTPHeaders: {
                    "x-tenant-name": "demo",
                }
            })

            const loginResponse = await loginContext.post("/api/core/auth/login", {
                data: {
                    email: user.email,
                    password: user.password,
                    remember_me: false
                }
            });

            const body = await loginResponse.json();
            const access_token = body.data.accessToken;


            const updatePasswordContext = await request.newContext({
                baseURL: process.env.BACKEND_URL_PROD,
                extraHTTPHeaders: {
                    "x-tenant-name": "demo",
                    "Authorization": `Bearer ${access_token}`
                }
            })

            // console.log(auth.cookies[1].value);

            const updatePasswordResponse = await updatePasswordContext.post("/api/core/auth/update-password-username", {
                data: {
                    newPassword: "Pass12345@",
                    newPasswordConfirm: "Pass12345@",
                    username: user.email.split('@')[0]
                }
            });
            
            if (!updatePasswordResponse.ok()) {
                throw new Error("Failed to reset workflow progress, accesstoken: " + ", status: " + await updatePasswordResponse.body());
            }
        })
    )

})