#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const inquirer = require('inquirer');
const gen = require('./generate.js');

const prompts = require('./prompts.js');

async function main() {
    console.log("Create-Backend v3.8.3");
    
    console.log("What a beatiful day to write some beautiful code!\nLet's begin\n\n-github.com/ChoqueCastroLD");

    let {
        name,
        example,
        database,
        typescript,
        license,
        aliases
    } = prompts;

    let usedPrompts = [];

    let inputs = {};
    let answer = {};

     

    if (args.y) {
        answer.name = name.default;
        answer.rest = example.default;
        answer.database = database.default;
        answer.ts = typescript.default;
        answer.license = license.default;
        answer.aliases = aliases.default;
    }

    if (args._.length > 0) inputs.name = args._.join('_') || 'generated_backend';
    else if (!args.y) usedPrompts.push(name);

    if (args.aliases) inputs.aliases = true;
    else if (!args.y) usedPrompts.push(aliases);

    if (args.example) inputs.rest = true;
    else if (!args.y) usedPrompts.push(example);

    if (args.db) inputs.database = (args.db + '').toLowerCase() || 'mysql';
    else if (!args.y) usedPrompts.push(database);

    if (args.ts) inputs.ts = true;
    else if (!args.y) usedPrompts.push(typescript);

    if (args.license) inputs.license = args.license || 'UNLICENSED';
    else if (!args.y) usedPrompts.push(license);

    if (usedPrompts.length > 0)
        answer = await inquirer.prompt(usedPrompts);

    let options = {
        ...answer,
        ...inputs
    };
    
    options.port = 3000;
    
    let projectPath = await gen.generate(options);

    console.log(`done ;)

    What's next?
    1. Go to your project folder
    cd ${projectPath}
    
    2. Setup migrations (Optional for MySql No Sequalize)
    npx install-migrate

    3. Install and Update node_modules
    npm run setup

    Now you can run the project with npm start or npm run dev
    `);
}

main();