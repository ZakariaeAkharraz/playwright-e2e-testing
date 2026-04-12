import test from "@playwright/test";
import { Dashboard } from "../../pages/dashboard.page";

test("switching user back to mentor",async ({page}) => {
    
        const dashboard =new Dashboard(page);
        
        await dashboard.switchRoleToMentor();

    })