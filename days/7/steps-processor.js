const getCost = (step, remaining) => remaining || 60 + (step.charCodeAt(0) - 64);

const costSorter = inProgressMap => (a, b) => getCost(a, inProgressMap[a])
  - getCost(b, inProgressMap[b]);

const costFilter = (inProgressMap, cost, isEquality) => step => getCost(step,
  inProgressMap[step]) === cost === isEquality;

const startableFilter = (dependenciesLeft, inProgress) => step => !Object.keys(dependenciesLeft)
  .includes(step) && !inProgress.includes(step);

const removeDependencies = (dependencies, toRemove) => Object.entries(dependencies)
  .reduce((memo, [step, stepDependencies]) => {
    const remaining = stepDependencies.filter(dependency => !toRemove.includes(dependency));
    return remaining.length ? { ...memo, [step]: remaining } : memo;
  }, {});

module.exports = (steps, initialDependencies, workersLeft) => {
  let result = '';
  let stepsLeft = steps;
  let timeTaken = 0;
  let inProgressMap = {};
  let dependenciesLeft = { ...initialDependencies };

  while (stepsLeft.length) {
    const inProgress = Object.keys(inProgressMap);
    const startable = stepsLeft
      .filter(startableFilter(dependenciesLeft, inProgress))
      .sort(costSorter(inProgressMap));

    const workable = startable.slice(0, Math.min(startable.length, workersLeft - inProgress.length))
      // eslint-disable-next-line no-loop-func
      .concat(inProgress.sort((a, b) => inProgressMap[a] - inProgressMap[b]))
      .sort(costSorter(inProgressMap));
    const lowestWorkableCost = getCost(workable[0], inProgressMap[workable[0]]);

    const completable = workable.filter(costFilter(inProgressMap, lowestWorkableCost, true));
    const lowestCompletableCost = getCost(completable[0], inProgressMap[completable[0]]);

    timeTaken += lowestCompletableCost;
    result += completable.join('');
    inProgressMap = {
      ...workable.filter(costFilter(inProgressMap, lowestWorkableCost, false))
        .reduce((memo, step) => ({ ...memo, [step]: getCost(step) - lowestCompletableCost }), {}),
      ...Object.entries(inProgressMap).reduce((memo, [step, existingRemaining]) => {
        const timeRemaining = existingRemaining - lowestCompletableCost;
        return timeRemaining > 0 ? { ...memo, [step]: timeRemaining } : memo;
      }, {}),
    };
    dependenciesLeft = removeDependencies(dependenciesLeft, completable);
    stepsLeft = steps.filter(step => !result.includes(step)); // eslint-disable-line no-loop-func
  }

  return { result, timeTaken };
};
