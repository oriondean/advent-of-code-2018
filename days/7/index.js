const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const stepDependencies = data.split('\r\n')
    .reduce((memo, item) => {
      const [dependency, step] = /Step (\w) must be finished before step (\w) can begin\./.exec(item).slice(1);

      return {
        ...memo,
        [step]: memo[step] ? [...memo[step], dependency] : [dependency],
      };
    }, {});

  const steps = Object.entries(stepDependencies)
    .reduce((memo, [key, value]) => [...new Set([...memo, ...key, ...value])], [])
    .sort();

  const output = steps.reduce((memo) => {
    const nextStep = memo.remainingSteps
      .find(step => !Object.keys(memo.stepDependencies).includes(step));

    return {
      remainingSteps: memo.remainingSteps.filter(step => step !== nextStep),
      result: memo.result + nextStep,
      stepDependencies: Object.entries(memo.stepDependencies)
        .reduce((innerMemo, [step, dependencies]) => {
          const remainingDependencies = dependencies.filter(dependency => dependency !== nextStep);
          return remainingDependencies.length
            ? { ...innerMemo, [step]: remainingDependencies } : innerMemo;
        }, {}),
    };
  }, { result: '', stepDependencies, remainingSteps: steps });

  console.log(output.result);
});
