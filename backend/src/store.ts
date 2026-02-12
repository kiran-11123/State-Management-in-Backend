interface Game{
      id :string,
      whitePlayerName:string,
      blackPlayerName:string,
      moves:string[]
}





export class GameManager{

   private static instance : GameManager;
    games : Game[] =   [];

    private constructor(){

        //create a single instance of the GameManager class and store it in a variable  
        this.games = [];
    }

    static getInstance(){

        if(this.instance){
             return this.instance;
        } 
        const gameManager = new GameManager();
        this.instance = gameManager;
        return gameManager;
    }
    addMove(gameId:string , move:string){
         console.log(`Adding move ${move} to game ${gameId}`)
         const games = this.games.find(game=>game.id===gameId);
         games?.moves.push(move);
    }

    addGame(gameId :string){

        const game= {
            id : gameId,
            whitePlayerName:'Alice',
            blackPlayerName:'Bob',
            moves : []
            
        }

        this.games.push(game);

        console.log(`Game with gameId ${gameId} is pushed into the state`)
         
    }

    log(){
        console.log(this.games);
    }

   
     
}


export const gameManager = GameManager.getInstance();