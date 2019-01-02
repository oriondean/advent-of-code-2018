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

  while (instructions[pointerValue]) {
    register[pointer] = pointerValue;
    register = opcodes[instructions[pointerValue].code](register,
      ...instructions[pointerValue].args);
    pointerValue = register[pointer];
    pointerValue += 1;
  }

  console.log('part one', register[0]);

  // figure out it's just working out whole numbers divisible by some large amount in reg[4]
  // has an inner and outer loop, inner loop iterates reg[1], outer loop increments reg[3] by 1
  // once reg[1] * reg[3] === reg[4] then divisible number found and
  // next loop can begin  until reg[3] > reg[4]
  console.log('part two', 18200448);
});
