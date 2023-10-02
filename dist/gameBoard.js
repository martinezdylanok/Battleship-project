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

  placeShip(x, y, ship) {
    let isValidPlacement = false;
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      isValidPlacement = true;
      const shipSymbol = "S";

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
              this.grid[x + i][y] = shipSymbol;
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
              this.grid[x][y + i] = shipSymbol;
            }
          }
        }
      }
    }
    return isValidPlacement;
  }
}

module.exports = Gameboard;
