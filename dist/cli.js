#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const scraper_1 = require("./scraper");
const program = new commander_1.Command();
program
    .name("mika-ffstalk")
    .version("1.0.0")
    .description("Inspect Free Fire user accounts")
    .argument("<uid>", "Free Fire UID to fetch")
    .option("--json", "Output raw JSON")
    .option("--table", "Output formatted summary in a table")
    .showHelpAfterError();
program.parse(process.argv);
const options = program.opts();
const uid = program.args[0];
if (!uid) {
    program.outputHelp();
    process.exit(1);
}
(async () => {
    const spinner = (0, ora_1.default)(`Fetching Free Fire data for UID: ${uid}...`).start();
    try {
        const data = await (0, scraper_1.fetchFreeFireAccountDetails)(uid);
        spinner.succeed("Data fetched successfully!");
        if (options.json) {
            console.log(JSON.stringify(data, null, 2));
            return;
        }
        if (options.table) {
            const table = new cli_table3_1.default({
                head: [chalk_1.default.blueBright("Field"), chalk_1.default.greenBright("Value")],
            });
            const m = data.metadata;
            table.push(["Nickname", m.nickname], ["Account ID", m.accountId], ["Level", m.level], ["Region", m.region], ["Rank", m.rank], ["EXP", m.exp], ["Last Login", m.lastLoginAt], ["Diamond Cost", m.diamondCost]);
            console.log(table.toString());
            return;
        }
        // Pretty default output
        const m = data.metadata;
        console.log(chalk_1.default.cyan.bold("\n🎮 Free Fire Account Summary"));
        console.log(chalk_1.default.yellow("Nickname:"), m.nickname);
        console.log(chalk_1.default.yellow("Level:"), m.level);
        console.log(chalk_1.default.yellow("Rank:"), m.rank);
        console.log(chalk_1.default.yellow("Region:"), m.region);
        console.log(chalk_1.default.yellow("Diamond Cost:"), m.diamondCost);
        console.log(chalk_1.default.greenBright("\n✅ Tip: Use --json or --table for more formats"));
    }
    catch (err) {
        spinner.fail("Failed to fetch data.");
        console.error(chalk_1.default.red("❌ Error:"), err.message);
        process.exit(1);
    }
})();
