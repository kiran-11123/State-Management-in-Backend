"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
function startLogger() {
    setInterval(() => {
        console.log(store_1.games);
    }, 5000);
}
exports.default = startLogger;
