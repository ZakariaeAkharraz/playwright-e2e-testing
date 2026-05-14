import { APIResponse, request, test as setup } from "@playwright/test"
import path from "path";

import { QA_USER1 } from "../../helpers/test-users";
import { loginApi } from "../../helpers/workflow.helper";

const playerAuthFile = path.join("./playwright/.auth/auth-user.json")

setup("auth-user setup", async ({}) => {
  const authContext = await request.newContext({
    extraHTTPHeaders: {
      "x-tenant-name": process.env.TENANT!,
    }
  });

  await authContext.post(`${process.env.BACKEND_GAMITOOL}/api/core/auth/login`, {
    data: {
      email: QA_USER1.email,
      password: QA_USER1.password,
      remember_me: false
    },
    maxRedirects: 10,
  });

  await authContext.storageState({ path: playerAuthFile });
});