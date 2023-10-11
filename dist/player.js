const Gameboard = require("./gameBoard");
const Ship = require("./ship");

class Player {
   constructor(name) {
      this.name = name;
      this.isUser = false;
      this.isTurn = false;
   }

   placeShips(gameboard) {
      if (this.isUser === false) {
         const SHIP_TYPES = ["Patrolboat", "Submarine", "Destroyer", "Battleship", "Carrier"];
         const SHIP_POSITIONS = ["Horizontal", "Vertical"];

         while (gameboard.ships.length < 5) {
            const X = Math.floor(Math.random() * gameboard.width);
            const Y = Math.floor(Math.random() * gameboard.height);
            const RANDOM_SHIP_TYPE = SHIP_TYPES[Math.floor(Math.random() * SHIP_TYPES.length)];
            const RANDOM_SHIP_POSITION = SHIP_POSITIONS[Math.floor(Math.random() * SHIP_POSITIONS.length)];
            const SHIP = new Ship(RANDOM_SHIP_POSITION, RANDOM_SHIP_TYPE);
            gameboard.placeShip(X, Y, SHIP);
         }
      }
   }

   shootAtCoordinates(gameboard) {
      if (this.isUser === false) {
         for (let x = 0; x < gameboard.width; x += 1) {
            for (let y = 0; y < gameboard.height; y += 1) {
               if (gameboard.grid[x][y] === "X") {
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
                     gameboard.receiveAttack(X, Y);
                  }
               } else {
                  const X = Math.floor(Math.random() * gameboard.width);
                  const Y = Math.floor(Math.random() * gameboard.height);
                  gameboard.receiveAttack(X, Y);
               }
            }
         }
      }
   }
}

module.exports = Player;
