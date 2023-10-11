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
      const GAMEBOARD = new Gameboard();
      PLAYER.placeShips(GAMEBOARD);
      expect(GAMEBOARD.ships.length).toBe(5);
   });

   it("Should simulate a random attack on an empty gameboard", () => {
      const PLAYER = new Player("Michael");
      const GAMEBOARD = new Gameboard();
      PLAYER.shootAtCoordinates(GAMEBOARD);
      let foundOne = false;
      for (let x = 0; x < GAMEBOARD.width; x += 1) {
         for (let y = 0; y < GAMEBOARD.height; y += 1) {
            if (GAMEBOARD.grid[x][y] === "O") {
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
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(1, 0, SHIP);
      GAMEBOARD.grid[1][0] = "X";

      PLAYER.shootAtCoordinates(GAMEBOARD);

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

      const ANY_ADJACENT_CELL_CONTAINS_X = ADJACENT_CELLS.some(([x, y]) => GAMEBOARD.grid[x][y] === "X");
      expect(ANY_ADJACENT_CELL_CONTAINS_X).toBe(true);
   });
});
