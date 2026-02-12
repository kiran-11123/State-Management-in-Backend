"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PubSubmanager_1 = __importDefault(require("./PubSubmanager"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const stockTicker = [];
setInterval(() => {
    const stock = Math.random() * 900000 + 100000;
    stockTicker.push(stock.toString());
    PubSubmanager_1.default.addUserToStock(Math.random().toString(), stock.toString());
}, 3000);
setInterval(() => {
    const stock = Math.random() * 900000 + 100000;
    PubSubmanager_1.default.forwardMessageToUsers(stockTicker[0], "Hi there ");
}, 3000);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
