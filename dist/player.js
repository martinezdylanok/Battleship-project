const Gameboard = require("./gameBoard");
const Ship = require("./ship");

class Player {
   constructor(name) {
      this.name = name;
      this.gameBoard = new Gameboard();
      this.isUser = false;
      this.isTurn = false;
   }

   placeShips() {
      if (this.isUser === false) {
         const SHIP_TYPES = ["Patrolboat", "Submarine", "Destroyer", "Battleship", "Carrier"];
         const SHIP_POSITIONS = ["Horizontal", "Vertical"];

         while (this.gameBoard.ships.length < 5) {
            const X = Math.floor(Math.random() * this.gameBoard.width);
            const Y = Math.floor(Math.random() * this.gameBoard.height);
            const RANDOM_SHIP_TYPE = SHIP_TYPES[Math.floor(Math.random() * SHIP_TYPES.length)];
            const RANDOM_SHIP_POSITION = SHIP_POSITIONS[Math.floor(Math.random() * SHIP_POSITIONS.length)];
            const SHIP = new Ship(RANDOM_SHIP_POSITION, RANDOM_SHIP_TYPE);
            this.gameBoard.placeShip(X, Y, SHIP);
         }
      }
   }

   shootAtCoordinates() {
      if (this.isUser === false) {
         for (let x = 0; x < this.gameBoard.width; x += 1) {
            for (let y = 0; y < this.gameBoard.height; y += 1) {
               if (this.gameBoard.grid[x][y] === "X") {
                  const OFFSETS = [
                     [-1, 0],
                     [1, 0],
                     [0, -1],
                     [0, 1],
                     [-1, -1],
                     [-1, 1],
                     [1, -1],
                     [1, 1],
                  ];

                  for (let i = 0; i < OFFSETS.length; i += 1) {
                     const DX = OFFSETS[i][0];
                     const DY = OFFSETS[i][1];
                     const X = x + DX;
                     const Y = y + DY;
                     this.gameBoard.receiveAttack(X, Y);
                  }
               } else {
                  const X = Math.floor(Math.random() * this.gameBoard.width);
                  const Y = Math.floor(Math.random() * this.gameBoard.height);
                  this.gameBoard.receiveAttack(X, Y);
               }
            }
         }
      }
   }
}

module.exports = Player;
