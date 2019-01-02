const fs = require('fs');

const parseVeins = require('./vein-parser');
const trickle = require('./trickler');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const veins = parseVeins(data);

  const xValues = veins.reduce((memo, vein) => memo.concat(vein.x), []).sort((a, b) => a - b);
  const [xMin, xMax] = [xValues[0] - 1, xValues[xValues.length - 1] + 1];

  const yValues = veins.reduce((memo, vein) => memo.concat(vein.y), []).sort((a, b) => a - b);
  const [yMin, yMax] = [yValues[0] - 1, yValues[yValues.length - 1] + 1];

  const map = Array(yMax - yMin).fill('.')
    .map(() => Array((xMax + 1) - xMin).fill('.'));

  veins.forEach((vein) => {
    if (Array.isArray(vein.x)) {
      vein.x.forEach((x) => { map[vein.y - yMin][x - xMin] = '#'; });
    } else {
      vein.y.forEach((y) => { map[y - yMin][vein.x - xMin] = '#'; });
    }
  });

  trickle(map, [1, 500 - xMin]);

  console.log('part one',
    map.reduce((memo, row) => memo + row.filter(cell => cell === '|' || cell === '~').length, 0), 38021);

  console.log('part two',
    map.reduce((memo, row) => memo + row.filter(cell => cell === '~').length, 0), 32069);
});
