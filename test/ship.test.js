const Ship = require("../dist/ship.js");

describe("Ship creation and basic methods", () => {
   it("Check ship position", () => {
      const SHIP = new Ship("Horizontal", "Patrolboat");
      expect(SHIP.position).toBe("Horizontal");
   });

   it("Check ship type", () => {
      const SHIP = new Ship("Horizontal", "Battleship");
      expect(SHIP.type).toBe("Battleship");
   });

   it("Check match of ship type with its length", () => {
      const SHIP = new Ship("Horizontal", "Patrolboat");
      expect(SHIP.length).toBe(2);
   });

   it("Check hit method", () => {
      const SHIP = new Ship("Horizontal", "Destroyer");
      SHIP.hit();
      expect(SHIP.hitsNum).toBe(1);
   });

   it("Check isSunk method", () => {
      const SHIP = new Ship("Horizontal", "Carrier");
      expect(SHIP.sunkState).toBe(false);
   });

   it("Check that isSunk really checks for a sunk ship", () => {
      const SHIP = new Ship("Horizontal", "Patrolboat");
      for (let i = 0; i < SHIP.length + 1; i += 1) {
         SHIP.hit();
      }
      expect(SHIP.sunkState).toBe(true);
   });
});
