const fs = require('fs');

const parsePoint = require('./point-parser');
const calculateBounds = require('./bounds-calculator');

const calculateDivergeDistance = (points) => {
  const bounds = calculateBounds(points, 0);
  return bounds.maxY - bounds.minY;
};

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  let points = data.split('\r\n')
    .map(parsePoint);

  const minDivergeDistance = 10;
  let iterations = 0;

  while (calculateDivergeDistance(points) > minDivergeDistance) {
    points = points.map(point => ({ ...point, x: point.x + point.dx, y: point.y + point.dy }));
    iterations++;
  }

  const bounds = calculateBounds(points, 2);

  for (let col = bounds.minY; col < bounds.maxY; col++) {
    console.log([...Array(bounds.maxX - bounds.minX)].reduce((memo, value, index) => (
      memo + (points.find(toFind => toFind.x === (bounds.minX + index) && toFind.y === col) ? '#' : '.')
    ), ''));
  }

  console.log('part two, iterations to diverge', iterations);
});
