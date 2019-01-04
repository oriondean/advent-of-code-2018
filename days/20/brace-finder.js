module.exports = (string) => {
  const chars = string.split('');
  let nestingLevel = -1;
  let index = 0;

  while ((chars[index] !== ')' || nestingLevel > 0) && index < string.length) {
    if (chars[index] === '(') {
      nestingLevel++;
    } else if (chars[index] === ')') {
      nestingLevel--;
    }

    index++;
  }

  return index;
};
