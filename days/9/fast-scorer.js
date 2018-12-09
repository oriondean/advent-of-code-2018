module.exports = (marbleCount, playerCount) => {
  const scores = [...Array(playerCount)].map(() => 0);

  let currentMarble = { value: 0, next: null, previous: null };
  currentMarble.next = currentMarble;
  currentMarble.previous = currentMarble;

  for (let value = 1; value < marbleCount; value++) {
    if (value % 23 === 0) {
      const scoreIndex = value % scores.length;

      const scorableMarble = currentMarble.previous.previous.previous.previous
        .previous.previous.previous;
      currentMarble = scorableMarble.next;
      scorableMarble.previous.next = scorableMarble.next;
      scorableMarble.next.previous = scorableMarble.previous;

      scores[scoreIndex] += value + scorableMarble.value;
    } else {
      const newMarble = { value, previous: currentMarble.next, next: currentMarble.next.next };
      currentMarble.next.next.previous = newMarble;
      currentMarble.next.next = newMarble;
      currentMarble = newMarble;
    }
  }

  return { scores };
};
