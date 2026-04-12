import { browser } from 'k6/browser'
import { check } from 'https://jslib.k6.io/k6-utils/1.6.0/index.js'
import { Login } from './fixtures/login.page.js'
import { Program } from "./fixtures/program.page.js";
import { Arena } from "./fixtures/arena.page.js";
import { Mission } from "./fixtures/mission.page.js";

export const options = {

    scenarios: {

        ui: {
            executor: 'ramping-vus',
            stages: [
                { duration: '2m', target: 10 },   // ramp up
                  // hold at 1000 users
                { duration: '2m', target: 0 },     // ramp down
            ],
            options: {
                browser: {
                    type: 'chromium',
                },
            },

        },

    },
    thresholds: {
        checks: ['rate==1.0'],
    },

}

export default async function () {
    const page = await browser.newPage()
    const user = {email:`testing${__VU}@test.com`, password:"Pass12345@" }
    try {
        const login = new Login(page);
        const program = new Program(page);
        const arena = new Arena(page);
        const mission = new Mission(page);
        await login.goto();
        await login.signin(user.email, user.password);

        // now we're in the dashboard

        // close dashboard tutorial
        await page.getByRole('button', { name: 'Close tutorial' }).click();

        // getting users ids




        await arena.goto();

        // close Arena tutorial
        await page.getByRole('button', { name: 'Close tutorial' }).click();

        await program.gotoProgramThroughArena();

        // close Program tutorial
        await page.getByRole('button', { name: 'Close tutorial' }).click();

        // now we should be in the program page

        // accessing the first mission 'Doc to read'
        await mission.goto(0);


        await mission.startMission();

        await mission.closeMission();


    } finally {
        await page.close()
    }
}


