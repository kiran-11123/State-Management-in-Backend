import express from 'express';
import pubSubObject  from './PubSubmanager';
const app = express();
app.use(express.json());


const stockTicker :string[] = [];
setInterval(()=>{
    
    const stock = Math.random()*900000 + 100000; 
    stockTicker.push(stock.toString());
    pubSubObject.addUserToStock(Math.random().toString() , stock.toString())

} , 3000)

setInterval(()=>{
    
    const stock = Math.random()*900000 + 100000; 
    pubSubObject.forwardMessageToUsers(stockTicker[0] , "Hi there ")

} , 3000)







app.listen(3000, () => {
  console.log('Server is running on port 3000');
});