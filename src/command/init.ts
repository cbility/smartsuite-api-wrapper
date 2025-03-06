import { existsSync, promises } from 'fs';
import { copyFile } from 'fs/promises';
import path from 'path';
import * as readline from 'readline';
import { __dirname } from './index.js';

export async function init(directoryPath: string) {
    console.log('Initialising SmartSuite API wrapper...');

    const workingDir = process.cwd();
    const targetDir = path.resolve(workingDir, directoryPath);
    const configFilePath = path.join(targetDir, 'smartsuite-config.js');
    const dotenvPath = path.join(targetDir, '.env');

    // Create a readline interface to get user input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    async function askQuestion(query: string): Promise<string> {
        const answer = await new Promise<string>((resolve) => rl.question(query, resolve));
        return answer.toLowerCase();
    }

    //check location with user
    console.log(`smartsuite-config.js and.env will be created in ${targetDir}`);
    let continuePrompt = await askQuestion('Do you want to continue? (y/n) ');
    while (continuePrompt !== 'y' && continuePrompt !== 'n') {
        continuePrompt = await askQuestion('Please enter y or n: ');
    }
    if (continuePrompt === 'n') {
        console.log('Initialisation cancelled.');
        rl.close();
        return;
    }

    if (!existsSync(configFilePath)) {
        await copyFile(`${__dirname}/default-smartsuite-config.js`, configFilePath);
        console.log(`smartsuite-config.js created at ${configFilePath}`);
    } else {
        console.log(`smartsuite-config.js already exists at ${configFilePath}`);
        let overWritePromptAnswer = await askQuestion('Do you want to overwrite it? (y/n) ');
        while (overWritePromptAnswer !== 'y' && overWritePromptAnswer !== 'n') {
            overWritePromptAnswer = await askQuestion('Please enter y or n: ');
        }
        switch (overWritePromptAnswer) {
            case 'y':
                try {
                    await copyFile(`${__dirname}/default-smartsuite-config.js`, configFilePath);
                    console.log('smartsuite-config.js overwritten.');
                } catch (copyError) {
                    console.error(`Failed to copy file: ${(copyError as Error).message}`);
                }
                break;
            case 'n':
                //console.log(`${configFilePath} not overwritten.`);
                break;
        }
    };

    if (!existsSync(dotenvPath)) {
        await createEnvFile()
    } else {
        console.log(`.env file already exists at ${dotenvPath}`);
        let overWritePromptAnswer = await askQuestion('Do you want to overwrite it? (y/n) ');
        while (overWritePromptAnswer !== 'y' && overWritePromptAnswer !== 'n') {
            overWritePromptAnswer = await askQuestion('Please enter y or n: ');
        }
        switch (overWritePromptAnswer) {
            case 'y':
                await createEnvFile();
                break;
            case 'n':
                //console.log('.env file not overwritten.');
                break;
        }
    }
    rl.close();

    async function createEnvFile() {
        const workspaceId = await askQuestion('Please enter the workspace ID to use as default: ');
        const apiKey = await askQuestion('Please enter the API key to use as default: ');
        const envFileContent = `SMARTSUITE_DEFAULT_WORKSPACE_ID=${workspaceId}\nSMARTSUITE_DEFAULT_API_KEY=${apiKey}`;
        try {
            await promises.writeFile(dotenvPath, envFileContent);
            console.log(`.env file created at ${dotenvPath}`);
        } catch (writeError) {
            console.error(`Failed to write .env file: ${(writeError as Error).message}`);
        }

    }
}
