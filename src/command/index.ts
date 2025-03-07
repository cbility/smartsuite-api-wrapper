#! /usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { init } from './init.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const program = new Command();

program
    .name('smartsuite-api-wrapper')
    .description('Command line interface for working with the SmartSuite API wrapper')
    .version('0.1.0')
    .option('-i, --init [directory path]', 'create smartsuite-config.json file and .env file in the specified directory. Defaults to the current directory.')
    .option('--db pull [API Key] [Workspace ID]', 'pull data schema from SmartSuite API and generate data model and types')

program.parse();

//retrieve included option flags
const options = program.opts();

//count number of selected options
const numSelectedOptions: number = [options.init, options.first].reduce(
    (previous, current) => previous + (current ? 1 : 0), 0);

//validate option flags
if (options.init && numSelectedOptions > 1) {
    console.error(`error: option '--init' cannot be used with another option`);
    process.exit(1);
}

if (options.init) {
    await init(options.init);
};

if (options.db) {
    console.log('db option selected');
}
process.exit(0);


