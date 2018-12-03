const fs = require('fs');
const parseClaim = require('./claim-parser');
const scanClaimRegion = require('./claim-region-scanner');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const grid = {};

  const claims = data.split('\r\n').map(parseClaim);

  claims.forEach(claim => scanClaimRegion(claim, (row, col) => {
    grid[`${row},${col}`] = grid[`${row},${col}`] ? grid[`${row},${col}`] + 1 : 1;
  }));

  // Part One
  console.log(Object.values(grid).filter(value => value > 1).length);

  // Part Two
  console.log(claims.find(claim => scanClaimRegion(claim,
    (row, col) => (grid[`${row},${col}`] > 1 ? false : undefined))));
});
