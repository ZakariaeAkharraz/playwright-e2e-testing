
import { test as base, Page } from "@playwright/test";
import path from "path";
import fs from "fs";
type FileFixture = {
    generateFile: (fileName: string, fileSizeInMB: number) => string,
}
export const test = base.extend<FileFixture>({

    generateFile: async ({ }, use) => {
        const generatedFiles: string[] = [];
        const generate = (fileName: string, fileSizeInMB: number): string => {
            const filepath = path.join("playwright/temp", fileName);

            fs.mkdirSync(path.dirname(filepath), { recursive: true });

            const buffer = Buffer.alloc(fileSizeInMB * 1024 * 1024, "a");
            fs.writeFileSync(filepath, buffer);

            generatedFiles.push(filepath);
            return filepath;
        }

        await use(generate);

        generatedFiles.forEach(file => { fs.unlinkSync(file) })
    }
})

