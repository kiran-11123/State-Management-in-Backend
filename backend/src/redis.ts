import express from 'express'
import redis from 'redis'
import { createClient } from 'redis'


const redis_client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'

});



redis_client.on('error', (err) => console.log('Redis Client Error', err));

 redis_client.connect();

export default redis_client;