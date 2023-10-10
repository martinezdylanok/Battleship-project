const Player = require("../dist/player.js");
const Gameboard = require("../dist/gameBoard.js");
const Ship = require("../dist/ship.js");

describe("Player class tests", () => {
   it("Should create a Player object with the specified name", () => {
      const player = new Player("Alice");
      expect(player.name).toBe("Alice");
   });

   it("Should place all the ships on the game board", () => {
      const PLAYER = new Player("George");
      PLAYER.placeShips();
      expect(PLAYER.gameBoard.ships.length).toBe(5);
   });

   it("Should simulate a random attack on an empty gameboard", () => {
      const PLAYER = new Player("Michael");
      PLAYER.shootAtCoordinates();
      let foundOne = false;
      for (let x = 0; x < PLAYER.gameBoard.width; x += 1) {
         for (let y = 0; y < PLAYER.gameBoard.height; y += 1) {
            if (PLAYER.gameBoard.grid[x][y] === "O") {
               foundOne = true;
               break;
            }
         }
      }
      expect(foundOne).toBe(true);
   });

   it("Should attack an adjacent cell once it hits a ship cell", () => {
      const PLAYER = new Player("Arnold");
      const SHIP = new Ship("Horizontal", "Patrolboat");
      PLAYER.gameBoard.placeShip(1, 0, SHIP);
      PLAYER.gameBoard.grid[1][0] = "X";

      PLAYER.shootAtCoordinates();

      const ADJACENT_CELLS = [
         [0, 0],
         [0, 1],
         [0, 2],
         [1, 1],
         [1, 2],
         [2, 0],
         [2, 1],
         [2, 2],
      ];

      const ANY_ADJACENT_CELL_CONTAINS_X = ADJACENT_CELLS.some(([x, y]) => PLAYER.gameBoard.grid[x][y] === "X");
      expect(ANY_ADJACENT_CELL_CONTAINS_X).toBe(true);
   });
});
