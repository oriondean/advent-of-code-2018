module.exports = (memo, item) => {
  const [dependency, step] = /Step (\w) must be finished before step (\w) can begin\./.exec(item).slice(1);

  return {
    ...memo,
    [step]: memo[step] ? [...memo[step], dependency] : [dependency],
  };
};
