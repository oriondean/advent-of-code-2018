const fs = require('fs');

const opcodes = require('./operation-codes')();

const parseValue = (toParse, index) => {
  if (index === 1) {
    return toParse.split(' ').map(Number);
  }
  return JSON.parse(toParse.split(index === 0 ? 'Before: ' : 'After: ')[1]);
};

fs.readFile('./input.txt', 'utf-8', (err, samplesData) => {
  const samples = samplesData.split('\r\n').reduce((memo, line, i) => {
    if (i % 4 < 3) {
      const index = Math.floor(i / 4);
      const key = ['before', 'arguments', 'after'][i % 4];

      return memo.slice(0, index)
        .concat({ ...memo[index], [key]: parseValue(line, i % 4) })
        .concat(...memo.slice(index + 1));
    }
    return memo;
  }, []);

  const matched = samples.map(sample => ({
    matching: opcodes.filter(opcode => String(
      Object.values(opcode.execute(sample.before, ...sample.arguments.slice(1))),
    ) === String(sample.after)),
    id: sample.arguments[0],
  }));

  console.log('part one', matched.filter(match => match.matching.length > 2).length);

  const opcodeById = [...Array(opcodes.length + 1).fill(0)].reduce((memo) => {
    const singleMatch = matched.map(({ id, matching }) => ({
      id,
      matching: matching
        .filter(opcode => Object.values(memo).every(code => code.name !== opcode.name)),
    })).filter(match => match.matching.length === 1)[0];

    return {
      ...memo,
      [singleMatch.id]: opcodes.find(opcode => opcode.name === singleMatch.matching[0].name),
    };
  });

  fs.readFile('./input2.txt', 'utf-8', (err2, programData) => {
    const initialRegister = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    };

    const partTwo = programData.split('\r\n')
      .map(line => line.split(' ').map(Number))
      .reduce((memo, [id, ...args]) => opcodeById[id].execute(memo, ...args), initialRegister);

    console.log('part two', partTwo[0]);
  });
});
