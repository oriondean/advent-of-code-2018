module.exports = elfAttackPower => (char, x, y) => ({
  char,
  x,
  y,
  enemy: char === 'E' ? 'G' : 'E',
  ap: char === 'E' ? elfAttackPower : 3,
  hp: 200,
});
