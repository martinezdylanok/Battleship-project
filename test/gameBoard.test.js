import Ship from "../dist/ship";
import Gameboard from "../dist/gameBoard";
import Player from "../dist/player";

describe("Testing Gameboard object creation", () => {
   it("Check if the gameboard was created", () => {
      const GAMEBOARD = new Gameboard();
      expect(GAMEBOARD).toBeInstanceOf(Gameboard);
   });

   it("Check the gameboard grid", () => {
      const GAMEBOARD = new Gameboard();
      const GRID_ARRAYS = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => " "));
      expect(GAMEBOARD.grid).toEqual(GRID_ARRAYS);
   });
});

describe("Testing placeShip method conditions", () => {
   it("Place correctly a ship on the game board", () => {
      const GAMEBOARD = new Gameboard();
      const SHIP_PLACED = GAMEBOARD.placeShip(8, 5, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.grid[8][5]).toBe("P");
   });

   it("Not placing a ship horizontally that goes out of bounds", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(9, 5, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.grid[9][5]).toBe(" ");
   });

   it("Not placing a ship horizontally with overlapping ships", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Horizontal", "Submarine"));
      GAMEBOARD.placeShip(2, 0, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.grid[2][0]).toBe("S");
   });

   it("Place a ship horizontally without overlapping other ships", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Horizontal", "Submarine"));
      GAMEBOARD.placeShip(0, 4, new Ship("Horizontal", "Destroyer"));

      expect(GAMEBOARD.grid[0][0]).toBe("S");
      expect(GAMEBOARD.grid[1][0]).toBe("S");
      expect(GAMEBOARD.grid[2][0]).toBe("S");

      expect(GAMEBOARD.grid[0][4]).toBe("D");
      expect(GAMEBOARD.grid[1][4]).toBe("D");
      expect(GAMEBOARD.grid[2][4]).toBe("D");
   });

   it("Not placing a ship vertically that goes out of bounds", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(5, 9, new Ship("Vertical", "Patrolboat"));
      expect(GAMEBOARD.grid[5][9]).toBe(" ");
   });

   it("Not placing a ship vertically with overlapping ships", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Vertical", "Submarine"));
      const SHIP_PLACED = GAMEBOARD.placeShip(0, 2, new Ship("Vertical", "Patrolboat"));
      expect(GAMEBOARD.grid[0][1]).toBe("S");
   });

   it("Place a ship vertically without overlapping other ships", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Vertical", "Submarine"));
      GAMEBOARD.placeShip(4, 0, new Ship("Vertical", "Destroyer"));
      expect(GAMEBOARD.grid[0][0]).toBe("S");
      expect(GAMEBOARD.grid[0][1]).toBe("S");
      expect(GAMEBOARD.grid[0][2]).toBe("S");

      expect(GAMEBOARD.grid[4][0]).toBe("D");
      expect(GAMEBOARD.grid[4][1]).toBe("D");
      expect(GAMEBOARD.grid[4][2]).toBe("D");
   });

   it("Return already placed ships", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Vertical", "Submarine"));
      GAMEBOARD.placeShip(0, 4, new Ship("Vertical", "Patrolboat"));
      expect(GAMEBOARD.grid[0][0]).toBe("S");
      expect(GAMEBOARD.grid[0][4]).toBe("P");
   });

   it("Not placing a ship that has the same type as other ship", () => {
      const GAMEBOARD = new Gameboard();
      GAMEBOARD.placeShip(0, 0, new Ship("Horizontal", "Patrolboat"));
      GAMEBOARD.placeShip(2, 0, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.ships.length).toBe(1);
   });
});

describe("Testing receiveAttack method conditions", () => {
   it("The attack coordinates are wrong", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      GAMEBOARD.placeShip(1, 0, new Ship("Horizontal", "Patrolboat"));
      GAMEBOARD.receiveAttack(4, 0, USER);
      expect(GAMEBOARD.grid[1][0]).not.toMatch("X");
   });

   it("Attacking a placed ship", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      const SHIP = new Ship("Horizontal", "Patrolboat");
      GAMEBOARD.placeShip(0, 0, SHIP);
      expect(GAMEBOARD.grid[0][0]).toBe("P");
      GAMEBOARD.receiveAttack(0, 0, USER);
      expect(GAMEBOARD.grid[0][0]).toBe("X");
   });

   it("Sink a ship", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      const SHIP = new Ship("Horizontal", "Patrolboat");
      GAMEBOARD.placeShip(0, 0, SHIP);
      expect(GAMEBOARD.grid[0][0]).toBe("P");
      for (let i = 1; i < SHIP.length; i += 1) {
         GAMEBOARD.receiveAttack(i, 0, USER);
         expect(GAMEBOARD.grid[i][0]).toBe("X");
      }
      expect(SHIP.isSunk).toBeTruthy();
   });

   it("Check if the other cells were not attacked", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      GAMEBOARD.placeShip(0, 0, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.grid[0][0]).toBe("P");
      GAMEBOARD.receiveAttack(0, 0, USER);
      expect(GAMEBOARD.grid[0][0]).toBe("X");
      expect(GAMEBOARD.grid[1][0]).not.toBe("X");
      expect(GAMEBOARD.grid[0][1]).not.toBe("X");
   });

   it("Attacking an empty cell", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      GAMEBOARD.placeShip(0, 0, new Ship("Horizontal", "Patrolboat"));
      expect(GAMEBOARD.grid[0][0]).toBe("P");
      GAMEBOARD.receiveAttack(4, 0, USER);
      expect(GAMEBOARD.grid[0][0]).not.toBe("X");
      expect(GAMEBOARD.grid[4][0]).toBe("O");
   });

   it("Check if all the ships are sunk", () => {
      const GAMEBOARD = new Gameboard();
      const USER = new Player("user");
      const SHIP = new Ship("Horizontal", "Patrolboat");
      const SHIP2 = new Ship("Horizontal", "Submarine");
      GAMEBOARD.placeShip(0, 0, SHIP);
      GAMEBOARD.placeShip(2, 0, SHIP2);

      GAMEBOARD.receiveAttack(0, 0, USER);
      expect(SHIP.sunkState).toBeFalsy();
      GAMEBOARD.receiveAttack(1, 0, USER);
      expect(SHIP.sunkState).toBeTruthy();
      expect(GAMEBOARD.areAllSunk).toBe(false);

      for (let i = 2; i < SHIP2.length + 2; i += 1) {
         GAMEBOARD.receiveAttack(i, 0, USER);
      }
      expect(SHIP2.sunkState).toBeTruthy();
      expect(GAMEBOARD.areAllSunk).toBeTruthy();
   });
});
