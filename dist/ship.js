class Ship {
    constructor(length) {
        this.length = length;
        this.hitsNum = 0;
        this.isSunk = false;
    }

    hit() {
        return this.hitsNum + 1;
    }

    isSunk() {
        if (this.hitsNum === this.length) {
            return this.isSunk = true;
        }
    }
}

module.exports = Ship;