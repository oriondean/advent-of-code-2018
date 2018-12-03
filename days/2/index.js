const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const ids = data.split('\r\n');

  const parsed = ids.map(id => id.split('').reduce((memo, char) => ({
    ...memo,
    [char]: memo[char] ? memo[char] + 1 : 1,
  }), {})).map(id => ({
    hasDuplicatedLetter: !!~Object.values(id).indexOf(2),
    hasTriplicatedLetter: !!~Object.values(id).indexOf(3),
  }));

  // Part one
  const result = parsed.filter(id => id.hasDuplicatedLetter).length
    * ids.filter(id => id.hasTriplicatedLetter).length;
  console.log(result);

  // Part two
  ids.forEach(id => ids.forEach((other) => {
    if (id.split('').reduce((memo, char, index) => (char === other[index] ? memo + 1 : memo), 0) === id.length - 1) {
      console.log(id, other);
    }
  }));
});
