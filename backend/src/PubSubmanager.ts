import redis_client from './redis';
import { createClient , RedisClientPoolType, RedisClientType } from 'redis';


export class PubSubManager{

    private static instance: PubSubManager;
    private static redisClient: RedisClientType;
    private static subscriptions: Map<string,string[]> ;

    private constructor() {
       this.redisClient = redis_client;
       this.subscriptions = new Map<string,string[]>();
    }

    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }

    addUserToStock(userID : string , stockTicker : string) {
        // Add the user to the stock's subscriber list in Redis
        this.redisClient.sAdd(`stock:${stockTicker}:subscribers`, userID);

    }
    removeUserFromStock(userID : string , stockTicker : string) {   

        // Remove the user from the stock's subscriber list in Redis

    }

    forwardMessageToUser(userID : string , stockTicker : string, message : string) {
        // Forward the message to the user through WebSocket or any other means 
    
    }
}