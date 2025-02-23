import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


export default async function init(dir: string) {
    const __currentFilename = fileURLToPath(import.meta.url);
    const __currentDirname = dirname(__currentFilename);

    try {

        let configDirpath = path.resolve(__currentDirname, dir + '/smartsuite-config.json');
        await fs.writeFile(configDirpath, tsContent, 'utf8');

        //write existing tables to file for reference
        let jsonData = JSON.stringify(filteredExistingTables, null, 2);
        configDirpath = path.join(__currentDirname, 'condensedTables.json');
        await fs.writeFile(configDirpath, jsonData, 'utf8');

        jsonData = JSON.stringify(existingTables, null, 2);
        configDirpath = path.join(__currentDirname, 'tables.json');
        await fs.writeFile(configDirpath, jsonData, 'utf8');

        console.log('Write success');
        return 'Write success';
    } catch (error) {
        console.error('Error updating tables:', error);
        throw error;
    }
}
const config = {
    "api_key": "",
    "api_secret": "",
    "api_url": "https://api.smartsuite.io/v1"
};
fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
console.log(`Created smartsuite-config.json in ${directory}`);
    }
}