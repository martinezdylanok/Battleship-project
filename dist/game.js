import Gameboard from "./gameBoard.js";
import Player from "./player.js";
import Dom from "./dom.js";

const GAME = () => {
   const DOM = new Dom();

   const USER_GAMEBOARD = new Gameboard();
   const AI_GAMEBOARD = new Gameboard();

   const USER = new Player("User");
   USER.isUser = true;
   USER.isTurn = true;
   const AI = new Player("AI");

   USER.autoPlaceShips(USER_GAMEBOARD);
   AI.autoPlaceShips(AI_GAMEBOARD);

   DOM.displayGrid(USER_GAMEBOARD, USER);
   DOM.displayGrid(AI_GAMEBOARD, AI);

   const gameLoop = setInterval(async () => {
      if (USER.isTurn) {
         const PREVIOUS_SHOTS = AI_GAMEBOARD.missedShots;
         const RESULT = await DOM.userAttack(AI_GAMEBOARD, AI, USER);
         const X = RESULT[0];
         const Y = RESULT[1];
         DOM.markAttackedCell(AI_GAMEBOARD, AI, PREVIOUS_SHOTS, X, Y);
      } else if (AI.isTurn) {
         const PREVIOUS_SHOTS = USER_GAMEBOARD.missedShots;
         const RESULT = await AI.strategicAttack(USER_GAMEBOARD, USER, AI);
         const X = RESULT[0];
         const Y = RESULT[1];
         DOM.markAttackedCell(USER_GAMEBOARD, USER, PREVIOUS_SHOTS, X, Y);
      }

      if (USER_GAMEBOARD.areAllSunk || AI_GAMEBOARD.areAllSunk) {
         clearInterval(gameLoop);
      }
   }, 1000);
};

export default GAME;
