import AiShipPlacer from "../dist/aiShipPlacer";
import Gameboard from "../dist/gameBoard";

describe("aiShipPlacer class tests", () => {
   it("Should place all the ships on the game board", () => {
      const AI_SHIP_PLACER = new AiShipPlacer();
      const GAMEBOARD = new Gameboard();
      AI_SHIP_PLACER.autoPlaceShips(GAMEBOARD);
      expect(GAMEBOARD.ships.length).toBe(5);
   });

   it("Should not place new ships on a full game board", () => {
      const AI_SHIP_PLACER = new AiShipPlacer();
      const GAMEBOARD = new Gameboard();
      AI_SHIP_PLACER.autoPlaceShips(GAMEBOARD);
      expect(GAMEBOARD.ships.length).toBe(5);
      AI_SHIP_PLACER.autoPlaceShips(GAMEBOARD);
      expect(GAMEBOARD.ships.length).toBe(5);
   });
});
