import Ship from "./ship.js";

class Gameboard {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.grid = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => " "),
    );
    this.missedShots = [];
    this.areAllSunk = false;
  }

  const BARQUITO = new Ship(horizontal, 3);

  placeShip(x, y, ship) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        let isValidPlacement = true;
        let shipSymbol = "S";

        if(ship.position === "horizontal") {
            if (x + ship.length -1 >= this.width) {
                isValidPlacement = false;
            } else {
                for (let i = 0; i < ship.length; i++) {
                    if(this.grid[x + i][y] !== " ") {
                        isValidPlacement = false;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for(let i = 0; i < ship.length; i++) {
                        this.grid[x + i][y] = shipSymbol;
                    }
                }
            }
        } else if (ship.position === "vertical") {
            if (y + ship.length -1 >= this.height) {
                isValidPlacement = false;
            } else {
                for (let i = 0; i < ship.length; i++) {
                    if(this.grid[x][y + i] !== " ") {
                        isValidPlacement = false;
                        break;
                    }
                }
                if (isValidPlacement) {
                    for(let i = 0; i < ship.length; i++) {
                        this.grid[x][y + i] = shipSymbol;
                    }
                }
            }
        }

    }
        
    }   
}
