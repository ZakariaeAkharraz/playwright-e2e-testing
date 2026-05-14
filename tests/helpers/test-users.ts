import path from "path";
import fs from 'fs'
import { arena, Arena } from "./test-project";

export type User = {
        id?: string,
        profileId: string,
        username: string,
        firstname: string,
        lastName: string,
        email: string,
        password: string,
        role?: "Player",
        arena: Arena,
}


export const PROD_USER = {
        id: "9a5ea9e9-4736-44ca-9352-1e4f07b93abd",
        email: "user.player3@demo.com",
        workflowId: "69d7cd95377d23ab7ea30d6a",
        password: "Pass12345@"
}
export const QA_USER: User = {
        id: "f5fbb237-8396-4617-8f8c-62b5c85847c6",
        profileId: "95a7d573-08d9-47c2-99ad-aa4d2ce88879",
        username: "Qa User",
        firstname: "qa",
        lastName: "test",
        email: "qa.test@tenant.com",
        password: "motDEpasse@12345",
        role: "Player",
        arena: arena,

}

export const QA_USER1: User = {
        id: "e43c165a-67a2-4e91-96a8-6e50f8c5ca86",
        profileId: "c8be21e5-9464-43d0-8d42-a8668c2adab9",
        username: "Qa User1",
        firstname: "qa",
        lastName: "test1",
        email: "qa.test1@tenant.com",
        password: "motDEpasse@12345",
        role: "Player",
        arena: arena,

}
export const accounts: User[] = [{
        id: "e43c165a-67a2-4e91-96a8-6e50f8c5ca86",
        profileId: "c8be21e5-9464-43d0-8d42-a8668c2adab9",
        username: "Qa User1",
        firstname: "qa",
        lastName: "test1",
        email: "qa.test1@tenant.com",
        password: "motDEpasse@12345",
        role: "Player",
        arena: arena,
}, {
        id: "c4ac6766-c508-4301-a202-1f04113a9480",
        profileId: "a73223dd-5e58-4213-ab1c-9354aa18e515",
        username: "Qa User3",
        firstname: "qa",
        lastName: "test3",
        email: "qa.test3@tenant.com",
        password: "motDEpasse@12345",
        role: "Player",
        arena: arena,
}]



export function generateTestUsers(numberOfUsers: number, index: number) {
        const users: User[] = []
        const first = (index - 1) * numberOfUsers + 1;
        const last = index * numberOfUsers;
        for (let i = first; i <= last; i++) {
                // if(i==7)continue;
                users.push({
                        email: `testing${i}@test.com`,
                        password: "Pass12345@",
                        arena: arena,
                        profileId: "",
                        username: "",
                        firstname: "",
                        lastName: ""
                })
        }
        // users.push(...getTestUsers())
        return users;
}

export function getTestUsers(filerelativePath = 'tests/test-data/TEST_USERS.json') {
        const filePath = path.join(process.cwd(), filerelativePath);
        const data = fs.readFileSync(filePath, 'utf-8');
        const users: User[] = JSON.parse(data);
        return users.map(user => ({
                email: user.email,
                password: user.password,
                workflowId: arena.project.workflowId
        }));
}
