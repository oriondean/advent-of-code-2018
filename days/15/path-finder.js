const squares = require('./squares');
const tracePath = require('./path-tracer');
const readingOrder = require('./reading-order-sorter');

const getPreviousSteps = (map, x, y, distance) => squares.getAdjacent(x, y)
  .filter(([x1, y1]) => map[`${x1},${y1}`] && map[`${x1},${y1}`].distance === distance);

const parseKey = key => key.split(',').map(Number);

module.exports = (map, x, y, targets) => {
  let neighbours = [`${x},${y}`];
  let distance = 0;
  let foundSquares = [];
  const seen = {};
  seen[`${x},${y}`] = { distance: 0, paths: [] };

  while (neighbours.length > 0 && foundSquares.length === 0) {
    neighbours = neighbours.reduce((memo, neighbour) => {
      const [nx, ny] = parseKey(neighbour);
      memo.push(...squares.getAdjacentOpen(map, nx, ny).map(([x1, y1]) => `${x1},${y1}`));
      return memo; // modify instance for performance improvement
    }, [])
      .filter(neighbour => !seen[neighbour]);
    neighbours = [...new Set(neighbours)];

    neighbours.forEach((neighbour) => { // eslint-disable-line no-loop-func
      if (!seen[neighbour]) {
        const [nx, ny] = parseKey(neighbour);
        seen[neighbour] = {
          distance: distance + 1,
          paths: getPreviousSteps(seen, nx, ny, distance),
        };
      }
    });

    foundSquares = neighbours.filter((neighbour) => {
      const [nx, ny] = parseKey(neighbour);
      return targets.find(([sx, sy]) => sx === nx && sy === ny);
    });
    distance++;
  }

  const targetFound = foundSquares.map(parseKey).sort(readingOrder)[0];
  return targetFound ? tracePath(seen, targetFound).sort(readingOrder)[0] : null;
};
