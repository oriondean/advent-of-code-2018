const slowScorer = require('./slow-scorer');

const playerCount = 416;
const marbleCount = 71617;

const result = slowScorer(marbleCount, playerCount);
console.log('result', result.scores.sort((a, b) => b - a)[0]);
