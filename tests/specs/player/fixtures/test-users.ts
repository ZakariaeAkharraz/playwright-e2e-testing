import path from "path";
import fs from 'fs'

export type User={
        email:string,
        password: string,
        workflowId: "69cbe2612d6d77a96a84accc"
}

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



export function generateTestUsers(numberOfUsers: number, index: number) {
        const users:User[] = []
        const first = (index - 1) * numberOfUsers + 1;
        const last = index * numberOfUsers;
        for (let i = first; i <= last; i++) {
                // if(i==7)continue;
                users.push({
                        email: `testing${i}@test.com`,
                        password: "Pass12345@",
                        workflowId: "69cbe2612d6d77a96a84accc"
                })
        }
        // users.push(...getTestUsers())
        return users;
}

export function getTestUsers(filerelativePath='tests/specs/player/fixtures/TEST_USERS.json') {
        const filePath = path.join(process.cwd(), filerelativePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        const users:User[] = JSON.parse(data);
        return users.map(user => ({
          email: user.email,
          password: user.password,
          workflowId: user.workflowId
        }));
      }