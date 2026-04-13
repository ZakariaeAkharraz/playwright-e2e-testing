export const TEST_USER = {
        id: "3d423588-93f9-4c36-b6f4-d4abe8e19c95",
        firstname: "Hajar Ibtissam",
        lastname: "Chah Gar",
        username: "Hajar ibtissam Chah gar",
        email: "sotavew907@fanlvr.com",
        gender: "female",
        department: "Marketing",
        role: "Player"
}
export const QA_USER = {
        id: "f5fbb237-8396-4617-8f8c-62b5c85847c6",
        firstname:"qa",
        lastName:"test1",
        email: "qa.test@tenant.com",
        password: "motDEpasse@12345",
        role: "Player",

        workflow: {
                projectName: "QA Project",
                id: "69cbe2612d6d77a96a84accc",
                path: "/projects/69cbe2612d6d77a96a84accc",
        }
}



export function generateTestUsers(numberOfUsers:number){ 
        const users=[]
        for (let i = 1; i <= numberOfUsers ; i++) {      
                // if(i==7)continue;
         users.push({
                email:`testing${i}@test.com`,
                password:"Pass12345@",
                workflowId:"69cbe2612d6d77a96a84accc"})
        }
        return users;
}