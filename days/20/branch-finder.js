module.exports = (string) => {
  if (!~string.indexOf('|')) {
    return [string];
  }

  return string.split('')
    .reduce(({ nestingLevel, branches }, char) => {
      const newNestingLevel = char === '(' ? nestingLevel + 1 : char === ')' ? nestingLevel - 1 : nestingLevel;
      const newBranches = branches.slice(0, -1).concat(branches[branches.length - 1].concat(char));

      return {
        nestingLevel: newNestingLevel,
        branches: char === '|' && newNestingLevel === 0 ? [...branches, ''] : newBranches,
      };
    }, { branches: [''], nestingLevel: 0 }).branches;
};
