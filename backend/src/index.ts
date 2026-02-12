import express from 'express';
import pubSubObject  from './PubSubmanager';
const app = express();
app.use(express.json());
import { publisher } from './redis';

const stockTicker :string[] = [];
setInterval(()=>{
    
    const stock = Math.random()*900000 + 100000; 
    stockTicker.push(stock.toString());
    pubSubObject.addUserToStock(Math.random().toString() , stock.toString())

} , 3000)

setInterval(async ()=>{
    
     if (stockTicker.length === 0) return;

    const stock = stockTicker[0]; 
    await publisher.publish(stock, "Hi there");

    console.log("Published message to", stock);

} , 3000)







app.listen(3000, () => {
  console.log('Server is running on port 3000');
});