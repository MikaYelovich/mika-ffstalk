"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFreeFireAccountDetails = void 0;
const scraper_1 = require("./scraper");
Object.defineProperty(exports, "fetchFreeFireAccountDetails", { enumerable: true, get: function () { return scraper_1.fetchFreeFireAccountDetails; } });
/**
 * Optional: Direct usage logic for testing or CLI.
 * Can be removed if used strictly as a library.
 */
async function main() {
    const uid = process.argv[2] || "470699855";
    try {
        const accountData = await (0, scraper_1.fetchFreeFireAccountDetails)(uid);
        console.log(accountData);
    }
    catch (error) {
        console.error("Error fetching Free Fire account details:", error.message);
    }
}
if (require.main === module) {
    main();
}
