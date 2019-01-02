const fs = require('fs');

const parse = area => area.split('\r\n').map(row => row.split(''));

const print = area => area.reduce((memo, row) => (`${memo}\n${row.join('')}`), '');

const getAdjacentAcres = (area, x, y) => [
  [y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
  [y, x - 1], [y, x + 1],
  [y + 1, x - 1], [y + 1, x], [y + 1, x + 1],
].filter(([ay, ax]) => area[ay] && area[ay][ax]).map(([ay, ax]) => area[ay][ax]);

const changeLandscape = area => area.map((row, y) => row.map((cell, x) => {
  const adjacentAcres = getAdjacentAcres(area, x, y);

  if (cell === '.' && adjacentAcres.filter(acre => acre === '|').length > 2) {
    return '|';
  }
  if (cell === '|' && adjacentAcres.filter(acre => acre === '#').length > 2) {
    return '#';
  }
  if (cell === '#') {
    return (adjacentAcres.find(acre => acre === '#') && adjacentAcres.find(acre => acre === '|')) ? '#' : '.';
  }

  return cell;
}));

const countAcreType = (area, type) => area
  .reduce((memo, row) => memo + row.filter(acre => acre === type).length, 0);

const calculateValue = area => countAcreType(area, '|') * countAcreType(area, '#');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  let area = parse(data);
  const history = [];
  let i = 0;

  while (history.indexOf(print(area)) === -1) {
    history.push(print(area));
    area = changeLandscape(area);
    i++;

    if (i === 10) {
      console.log('part one', calculateValue(area));
    }
  }

  const patternStart = history.indexOf(print(area));
  const offset = patternStart + ((1e9 - i) % (i - patternStart));
  console.log('part two', calculateValue(parse(history[offset])));
});
