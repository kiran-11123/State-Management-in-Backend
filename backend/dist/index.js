"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const store_1 = require("./store");
(0, logger_1.default)();
setInterval(() => {
    store_1.games.push({
        id: Math.random().toString(),
        whitePlayerName: 'Alice',
        blackPlayerName: "Denzel",
        moves: []
    });
}, 5000);
