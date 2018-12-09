const slowScorer = require('./slow-scorer');
const fastScorer = require('./fast-scorer');

const playerCount = 416;
const marbleCount = 71617;

const slow = slowScorer(marbleCount, playerCount);
console.log('part one', slow.scores.sort((a, b) => b - a)[0]);

const fast = fastScorer(marbleCount * 100, playerCount);
console.log('part two', fast.scores.sort((a, b) => b - a)[0]);
