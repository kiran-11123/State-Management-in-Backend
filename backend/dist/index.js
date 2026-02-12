"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PubSubmanager_1 = __importDefault(require("./PubSubmanager"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const redis_1 = require("./redis");
const stockTicker = [];
setInterval(() => {
    const stock = Math.random() * 900000 + 100000;
    stockTicker.push(stock.toString());
    PubSubmanager_1.default.addUserToStock(Math.random().toString(), stock.toString());
}, 3000);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    if (stockTicker.length === 0)
        return;
    const stock = stockTicker[0];
    yield redis_1.publisher.publish(stock, "Hi there");
    console.log("Published message to", stock);
}), 3000);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
