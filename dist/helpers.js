import Ship from "./ship.js";
import AiAttackHandler from "./aiAttackHandler.js";
import AiShipPlacer from "./aiShipPlacer.js";

class Helpers {
   constructor() {
      this.SHIPS_OBJECTS = this.createShipObjects();
      this.SHIPS_ELEMENTS = this.selectShipsElements();
      this.USER_NAME = "";
      this.USER = "";
      this.AI = "";
      this.USER_GAMEBOARD = "";
      this.AI_GAMEBOARD = "";
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

   createGrid(gameboard, player) {
      const GRID = document.createElement("div");
      GRID.classList.add("grid");

      GRID.setAttribute("id", player.isUser ? "user-grid" : "ai-grid");

      for (let x = 0; x < gameboard.width; x += 1) {
         for (let y = 0; y < gameboard.height; y += 1) {
            const CELL = document.createElement("div");
            CELL.classList.add("cell");
            CELL.textContent = gameboard.grid[x][y];

            if (!player.isUser) {
               CELL.classList.add("hidden-cell");
            }

            const CELL_ID = player.isUser ? `user-cell-${x}-${y}` : `ai-cell-${x}-${y}`;
            CELL.setAttribute("id", CELL_ID);
            GRID.appendChild(CELL);
         }
      }

      return GRID;
   }

   displayGrid(grid, player) {
      const CONTAINER = player.isUser ? document.getElementById("positioning-container") : document.getElementById("ai-container");
      CONTAINER.appendChild(grid);
   }

   updateUserGrid(USER_GAMEBOARD) {
      const GRID = document.getElementById("user-grid");

      Array.from(GRID.children).forEach((cell) => {
         const [x, y] = cell.id.split("-").slice(-2).map(Number);
         const shipSymbol = USER_GAMEBOARD.grid[x][y];

         if ("CBDSP".includes(shipSymbol)) {
            cell.classList.toggle("occupied", true);
         } else {
            cell.classList.remove("occupied");
         }
      });
   }

   storeGameData(user, ai, userGameboard, aiGameboard) {
      this.USER = user;
      this.AI = ai;
      this.USER_GAMEBOARD = userGameboard;
      this.AI_GAMEBOARD = aiGameboard;
      this.getUserName();
   }

   getUserName() {
      const FORM_BUTTON = document.getElementById("create-player");
      FORM_BUTTON.addEventListener("click", () => {
         const INPUT_VALUE = document.getElementById("name-field").value;
         this.USER_NAME = INPUT_VALUE;

         this.creatAndDisplayGrids();
      });
   }

   creatAndDisplayGrids() {
      const AI_SHIP_PLACER = new AiShipPlacer();
      AI_SHIP_PLACER.autoPlaceShips(this.AI_GAMEBOARD);

      const USER_GRID = this.createGrid(this.USER_GAMEBOARD, this.USER);
      const AI_GRID = this.createGrid(this.AI_GAMEBOARD, this.AI);

      this.displayGrid(USER_GRID, this.USER);
      this.displayGrid(AI_GRID, this.AI);

      this.transitionToUserShipPlacement();
   }

   transitionToUserShipPlacement() {
      const MAIN_MENU = document.querySelector(".main-menu");
      const USER_MENU_BACKGROUND = document.querySelector(".user-menu-background");

      MAIN_MENU.remove();
      USER_MENU_BACKGROUND.classList.remove("hidden");

      this.dragUserShips(this.USER_GAMEBOARD, this.SHIPS_ELEMENTS, this.SHIPS_OBJECTS);
      this.rotateUserShips(this.SHIPS_ELEMENTS, this.SHIPS_OBJECTS);
   }

   allowStartButton() {
      const START_BUTTON = document.querySelector(".start-button");
      START_BUTTON.classList.add("allowed");
      START_BUTTON.addEventListener("click", this.runGameLoop.bind(this));
   }

   appendFinalGrid() {
      const GRID = document.getElementById("user-grid");
      const USER_CONTAINER = document.getElementById("user-container");

      USER_CONTAINER.appendChild(GRID);
   }

   startGame() {
      return new Promise((resolve, reject) => {
         const USER_MENU_BACKGROUND = document.querySelector(".user-menu-background");
         const MAIN_GAME = document.querySelector(".main-game");

         if (!USER_MENU_BACKGROUND || !MAIN_GAME) {
            // Reject if elements are not found
            reject(new Error("Game start failed. Required elements not found."));
         }

         this.appendFinalGrid();

         USER_MENU_BACKGROUND.remove();
         MAIN_GAME.classList.remove("hidden");

         resolve();
      });
   }

   announceWinner() {
      const MAIN_GAME = document.querySelector(".main-game");

      const WINNER_ANNOUNCEMENT_CONTAINER = document.createElement("div");
      WINNER_ANNOUNCEMENT_CONTAINER.classList.add("winner-container");

      const WINNER_MESSAGE = document.createElement("span");
      WINNER_MESSAGE.classList.add("winner-message");

      const RESTART_BUTTON = document.createElement("button");
      RESTART_BUTTON.textContent = "RESTART GAME";
      RESTART_BUTTON.classList.add("restart-button");

      WINNER_ANNOUNCEMENT_CONTAINER.appendChild(WINNER_MESSAGE);
      WINNER_ANNOUNCEMENT_CONTAINER.appendChild(RESTART_BUTTON);

      MAIN_GAME.appendChild(WINNER_ANNOUNCEMENT_CONTAINER);

      return WINNER_ANNOUNCEMENT_CONTAINER;
   }

   restartGame() {
      location.reload();
   }

   async runGameLoop() {
      await this.startGame();
      const AI_ATTACK_HANDLER = new AiAttackHandler();

      const gameLoop = setInterval(async () => {
         if (this.USER.isTurn) {
            const PREVIOUS_SHOTS = this.AI_GAMEBOARD.missedShots;
            const RESULT = await this.userAttack(this.AI, this.USER, this.AI_GAMEBOARD);
            const X = RESULT[0];
            const Y = RESULT[1];
            this.updateAttackedCell(this.AI_GAMEBOARD, this.AI, PREVIOUS_SHOTS, X, Y);
         } else if (this.AI.isTurn) {
            const PREVIOUS_SHOTS = this.USER_GAMEBOARD.missedShots;
            const RESULT = await AI_ATTACK_HANDLER.strategicAttack(this.USER_GAMEBOARD, this.USER, this.AI);
            const X = RESULT[0];
            const Y = RESULT[1];
            this.updateAttackedCell(this.USER_GAMEBOARD, this.USER, PREVIOUS_SHOTS, X, Y);
         }

         if (this.USER_GAMEBOARD.areAllSunk) {
            const WINNER_ANNOUNCEMENT_CONTAINER = this.announceWinner();
            const WINNER_MESSAGE = WINNER_ANNOUNCEMENT_CONTAINER.querySelector(".winner-message");
            const RESTART_BUTTON = WINNER_ANNOUNCEMENT_CONTAINER.querySelector(".restart-button");

            WINNER_MESSAGE.innerText = "Congratulations AI, you won the match!";

            clearInterval(gameLoop);

            RESTART_BUTTON.addEventListener("click", this.restartGame.bind(this));
         } else if (this.AI_GAMEBOARD.areAllSunk) {
            const WINNER_ANNOUNCEMENT_CONTAINER = this.announceWinner();
            const WINNER_MESSAGE = WINNER_ANNOUNCEMENT_CONTAINER.querySelector(".winner-message");
            const RESTART_BUTTON = WINNER_ANNOUNCEMENT_CONTAINER.querySelector(".restart-button");

            WINNER_MESSAGE.innerText = `Congratulations ${this.USER_NAME}, you won the match!`;

            clearInterval(gameLoop);

            RESTART_BUTTON.addEventListener("click", this.restartGame.bind(this));
         }
      }, 1000);
   }

   rotateUserShips(SHIPS_ELEMENTS, SHIPS_OBJECTS) {
      const ROTATE_BUTTON = document.querySelector(".rotate-button");

      if (SHIPS_ELEMENTS.length > 0 && SHIPS_OBJECTS.length > 0) {
         ROTATE_BUTTON.addEventListener("click", () => {
            SHIPS_ELEMENTS.forEach((SHIP_ELEMENT, index) => {
               const SHIP = SHIP_ELEMENT;
               const SHIPS_OBJS = SHIPS_OBJECTS;
               const CURRENT_TRANSFORM = getComputedStyle(SHIP).transform;
               let CURRENT_ANGLE = 0;

               // Extract the current rotation angle from the transform property
               if (CURRENT_TRANSFORM) {
                  const MATRIX = new DOMMatrix(CURRENT_TRANSFORM);
                  CURRENT_ANGLE = Math.round(Math.atan2(MATRIX.b, MATRIX.a) * (180 / Math.PI));
               }

               const NEW_ANGLE = CURRENT_ANGLE === 0 ? 90 : 0;

               SHIP.style.transform = `rotate(${NEW_ANGLE}deg)`;

               SHIP.classList.toggle("rotated", NEW_ANGLE !== 0);

               SHIPS_OBJS[index].position = NEW_ANGLE === 0 ? "Horizontal" : "Vertical";
            });
         });
      }
   }

   dragUserShips(USER_GAMEBOARD, SHIPS_ELEMENTS, SHIPS_OBJECTS) {
      const GRID = document.getElementById("user-grid");
      const CELLS = Array.from(GRID.children);

      const INSTANCE = this;

      let draggedShip;

      function dragStart(e) {
         draggedShip = e.target;

         SHIPS_ELEMENTS.forEach((SHIP_ELEMENT) => {
            SHIP_ELEMENT.dataset.dragged = "false";
         });

         if (INSTANCE.isDraggableShip(draggedShip)) {
            draggedShip.dataset.dragged = "true";
         } else {
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
                  INSTANCE.updateUserGrid(USER_GAMEBOARD);
                  if (SHIPS_ELEMENTS.length <= 0) {
                     INSTANCE.allowStartButton();
                  }
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

   isDraggableShip(shipElement) {
      return shipElement.draggable;
   }

   updateAttackedCell(gameboard, player, PREVIOUS_SHOTS, X, Y) {
      const CELL_ID = player.isUser ? `user-cell-${X}-${Y}` : `ai-cell-${X}-${Y}`;
      const CELL = document.querySelector(`#${CELL_ID}`);

      if (gameboard.missedShots > PREVIOUS_SHOTS) {
         this.updateMissedCell(CELL);
      } else {
         this.updateHitCell(CELL);
      }
   }

   updateMissedCell(cell) {
      const CELL = cell;
      CELL.classList.remove("hidden-cell");
      CELL.textContent = "O";
      CELL.classList.add("empty-cell");
   }

   updateHitCell(cell) {
      const CELL = cell;
      CELL.classList.remove("hidden-cell");

      if (CELL.classList.contains("occupied")) {
         CELL.classList.remove("occupied");
      }

      CELL.textContent = "X";
      CELL.classList.add("hit-cell");
   }

   userAttack(opponent, player, gameboard) {
      if (!player.isUser || !player.isTurn) {
         return Promise.reject(new Error("Invalid user attack."));
      }

      const AI_GRID = document.getElementById("ai-grid");
      const CELLS = AI_GRID.querySelectorAll(".cell");

      return new Promise((resolve) => {
         function cellClickHandler(event) {
            const CLICKED_CELL = event.target;
            if (CLICKED_CELL.classList.contains("hidden-cell")) {
               CLICKED_CELL.classList.remove("hidden-cell");
               const [X, Y] = CLICKED_CELL.id.split("-").slice(-2).map(Number);

               const USER = player;
               USER.isTurn = false;

               const AI = opponent;
               AI.isTurn = true;

               const AI_GAMEBOARD = gameboard;
               AI_GAMEBOARD.receiveAttack(X, Y);

               CELLS.forEach((CELL) => {
                  CELL.removeEventListener("click", cellClickHandler);
               });

               // Resolve the promise with the result
               resolve([X, Y]);
            }
         }

         CELLS.forEach((CELL) => {
            CELL.addEventListener("click", cellClickHandler);
         });
      });
   }
}

export default Helpers;
