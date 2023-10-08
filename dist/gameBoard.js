class Gameboard {
   constructor() {
      this.width = 10;
      this.height = 10;
      this.grid = Array.from({ length: this.width }, () => Array.from({ length: this.height }, () => " "));
      this.ships = [];
      this.areAllSunk = false;
   }

   placeShip(x, y, ship) {
      let isValidPlacement = true;
      const SHIP_SYMBOL = Array.from(ship.type)[0];

      if (ship.position === "Horizontal") {
         if (x + ship.length - 1 >= this.width) {
            isValidPlacement = false;
         } else {
            for (let i = 0; i < ship.length; i += 1) {
               if (this.grid[x + i][y] !== " ") {
                  isValidPlacement = false;
                  break;
               }
            }
            if (isValidPlacement) {
               for (let i = 0; i < ship.length; i += 1) {
                  this.grid[x + i][y] = SHIP_SYMBOL;
               }
               this.ships.push(ship);
            }
         }
      } else if (ship.position === "Vertical") {
         if (y + ship.length - 1 >= this.height) {
            isValidPlacement = false;
         } else {
            for (let i = 0; i < ship.length; i += 1) {
               if (this.grid[x][y + i] !== " ") {
                  isValidPlacement = false;
                  break;
               }
            }
            if (isValidPlacement) {
               for (let i = 0; i < ship.length; i += 1) {
                  this.grid[x][y + i] = SHIP_SYMBOL;
               }
               this.ships.push(ship);
            }
         }
      }
   }

   receiveAttack(x, y) {
      if (x < 0 || x > this.width || y < 0 || y > this.height) {
         return;
      }

      if (this.grid[x][y] === "X" || this.grid[x][y] === "O") {
         return;
      }

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
      }
   }
}

module.exports = Gameboard;
