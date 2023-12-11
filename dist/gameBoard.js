class Gameboard {
   constructor() {
      this.width = 10;
      this.height = 10;
      this.grid = Array.from({ length: this.width }, () => Array.from({ length: this.height }, () => " "));
      this.ships = [];
      this.missedShots = 0;
      this.areAllSunk = false;
   }

   placeShip(x, y, ship) {
      for (let i = 0; i < this.ships.length; i += 1) {
         if (this.ships[i].type === ship.type) {
            return false;
         }
      }

      let isValidPlacement = true;

      const SHIP_SYMBOL = Array.from(ship.type)[0];

      if (ship.position === "Horizontal") {
         if (y + ship.length - 1 >= this.height) {
            isValidPlacement = false;
         } else {
            for (let j = 0; j < ship.length; j += 1) {
               if (this.grid[x][y + j] !== " ") {
                  isValidPlacement = false;
                  break;
               }
            }
            if (isValidPlacement) {
               for (let j = 0; j < ship.length; j += 1) {
                  this.grid[x][y + j] = SHIP_SYMBOL;
               }
               this.ships.push(ship);
            }
         }
      } else if (ship.position === "Vertical") {
         if (x + ship.length - 1 >= this.width) {
            isValidPlacement = false;
         } else {
            for (let j = 0; j < ship.length; j += 1) {
               if (this.grid[x + j][y] !== " ") {
                  isValidPlacement = false;
                  break;
               }
            }
            if (isValidPlacement) {
               for (let j = 0; j < ship.length; j += 1) {
                  this.grid[x + j][y] = SHIP_SYMBOL;
               }
               this.ships.push(ship);
            }
         }
      }

      return isValidPlacement;
   }

   receiveAttack(x, y) {
      if (x === null || y === null || x === undefined || y === undefined || x < 0 || x > this.width || y < 0 || y > this.height || this.grid[x][y] === "X" || this.grid[x][y] === "O") {
         return undefined;
      } // Handling all invalid coordinates at once

      if (this.grid[x][y] !== " ") {
         const SHIP_SYMBOL = this.grid[x][y];

         this.grid[x][y] = "X";

         this.ships.forEach((ship) => {
            if (ship.type[0] === SHIP_SYMBOL) {
               ship.hit();
            }
         });

         this.areAllSunk = this.ships.every((ship) => ship.isSunk());
      } else {
         this.grid[x][y] = "O";
         this.missedShots += 1;
      }

      return [x, y];
   }
}

export default Gameboard;
