import Ship from "./ship.js";

class AiShipPlacer {
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
}

export default AiShipPlacer;
