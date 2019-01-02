module.exports = data => data.split('\r\n')
  .map(line => line.split(', ').map(assignment => assignment.split('=').map((value, i) => {
    if (i === 0) {
      return value;
    }

    if (assignment.indexOf('..') === -1) {
      return Number(value);
    }

    const [yMin, yMax] = value.split('..').map(Number);
    return [...Array((yMax + 1) - yMin)].map((_, j) => j + yMin);
  })).reduce((memo, [key, value]) => ({ ...memo, [key]: value }), {}));
