class Ship {
  constructor(length) {
    this.length = length;
    this.hitsNum = 0;
    this.sunkState = false;
  }

  hit() {
    return this.hitsNum + 1;
  }

  isSunk() {
    if (this.hitsNum !== this.length) {
        return this.sunkState;
    } (this.hitsNum === this.length) {
      this.sunkState = true;
      return this.sunkState;
    }
  }
}

module.exports = Ship;
