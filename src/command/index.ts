#! /usr/bin/env node
import { Command, CommanderError } from 'commander';
import init from './init';
const program = new Command();

program
    .name('smartsuite-api-wrapper')
    .description('Command line interface for working with the SmartSuite API wrapper')
    .version('0.1.0')
    .option('-i, --init [directory]', 'create smartsuite-config.json file and .env file in the specified directory', ".")
    .option('--first')
    .option('-s, --separator <char>')

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
if (options.init) init(options.init);


