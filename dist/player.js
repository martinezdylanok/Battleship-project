const Gameboard = require("./gameBoard");

class Player {
   constructor(name) {
      this.name = name;
      this.gameBoard = new Gameboard();
   }
}

module.exports = Player;
