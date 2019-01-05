const fs = require('fs');

const opcodes = require('../common/operation-codes')()
  .reduce((memo, opcode) => ({ ...memo, [opcode.name]: opcode.execute }), {});

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const [rawPointer, ...rawInstructions] = data.split('\r\n');

  const instructions = rawInstructions.map((instruction) => {
    const [code, ...args] = instruction.split(' ');
    return { code, args: args.map(Number) };
  });

  const pointer = Number(rawPointer.split(' ')[1]);
  let pointerValue = 0;
  let register = [0, 0, 0, 0, 0, 0];

  const seen = [];

  while (instructions[pointerValue]) {
    register[pointer] = pointerValue;
    register = opcodes[instructions[pointerValue].code](register,
      ...instructions[pointerValue].args);
    pointerValue = register[pointer];
    pointerValue += 1;

    if (pointerValue === 28) {
      if (seen.length === 0) {
        console.log('part one', register[3]);
      }

      if (~seen.indexOf(register[3])) {
        console.log('part two', seen[seen.length - 1]);
        break;
      }

      seen.push(register[3]);
    }
  }
});
