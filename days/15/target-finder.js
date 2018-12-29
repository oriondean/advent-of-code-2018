const squares = require('./squares');

module.exports = (self, enemies) => {
  const adjacentSquares = squares.getAdjacent(self.x, self.y);
  return enemies.filter(e => adjacentSquares.find(([x, y]) => e.x === x && e.y === y && e.hp > 0))
    .sort((a, b) => {
      if (a.hp === b.hp) {
        return a.y === b.y ? a.x - b.x : a.y - b.y;
      }
      return a.hp - b.hp;
    })[0];
};
