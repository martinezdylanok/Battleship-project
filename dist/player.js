import Ship from "./ship.js";

class Player {
   constructor(name) {
      this.name = name;
      this.isUser = false;
      this.isTurn = false;
   }

   autoPlaceShips(gameboard) {
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

   randomAttack(gameboard, opponent, player) {
      if (this.isUser || !this.isTurn) return [null, null];

      const X = Math.floor(Math.random() * gameboard.width);
      const Y = Math.floor(Math.random() * gameboard.height);

      gameboard.receiveAttack(X, Y);
      const AI = player;
      AI.isTurn = false;
      const USER = opponent;
      USER.isTurn = true;

      return [X, Y];
   }

   async strategicAttack(gameboard, opponent, player) {
      if (this.isUser || !this.isTurn) return [null, null];

      let foundHit = false;
      let attackCoordinates = [null, null];

      for (let x = 0; x < gameboard.width; x += 1) {
         for (let y = 0; y < gameboard.height; y += 1) {
            if (gameboard.grid[x][y] === "X" && !foundHit) {
               const ADJACENT_COORDS = [
                  [x - 1, y],
                  [x + 1, y],
                  [x, y - 1],
                  [x, y + 1],
               ];

               const randomIndex = Math.floor(Math.random() * ADJACENT_COORDS.length);
               const [X, Y] = ADJACENT_COORDS[randomIndex];

               if (X >= 0 && X < gameboard.width && Y >= 0 && Y < gameboard.height && gameboard.grid[X][Y] !== "O" && gameboard.grid[X][Y] !== "X") {
                  gameboard.receiveAttack(X, Y);
                  foundHit = true;
                  const AI = player;
                  AI.isTurn = false;
                  const USER = opponent;
                  USER.isTurn = true;
                  attackCoordinates = [X, Y];
               }
            }
            if (foundHit) break;
         }
         if (foundHit) break;
      }

      if (!foundHit) {
         attackCoordinates = await this.randomAttack(gameboard, opponent, player);
      }
      return attackCoordinates;
   }
}

export default Player;
