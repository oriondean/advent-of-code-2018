const fs = require('fs');

const createPot = (index, value = '.') => ({ index, value });

const padState = (state) => {
  let result = state;

  const { index: firstIndex, value: firstValue } = state[0];
  const { index: lastIndex, value: lastValue } = state[state.length - 1];

  if (firstValue === '#') {
    result = [createPot(firstIndex - 2), createPot(firstIndex - 1), ...result];
  } else if (firstValue === '.' && state[1].value === '#') {
    result = [{ index: firstIndex - 1, value: '.' }, ...result];
  }

  if (lastValue === '#') {
    result = [...result, createPot(lastIndex + 1)];
  } else if (lastValue === '#' && state[state.length - 2].value === '.') {
    result = [...result, createPot(lastIndex + 1), createPot(lastIndex + 2)];
  }

  return result;
};

const buildPattern = (state, i) => (state[i - 2] ? state[i - 2].value : '.')
  + (state[i - 1] ? state[i - 1].value : '.') + state[i].value
  + (state[i + 1] ? state[i + 1].value : '.') + (state[i + 2] ? state[i + 2].value : '.');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const [rawState, , ...rawPatterns] = data.split('\r\n');

  const patterns = rawPatterns.map((rawPattern) => {
    const [matcher, output] = rawPattern.split(' => ');
    return { matcher, output };
  });

  let state = rawState.slice(15).split('').map((value, index) => ({ index, value }));
  let current = 0;
  let last = 0;
  let lastDiff = NaN;
  let currentDiff = NaN;
  let iterations = 0;

  while (lastDiff !== currentDiff) {
    lastDiff = Math.abs(current - last);
    last = current;

    // eslint-disable-next-line no-loop-func
    state = state.map((pot, index) => {
      const toMatch = buildPattern(state, index);
      const matchingPattern = patterns.find(pattern => pattern.matcher === toMatch);

      return matchingPattern ? createPot(pot.index, matchingPattern.output)
        : createPot(pot.index, '.');
    });
    state = padState(state);

    current = state.reduce((memo, item) => memo + (item.value === '#' ? item.index : 0), 0);
    currentDiff = Math.abs(current - last);
    iterations++;

    if (iterations === 20) {
      console.log('part one', current);
    }
  }

  console.log('part two', current + (currentDiff * (50000000000 - iterations)));
});
