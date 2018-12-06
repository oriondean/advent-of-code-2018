const fs = require('fs');

const isReaction = (a, b) => a.toLowerCase() === b.toLowerCase() && a !== b;

const collapse = (polymer) => {
  let previousResult = '';
  let result = polymer;

  while (previousResult.length !== result.length) {
    previousResult = result;
    result = result.split('')
      .reduce((memo, char) => (isReaction(char, memo.substr(-1))
        ? memo.substr(0, memo.length - 1) : memo + char), '');
  }

  return result;
};

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const uniqueCharacters = Object.keys(data.split('')
    .reduce((memo, char) => ({ ...memo, [char.toLowerCase()]: true }), {}));

  const [shortestPolymer] = uniqueCharacters.map(char => ({
    char,
    polymerLength: collapse(data.replace(new RegExp(char, 'gi'), '')).length,
  }))
    .sort((a, b) => a.polymerLength - b.polymerLength);

  console.log('part one', collapse(data).length);
  console.log('part two', shortestPolymer);
});
