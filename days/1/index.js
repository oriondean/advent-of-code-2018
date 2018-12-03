const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const frequencies = data.split('\r\n').map(frequency => Number(frequency));

  // Part one
  console.log('frequency', frequencies.reduce((memo, frequency) => memo + frequency, 0));

  // Part two
  const history = [];
  let index = 0;
  let frequency = 0;

  while (!~history.indexOf(frequency)) {
    history.push(frequency);
    frequency += frequencies[index];
    index = (index + 1) % frequencies.length;
  }

  console.log('first frequency seen twice', frequency);
});
