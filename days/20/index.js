const fs = require('fs');

const visit = require('./route-visitor');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const result = Object.values(visit({}, data.slice(1, -1), [0, 0], 0).map)
    .filter(room => room > 999)
    .sort((a, b) => b - a);

  console.log('part one', result[0]);
  console.log('part two', result.length);
});
