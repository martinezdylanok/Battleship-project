import AiAttackHandler from "../dist/aiAttackHandler";
import AiShipPlacer from "../dist/aiShipPlacer";
import Gameboard from "../dist/gameBoard";
import Player from "../dist/player";

describe("AiAttackHandler class tests", () => {
   it("Should simulate a random attack on an empty gameboard", () => {
      const USER = new Player("User");
      const AI = new Player("Ai");
      const AI_ATTACK_HANDLER = new AiAttackHandler();
      const USER_GAMEBOARD = new Gameboard();

      let foundAttack = false;
      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            expect(USER_GAMEBOARD.grid[x][y]).toBe(" ");
         }
      }

      AI_ATTACK_HANDLER.randomAttack(USER_GAMEBOARD, USER, AI);
      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            if (USER_GAMEBOARD.grid[x][y] === "O") {
               foundAttack = true;
               expect(foundAttack).toBeTruthy();
            }
         }
      }
   });

   it("Should simulate a random attack on an full gameboard", () => {
      const USER = new Player("User");
      const AI = new Player("Ai");
      const AI_ATTACK_HANDLER = new AiAttackHandler();
      const AI_SHIP_PLACER = new AiShipPlacer();
      const USER_GAMEBOARD = new Gameboard();

      AI_SHIP_PLACER.autoPlaceShips(USER_GAMEBOARD);

      AI.isTurn = true;
      let foundAttack = false;

      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            expect(USER_GAMEBOARD.grid[x][y]).not.toBe("X");
            expect(USER_GAMEBOARD.grid[x][y]).not.toBe("O");
         }
      }

      AI_ATTACK_HANDLER.randomAttack(USER_GAMEBOARD, USER, AI);
      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            if (USER_GAMEBOARD.grid[x][y] === "X" || USER_GAMEBOARD.grid[x][y] === "O") {
               foundAttack = true;
               expect(foundAttack).toBeTruthy();
            }
         }
      }
   });

   it("Should attack an adjacent cell if it founds a X on the gameboard", async () => {
      const USER = new Player("User");
      const AI = new Player("Ai");
      const AI_ATTACK_HANDLER = new AiAttackHandler();
      const USER_GAMEBOARD = new Gameboard();

      USER.isUser = true;

      USER_GAMEBOARD.grid[1][0] = "X";

      AI.isTurn = true;

      await AI_ATTACK_HANDLER.strategicAttack(USER_GAMEBOARD, USER, AI);

      const ADJACENT_CELLS = [
         [0, 0],
         [2, 0],
         [1, 1],
      ];

      let foundAdjacent = false;

      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            for (let i = 0; i < ADJACENT_CELLS.length; i += 1) {
               if (USER_GAMEBOARD.grid[x][y] === ADJACENT_CELLS[i]) {
                  foundAdjacent = true;
                  expect(foundAdjacent).toBeTruthy();
               }
            }
         }
      }
   });
});
