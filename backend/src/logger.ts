import { GameManager  ,gameManager} from "./store";

function startLogger(){
setInterval(()=>{
   
 console.log(gameManager.log());
} ,5000)
}

export default startLogger;
