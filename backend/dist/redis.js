"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redis_client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
redis_client.on('error', (err) => console.log('Redis Client Error', err));
redis_client.connect();
exports.default = redis_client;
