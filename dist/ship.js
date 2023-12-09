class Ship {
   constructor(position, type) {
      this.position = position;
      this.type = type;
      this.length = Ship.assignLength(type);
      this.hitsNum = 0;
      this.sunkState = this.isSunk();
   }

   hit() {
      this.hitsNum += 1;
      this.sunkState = this.isSunk();
   }

   static assignLength(type) {
      switch (type) {
         case "Carrier":
            return 5;
         case "Battleship":
            return 4;
         case "Destroyer":
         case "Submarine":
            return 3;
         case "Patrolboat":
            return 2;
         default:
            throw new Error(`Unknown ship type: ${type}`);
      }
   }

   isSunk() {
      return this.hitsNum >= this.length;
   }
}

export default Ship;
