class Gameboard {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.grid = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => " "),
    );
    this.missedShots = [];
    this.areAllSunk = false;
  }

  placeShip(x, y, ship) {
    let isValidPlacement = true;
    const SHIP_SYMBOL = "S";

    if (ship.position === "horizontal") {
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
        }
      }
    } else if (ship.position === "vertical") {
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
        }
      }
    }
    return isValidPlacement;
  }
}

module.exports = Gameboard;
