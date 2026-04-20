import path from "path";
import fs from 'fs'

export type User={
        email:string,
        password: string,
        workflowId: string
}


export const PROD_USER = {
        id:"9a5ea9e9-4736-44ca-9352-1e4f07b93abd",
        email:"user.player3@demo.com",
        password:"Pass12345@"
}
export const QA_USER = {
        id: "f5fbb237-8396-4617-8f8c-62b5c85847c6",
        firstname:"qa",
        lastName:"test1",
        email: "qa.test@tenant.com",
        password: "Pass12345@",
        role: "Player",

        workflow: {
                projectName: "qaa Project",
                id: "69d7cd95377d23ab7ea30d6a",
                path: "/projects/69d7cd95377d23ab7ea30d6a",
        }
}



export function generateTestUsers(numberOfUsers: number, index: number) {
        const users:User[] = []
        const first = (index - 1) * numberOfUsers + 1;
        const last = index * numberOfUsers;
        for (let i = first; i <= last; i++) {
                // if(i==7)continue;
                users.push({
                        email: `ibtissamghr+${i}@gmail.com`,
                        password: "Pass12345@",
                        workflowId: QA_USER.workflow.id
                })
        }
        // users.push(...getTestUsers())
        return users;
}

export function getTestUsers(filerelativePath='tests/test-data/TEST_USERS.json') {
        const filePath = path.join(process.cwd(), filerelativePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        const users:User[] = JSON.parse(data);
        return users.map(user => ({
          email: user.email,
          password: user.password,
          workflowId: user.workflowId
        }));
      }