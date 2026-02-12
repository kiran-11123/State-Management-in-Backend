import redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";


export const publisher =  new redis(REDIS_URL);

publisher.on('connect' , ()=>{
     console.log("Publisher connected ")
})

publisher.on('error', (err) => {
    console.error("Publisher error:", err);
});



export const subscriber =  new redis(REDIS_URL);

subscriber.on('connect', () => {
    console.log("Subscriber connected");
});


subscriber.on('error' , (err)=>{
     console.log("Error occured for subscriber " , err);
})


const redisClients = {
    publisher,
    subscriber
};

export default redisClients;