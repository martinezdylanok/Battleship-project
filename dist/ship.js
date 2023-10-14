class Ship {
   constructor(position, type) {
      this.position = position;
      this.type = type;
      this.length = this.assignLength(type);
      this.hitsNum = 0;
      this.sunkState = this.isSunk();
   }

   hit() {
      this.hitsNum += 1;
      this.sunkState = this.isSunk();
   }

   assignLength(type) {
      if (type === "Carrier") {
         return 5;
      }
      if (type === "Battleship") {
         return 4;
      }
      if (type === "Destroyer" || type === "Submarine") {
         return 3;
      }
      if (type === "Patrolboat") {
         return 2;
      }
   }

   isSunk() {
      if (this.hitsNum >= this.length) {
         return true;
      }
      return false;
   }
}

export default Ship;
