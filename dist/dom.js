class Dom {
   markAttackedCell(gameboard, player, PREVIOUS_SHOTS, X, Y) {
      if (gameboard.missedShots > PREVIOUS_SHOTS) {
         const CELL_ID = player.isUser ? `user-cell-${X}-${Y}` : `ai-cell-${X}-${Y}`;
         const CELL = document.querySelector(`#${CELL_ID}`);
         CELL.classList.remove("hidden-cell");
         CELL.textContent = "O";
         CELL.classList.add("empty-cell");
      } else {
         const CELL_ID = player.isUser ? `user-cell-${X}-${Y}` : `ai-cell-${X}-${Y}`;
         const CELL = document.querySelector(`#${CELL_ID}`);
         CELL.classList.remove("hidden-cell");
         CELL.textContent = "X";
         CELL.classList.add("hit-cell");
      }
   }

   displayGrid(gameboard, player) {
      const GRID = document.createElement("div");
      GRID.classList.add("gameboard");
      for (let x = 0; x < gameboard.width; x += 1) {
         for (let y = 0; y < gameboard.height; y += 1) {
            const CELL = document.createElement("div");
            CELL.classList.add("cell");
            CELL.textContent = gameboard.grid[x][y];
            if (player.isUser === false) {
               CELL.classList.add("hidden-cell");
            }
            const CELL_ID = player.isUser ? `user-cell-${x}-${y}` : `ai-cell-${x}-${y}`;
            CELL.setAttribute("id", CELL_ID);
            GRID.appendChild(CELL);
         }
      }
      if (player.isUser === true) {
         const USER_CONTAINER = document.getElementById("user-container");
         GRID.setAttribute("id", "user-gameboard");
         USER_CONTAINER.appendChild(GRID);
      } else {
         const AI_CONTAINER = document.getElementById("ai-container");
         GRID.setAttribute("id", "ai-gameboard");
         AI_CONTAINER.appendChild(GRID);
      }
   }

   userAttack(gameboard, opponent, player) {
      if (!player.isUser || !player.isTurn) return;

      const AI_GAMEBOARD = document.getElementById("ai-gameboard");
      const CELLS = AI_GAMEBOARD.querySelectorAll(".cell");

      return new Promise((resolve, reject) => {
         function cellClickHandler(event) {
            const CLICKED_CELL = event.target;
            if (CLICKED_CELL.classList.contains("hidden-cell")) {
               CLICKED_CELL.classList.remove("hidden-cell");
               const [X, Y] = CLICKED_CELL.id.split("-").slice(-2).map(Number);

               const RESULT = gameboard.receiveAttack(X, Y);
               const USER = player;
               USER.isTurn = false;
               const AI = opponent;
               AI.isTurn = true;

               CELLS.forEach((CELL) => {
                  CELL.removeEventListener("click", cellClickHandler);
               });

               resolve(RESULT);
            }
         }

         CELLS.forEach((CELL) => {
            CELL.addEventListener("click", cellClickHandler);
         });
      });
   }
}

export default Dom;
