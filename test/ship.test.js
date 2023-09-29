const Ship = require("../dist/ship.js");

const SHIP = new Ship(5);

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
});
