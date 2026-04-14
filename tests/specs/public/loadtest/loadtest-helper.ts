// import { Page } from "@playwright/test";
// import { Arena } from "../../../pages/arena.page";
// import { Login } from "../../../pages/login.page";
// import { Program } from "../../../pages/program.page";


// export async function navigateToMission(page: Page,metrics: any) {
//     const login = new Login(page);
    
//     const program = new Program(page);
//     const arena = new Arena(page);
    
//     await metrics.measure(page, "user login to dashboard", async () => {
//         await login.goto();
//         await login.signin(user.email, user.password);
//         // close dashboard tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
//     // now we're in the dashboard


//     await metrics.measure(page, "user navigate to arena", async () => {

//         await arena.goto();
//         // close Arena tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
//     // now we should be in the program page

//     await metrics.measure(page, "user navigate to program", async () => {
//         await program.gotoProgram();
//         // close Program tutorial
//         await page.getByRole('button', { name: 'Close tutorial' }).click();
//     });
// }