module.exports = (minutesAsleep, start, end) => [...Array(end - start)]
  .map((_, i) => start + i)
  .reduce((memo, now) => ({
    ...memo,
    [now]: memo[now] ? memo[now] + 1 : 1,
  }), minutesAsleep);
