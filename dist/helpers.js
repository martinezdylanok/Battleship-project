import Ship from "./ship.js";

class Helpers {
   constructor() {
      this.SHIPS_OBJECTS = this.createShipObjects();
      this.SHIPS_ELEMENTS = this.selectShipsElements();
   }

   createShipObjects() {
      const CARRIER = new Ship("Horizontal", "Carrier");
      const BATTLESHIP = new Ship("Horizontal", "Battleship");
      const DESTROYER = new Ship("Horizontal", "Destroyer");
      const SUBMARINE = new Ship("Horizontal", "Submarine");
      const PATROLBOAT = new Ship("Horizontal", "Patrolboat");

      const SHIPS_OBJECTS = [CARRIER, BATTLESHIP, DESTROYER, SUBMARINE, PATROLBOAT];

      return SHIPS_OBJECTS;
   }

   selectShipsElements() {
      const SHIPS_CONTAINER = document.querySelector(".ships-container");
      const SHIPS_ELEMENTS = Array.from(SHIPS_CONTAINER.children);

      return SHIPS_ELEMENTS;
   }

   displayStartButton(SHIPS_ELEMENTS) {
      if (SHIPS_ELEMENTS.length <= 0) {
         const START_BUTTON = document.querySelector(".start-button");
         START_BUTTON.classList.add("visible");
         START_BUTTON.addEventListener("click", this.startGame.bind(this));
      }
   }

   startGame() {
      const USER_MENU_BACKGROUND = document.querySelector(".user-menu-background");
      const MAIN_GAME = document.querySelector(".main-game");

      USER_MENU_BACKGROUND.classList.add("hidden");
      MAIN_GAME.classList.remove("hidden");
   }

   createGrid(gameboard, player) {
      const GRID = document.createElement("div");
      GRID.classList.add("gameboard");

      if (player.isUser === true) {
         GRID.setAttribute("id", "user-gameboard");
      } else {
         GRID.setAttribute("id", "ai-gameboard");
      }

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

      return GRID;
   }

   updateGrid(USER_GAMEBOARD) {
      const GRID = document.getElementById("user-gameboard");

      for (let x = 0; x < USER_GAMEBOARD.width; x += 1) {
         for (let y = 0; y < USER_GAMEBOARD.height; y += 1) {
            const CELL_ID = `user-cell-${x}-${y}`;
            const CELL = GRID.querySelector(`#${CELL_ID}`);
            CELL.textContent = USER_GAMEBOARD.grid[x][y];
         }
      }
   }

   displayGrid(PLAYER, GRID) {
      if (PLAYER.isUser) {
         const USER_GRID = GRID;
         const POSITIONING_CONTAINER = document.getElementById("positioning-container");

         POSITIONING_CONTAINER.appendChild(USER_GRID);
      } else {
         const AI_GRID = GRID;
         const AI_CONTAINER = document.getElementById("ai-container");

         AI_CONTAINER.appendChild(AI_GRID);
      }
   }

   rotateUserShips(SHIPS_ELEMENTS, SHIPS_OBJECTS) {
      const ROTATE_BUTTON = document.querySelector(".rotate-button");

      if (SHIPS_ELEMENTS.length > 0 && SHIPS_OBJECTS.length > 0) {
         ROTATE_BUTTON.addEventListener("click", () => {
            SHIPS_ELEMENTS.forEach((SHIP_ELEMENT, index) => {
               const SHIP = SHIP_ELEMENT;
               const CURRENT_TRANSFORM = getComputedStyle(SHIP).transform;
               let CURRENT_ANGLE = 0;

               // Extract the current rotation angle from the transform property
               if (CURRENT_TRANSFORM) {
                  const MATRIX = new DOMMatrix(CURRENT_TRANSFORM);
                  CURRENT_ANGLE = Math.round(Math.atan2(MATRIX.b, MATRIX.a) * (180 / Math.PI));
               }

               // Determine the new angle based on the current angle
               const NEW_ANGLE = (CURRENT_ANGLE + 90) % 360;

               // Update the style.transform property with the new angle
               SHIP.style.transform = `rotate(${NEW_ANGLE}deg)`;

               // Add/remove the rotated class based on the new angle
               SHIP.classList.toggle("rotated", NEW_ANGLE % 180 !== 0);

               SHIPS_OBJECTS[index].position = NEW_ANGLE % 180 === 0 ? "Horizontal" : "Vertical";
            });
         });
      }
   }

   dragUserShips(USER_GAMEBOARD, SHIPS_ELEMENTS, SHIPS_OBJECTS) {
      const GRID = document.getElementById("user-gameboard");
      const CELLS = Array.from(GRID.children);

      const INSTANCE = this;

      let draggedShip;

      function dragStart(e) {
         draggedShip = e.target;

         SHIPS_ELEMENTS.forEach((SHIP_ELEMENT) => {
            SHIP_ELEMENT.dataset.dragged = "false";
         });

         if (SHIPS_ELEMENTS.includes(draggedShip)) {
            // Add a data attribute to mark the ship as currently dragged
            draggedShip.dataset.dragged = "true";
         } else {
            // Prevent dragging if the ship is already placed
            e.preventDefault();
         }
      }

      function dragOver(e) {
         e.preventDefault();
      }

      function dropShip(e) {
         if (e.target.classList.contains("cell")) {
            const START_ID = e.target.id;
            const INDEX = SHIPS_ELEMENTS.findIndex((element) => element === draggedShip);

            if (INDEX !== -1 && draggedShip.dataset.dragged === "true") {
               const SHIP = SHIPS_OBJECTS[INDEX];
               const [x, y] = START_ID.split("-").slice(-2).map(Number);

               const IS_VALID_PLACEMENT = USER_GAMEBOARD.placeShip(x, y, SHIP);

               if (IS_VALID_PLACEMENT) {
                  SHIPS_OBJECTS.splice(INDEX, 1);
                  SHIPS_ELEMENTS.splice(INDEX, 1);
                  draggedShip.remove();
                  INSTANCE.updateGrid(USER_GAMEBOARD);
                  INSTANCE.displayStartButton(SHIPS_ELEMENTS);
               }
            }

            draggedShip.dataset.dragged = "false";
         }
      }

      SHIPS_ELEMENTS.forEach((SHIP) => SHIP.addEventListener("dragstart", dragStart));
      CELLS.forEach((CELL) => {
         CELL.addEventListener("dragover", dragOver);
         CELL.addEventListener("drop", dropShip);
      });
   }

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

   userAttack(opponent, player) {
      if (!player.isUser || !player.isTurn) return;

      const AI_GAMEBOARD = document.getElementById("ai-gameboard");
      const CELLS = AI_GAMEBOARD.querySelectorAll(".cell");

      return new Promise((resolve, reject) => {
         function cellClickHandler(event) {
            const CLICKED_CELL = event.target;
            if (CLICKED_CELL.classList.contains("hidden-cell")) {
               CLICKED_CELL.classList.remove("hidden-cell");
               const [X, Y] = CLICKED_CELL.id.split("-").slice(-2).map(Number);

               const USER = player;
               USER.isTurn = false;
               const AI = opponent;
               AI.isTurn = true;

               CELLS.forEach((CELL) => {
                  CELL.removeEventListener("click", cellClickHandler);
               });
            }
         }

         CELLS.forEach((CELL) => {
            CELL.addEventListener("click", cellClickHandler);
         });
      });
   }
}

export default Helpers;
