import Player from "../dist/player";

describe("Player class tests", () => {
   it("Should create a Player object with the specified name", () => {
      const PLAYER = new Player("Alice");
      expect(PLAYER.name).toBe("Alice");
   });
});
