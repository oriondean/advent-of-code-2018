const scanHorizontal = (map, start, isLeft) => {
  const nodes = [];
  const current = start.slice(0);

  while (map[current[0]] && map[current[0] + 1]
    && ['.', '|', '~'].indexOf(map[current[0]][current[1]]) !== -1
    && ['#', '~'].indexOf(map[current[0] + 1][current[1]]) !== -1) {
    nodes.push([current[0], current[1]]);
    current[1] += (isLeft ? -1 : 1);
  }

  return nodes;
};

module.exports = {
  scanDownwards: (map, start) => {
    const nodes = [];
    const current = start.slice(0);

    while (map[current[0]] && map[current[0]][current[1]] === '.') {
      nodes.unshift([current[0], current[1]]);
      current[0] += 1;
    }

    return nodes;
  },
  scanLeft: (map, start) => scanHorizontal(map, start, true),
  scanRight: (map, start) => scanHorizontal(map, start, false),
};
