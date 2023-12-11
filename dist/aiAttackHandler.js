class AiAttackHandler {
   findHitCoordinates(gameboard) {
      for (let x = 0; x < gameboard.width; x += 1) {
         for (let y = 0; y < gameboard.height; y += 1) {
            if (gameboard.grid[x][y] === "X") {
               return [x, y];
            }
         }
      }
      return null;
   }

   getRandomAdjacentCoordinates([x, y], gameboard) {
      const ADJACENT_COORDINATES = [
         [x - 1, y],
         [x + 1, y],
         [x, y - 1],
         [x, y + 1],
      ];

      const VALID_COORDINATES = ADJACENT_COORDINATES.filter(([X, Y]) => X >= 0 && X < gameboard.width && Y >= 0 && Y < gameboard.height && gameboard.grid[X][Y] !== "O" && gameboard.grid[X][Y] !== "X");

      if (VALID_COORDINATES.length === 0) {
         return [null, null];
      }

      const RANDOM_INDEX = Math.floor(Math.random() * VALID_COORDINATES.length);
      return VALID_COORDINATES[RANDOM_INDEX];
   }

   switchTurns(opponent, player) {
      const USER = opponent;
      USER.isTurn = true;

      const AI = player;
      AI.isTurn = false;
   }

   randomAttack(gameboard, opponent, player) {
      if (player.isUser || !player.isTurn) return [null, null];

      const X = Math.floor(Math.random() * gameboard.width);
      const Y = Math.floor(Math.random() * gameboard.height);

      if (gameboard.receiveAttack(X, Y)) {
         this.switchTurns(opponent, player);
         return [X, Y];
      }

      return [null, null];
   }

   async strategicAttack(gameboard, opponent, player) {
      if (player.isUser || !player.isTurn) return [null, null];

      const HIT_COORDINATES = this.findHitCoordinates(gameboard);

      if (HIT_COORDINATES) {
         const [X, Y] = this.getRandomAdjacentCoordinates(HIT_COORDINATES, gameboard);

         if (X !== null && Y !== null) {
            gameboard.receiveAttack(X, Y);
            this.switchTurns(opponent, player);
            return [X, Y];
         }
      }

      return this.randomAttack(gameboard, opponent, player);
   }
}

export default AiAttackHandler;
