import Gameboard from "./gameBoard.js";
import Helpers from "./helpers.js";
import Player from "./player.js";

const GAME = () => {
   const HELPERS = new Helpers();
   const USER_GAMEBOARD = new Gameboard();
   const AI_GAMEBOARD = new Gameboard();
   const USER = new Player();
   const AI = new Player();
   USER.isUser = true;
   USER.isTurn = true;

   const USER_GRID = HELPERS.createGrid(USER_GAMEBOARD, USER);
   const AI_GRID = HELPERS.createGrid(AI_GAMEBOARD, AI);

   HELPERS.displayGrid(USER_GRID, USER);
   HELPERS.displayGrid(AI_GRID, AI);

   const INITIAL_SHIPS_ELEMENTS = HELPERS.SHIPS_ELEMENTS;
   const INITIAL_SHIPS_OBJECTS = HELPERS.SHIPS_OBJECTS;

   HELPERS.dragUserShips(USER_GAMEBOARD, INITIAL_SHIPS_ELEMENTS, INITIAL_SHIPS_OBJECTS);
   HELPERS.rotateUserShips(INITIAL_SHIPS_ELEMENTS, INITIAL_SHIPS_OBJECTS);
};

export default GAME();
