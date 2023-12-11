import Gameboard from "./gameBoard.js";
import Helpers from "./helpers.js";
import Player from "./player.js";

const GAME = () => {
   const USER_GAMEBOARD = new Gameboard();
   const AI_GAMEBOARD = new Gameboard();
   const USER = new Player();
   const AI = new Player();
   const HELPERS = new Helpers();

   USER.isTurn = true;
   USER.isUser = true;

   HELPERS.storeGameData(USER, AI, USER_GAMEBOARD, AI_GAMEBOARD);
};

export default GAME();
