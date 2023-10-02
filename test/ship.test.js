const Ship = require("../dist/ship.js");

const SHIP = new Ship("horizontal", 5);

describe("Ship creation and basic methods", () => {
  it("Create a ship with a custom length", () => {
    expect(SHIP.length).toBe(5);
  });

  it("Check hit method", () => {
    SHIP.hit();
    expect(SHIP.hitsNum).toBe(1);
  });

  it("Check isSunk method", () => {
    SHIP.isSunk();
    expect(SHIP.sunkState).toBe(false);
  });

  it("Check that isSunk really checks for a sunk ship", () => {
    const SHIP2 = new Ship("horizontal", 1);
    SHIP2.hit();
    SHIP2.isSunk();
    expect(SHIP2.sunkState).toBe(true);
  });
});
