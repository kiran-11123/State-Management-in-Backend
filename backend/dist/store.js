"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = exports.GameManager = void 0;
class GameManager {
    constructor() {
        this.games = [];
        this.games = [];
    }
    addMove(gameId, move) {
        console.log(`Adding move ${move} to game ${gameId}`);
        const games = this.games.find(game => game.id === gameId);
        games === null || games === void 0 ? void 0 : games.moves.push(move);
    }
    addGame(gameId) {
        const game = {
            id: gameId,
            whitePlayerName: 'Alice',
            blackPlayerName: 'Bob',
            moves: []
        };
        this.games.push(game);
        console.log(`Game with gameId ${gameId} is pushed into the state`);
    }
    log() {
        console.log(this.games);
    }
}
exports.GameManager = GameManager;
exports.gameManager = new GameManager();
