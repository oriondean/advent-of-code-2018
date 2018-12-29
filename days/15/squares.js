const getAdjacent = (x, y) => [
  [x, y - 1], [x + 1, y],
  [x, y + 1], [x - 1, y],
];

const getAdjacentOpen = (map, x, y) => getAdjacent(x, y)
  .filter(([x1, y1]) => map[`${x1},${y1}`] && map[`${x1},${y1}`] === '.');

const getAdjacentEnemy = (map, enemies) => enemies
  .reduce((memo, unit) => memo.concat(getAdjacentOpen(map, unit.x, unit.y)), []);

module.exports = {
  getAdjacent,
  getAdjacentOpen,
  getAdjacentEnemy,
};
