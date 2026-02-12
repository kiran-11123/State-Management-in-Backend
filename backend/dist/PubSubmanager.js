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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("./redis");
class PubSubManager {
    constructor() {
        this.subscriptions = new Map();
        redis_1.subscriber.on('message', (channel, message) => {
            this.forwardMessageToUsers(channel, message);
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new PubSubManager();
        }
        return this.instance;
    }
    addUserToStock(userID, stockTicker) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add the user to the stock's subscriber list in Redis
            var _a;
            if (!this.subscriptions.has(stockTicker)) {
                this.subscriptions.set(stockTicker, new Set());
                yield redis_1.subscriber.subscribe(stockTicker);
            }
            (_a = this.subscriptions.get(stockTicker)) === null || _a === void 0 ? void 0 : _a.add(userID);
            console.log(`user added into the Stock ${stockTicker}`);
        });
    }
    removeUserFromStock(userID, stockTicker) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the user from the stock's subscriber list in Redis
            const users = this.subscriptions.get(stockTicker);
            if (!users)
                return;
            users.delete(userID);
            if (users.size === 0) {
                yield redis_1.subscriber.unsubscribe(stockTicker);
                this.subscriptions.delete(stockTicker);
            }
        });
    }
    forwardMessageToUsers(stockTicker, message) {
        return __awaiter(this, void 0, void 0, function* () {
            // Forward the message to the user through WebSocket or any other means 
            const users = this.subscriptions.get(stockTicker);
            users === null || users === void 0 ? void 0 : users.forEach(user => {
                console.log(`send ${message} to ${user}`);
            });
        });
    }
}
exports.PubSubManager = PubSubManager;
const pubSubObject = PubSubManager.getInstance();
exports.default = pubSubObject;
