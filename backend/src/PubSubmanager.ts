import redisClients from "./redis";
import { subscriber } from "./redis";

export class PubSubManager{

    private static instance: PubSubManager;
    private  subscriptions: Map<string,Set<string>> = new Map();
    private constructor() {

     subscriber.on('message' , (channel , message)=>{
          this.forwardMessageToUsers(channel, message);
     })
      
    }

    public static getInstance(): PubSubManager {
        if (!this.instance) {
            this.instance = new PubSubManager();
        }
        return this.instance;
    }

 async  addUserToStock(userID : string , stockTicker : string) {
        // Add the user to the stock's subscriber list in Redis
         
        if(!this.subscriptions.has(stockTicker)){
             this.subscriptions.set(stockTicker , new Set());
              await subscriber.subscribe(stockTicker);
        } 
        
        this.subscriptions.get(stockTicker)?.add(userID);
        
        console.log(`user added into the Stock ${stockTicker}`)
        
    }
    async removeUserFromStock(userID : string , stockTicker : string) {   

        // Remove the user from the stock's subscriber list in Redis
         
         const users = this.subscriptions.get(stockTicker);

        if (!users) return;

        users.delete(userID);

        if(users.size ===0 ){
             await subscriber.unsubscribe(stockTicker);
             this.subscriptions.delete(stockTicker);
        }
        

    }

    async forwardMessageToUsers(stockTicker : string, message : string) {
        // Forward the message to the user through WebSocket or any other means 
        const users = this.subscriptions.get(stockTicker);

        users?.forEach(user => {
            console.log(`send ${message} to ${user}`);
        }); 
       
    }

    



}

const pubSubObject = PubSubManager.getInstance();

export default pubSubObject;
