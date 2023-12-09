import shipLengthAssigner from "./shipLengthAssigner.js";

class Ship {
   constructor(position, type) {
      this.position = position;
      this.type = type;
      this.length = shipLengthAssigner.assignShipLength(type);
      this.hitsNum = 0;
      this.sunkState = this.isSunk();
   }

   hit() {
      this.hitsNum += 1;
      this.sunkState = this.isSunk();
   }

   isSunk() {
      return this.hitsNum >= this.length;
   }
}

export default Ship;
