class Ship {
  constructor(position, length) {
    this.postion = position;
    this.length = length;
    this.hitsNum = 0;
    this.sunkState = false;
  }

  hit() {
    this.hitsNum += 1;
  }

  isSunk() {
    if (this.hitsNum === this.length) {
      this.sunkState = true;
    }
    return this.sunkState;
  }
}

module.exports = Ship;
