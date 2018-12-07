const fs = require('fs');
const parseDependency = require('./dependency-parser');
const processSteps = require('./steps-processor');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const stepDependencies = data.split('\r\n')
    .reduce(parseDependency, {});

  const steps = Object.entries(stepDependencies)
    .reduce((memo, [key, value]) => [...new Set([...memo, ...key, ...value])], [])
    .sort();

  console.log('part one', processSteps(steps, stepDependencies, 1));
  console.log('part two', processSteps(steps, stepDependencies, 5));
});
