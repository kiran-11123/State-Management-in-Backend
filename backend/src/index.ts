import startLogger from "./logger";
import { GameManager  ,gameManager} from "./store";



startLogger();
setInterval(()=>{
    gameManager.addGame(Math.random().toString())
     
} , 5000)

