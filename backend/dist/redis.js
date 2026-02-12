"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriber = exports.publisher = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const redis_client = new ioredis_1.default(REDIS_URL);
exports.publisher = new ioredis_1.default(REDIS_URL);
exports.publisher.on('connect', () => {
    console.log("Publisher connected ");
});
exports.publisher.on('error', () => {
    console.log("Error occured for publisher ");
});
exports.subscriber = new ioredis_1.default(REDIS_URL);
exports.subscriber.on('connected ', () => {
    console.log("Subscriber connected");
});
exports.subscriber.on('error', () => {
    console.log("Error occured for subscriber ");
});
const redisClients = {
    publisher: exports.publisher,
    subscriber: exports.subscriber
};
exports.default = redisClients;
