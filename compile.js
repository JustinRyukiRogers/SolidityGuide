// can't call .sol file cuz this is .js
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":lottery"];
// need to make it available
