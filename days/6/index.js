const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const MAX_DISTANCE = 80;

  const coordinates = data.split('\r\n')
    .map((item, index) => {
      const [x, y] = item.split(', ');
      return {
        id: String.fromCharCode(65 + index),
        x,
        y,
      };
    });

  const calculateDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const grid = coordinates.reduce((memo, coord) => ({
    ...memo,
    [`${coord.x},${coord.y}`]: { closestCoords: [coord.id], distance: 0 },
  }), {});

  for (let distance = 1; distance < MAX_DISTANCE; distance++) {
    coordinates.forEach((coord) => {
      for (let row = 0; row < (distance * 2 + 1); row++) {
        for (let col = 0; col < (distance * 2 + 1); col++) {
          const x = coord.x - distance + row;
          const y = coord.y - distance + col;
          const position = grid[`${x},${y}`];

          if (calculateDistance(coord, { x, y }) === distance) {
            if (position && distance === position.distance) {
              grid[`${x},${y}`] = { closestCoords: [...position.closestCoords, coord.id], distance };
            } else if (!position) {
              grid[`${x},${y}`] = { closestCoords: [coord.id], distance };
            }
          }
        }
      }
    });
  }

  const largestFiniteAreas = coordinates.filter(coord => Object.values(grid)
    .filter(value => value.closestCoords.length === 1 && value.closestCoords.includes(coord.id))
    .every(value => value.distance < MAX_DISTANCE - 1))
    .map(coord => Object.values(grid)
      .filter(value => value.closestCoords.length === 1 && value.closestCoords.includes(coord.id))
      .length).sort();

  console.log('largest finite area', largestFiniteAreas[0]);

  const points = Object.keys(grid)
    .map((key) => {
      const [x, y] = key.split(',');
      return coordinates.reduce((memo, coord) => memo + calculateDistance(coord, { x, y }), 0);
    })
    .filter(point => point < 10000)
    .sort((a, b) => a - b);

  console.log('region with closest neighbours', points.length);
});
