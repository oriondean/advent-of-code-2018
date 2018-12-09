module.exports = (marbleCount, playerCount) => [...Array(marbleCount)]
  .map((v, i) => i)
  .slice(1)
  .reduce((memo, marble) => {
    if (marble % 23 === 0) {
      const index = (memo.index + (memo.circle.length - 7)) % memo.circle.length;
      const scoreIndex = marble % memo.scores.length;

      return {
        circle: [...memo.circle.slice(0, index), ...memo.circle.slice(index + 1)],
        index,
        scores: [
          ...memo.scores.slice(0, scoreIndex),
          memo.scores[scoreIndex] + marble + memo.circle[index],
          ...memo.scores.slice(scoreIndex + 1),
        ],
      };
    }

    const newIndex = ((memo.index + 1) % memo.circle.length) + 1;
    const circle = [...memo.circle.slice(0, newIndex), marble, ...memo.circle.slice(newIndex)];

    return {
      circle,
      index: newIndex || 0,
      scores: memo.scores,
    };
  }, { scores: [...Array(playerCount)].map(() => 0), circle: [0], index: 0 });
