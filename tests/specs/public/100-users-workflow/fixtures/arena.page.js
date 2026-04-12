
import { Dashboard } from "./dashboard.page.js";


export class Arena{
    // readonly page :Page;

    constructor(page){
        this.page = page;

    }

    async goto(){
        // const dashboard= new Dashboard(this.page);
        // dashboard.goto();
        await this.page.getByTestId(/^sidebar-nav-arenas/).click();
        
        await this.page.waitForURL(/.*arenas.*/);
        
    }
    
    // async expectProgramTitle(){

    // }
}