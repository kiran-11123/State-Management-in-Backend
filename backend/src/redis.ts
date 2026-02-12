import redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redis_client = new redis(REDIS_URL);

export const publisher =  new redis(REDIS_URL);

publisher.on('connect' , ()=>{
     console.log("Publisher connected ")
})

publisher.on('error' , ()=>{
     console.log("Error occured for publisher ")
})



export const subscriber =  new redis(REDIS_URL);

subscriber.on('connected ' , ()=>{
     console.log("Subscriber connected")
})

subscriber.on('error' , ()=>{
     console.log("Error occured for subscriber ")
})


const redisClients = {
    publisher,
    subscriber
};

export default redisClients;