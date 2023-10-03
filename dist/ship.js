class Ship {
  constructor(position, type) {
    this.position = position;
    this.type = type;
    this.length = this.assignLength(type);
    this.hitsNum = 0;
    this.sunkState = false;
  }

  hit() {
    this.hitsNum += 1;
  }

  assignLength(type) {
    if (type === "Carrier") {
      this.length = 5;
    } else if (type === "Battleship") {
      this.length = 4;
    } else if (type === "Destroyer" || type === "Submarine") {
      this.length = 3;
    } else if (type === "Patrol boat") {
      this.length = 2;
    }
  }

  isSunk() {
    if (this.hitsNum === this.length) {
      this.sunkState = true;
    }
    return this.sunkState;
  }
}

module.exports = Ship;
