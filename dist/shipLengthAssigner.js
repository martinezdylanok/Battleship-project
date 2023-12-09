class shipLengthAssigner {
   static assignShipLength(type) {
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
}

export default shipLengthAssigner;
