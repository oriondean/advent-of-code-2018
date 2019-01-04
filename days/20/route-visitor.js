const getClosingBrace = require('./brace-finder');
const getBranches = require('./branch-finder');

const move = ([x, y], direction) => {
  if (direction === 'N' || direction === 'S') {
    return direction === 'N' ? [x, y - 1] : [x, y + 1];
  }
  return direction === 'W' ? [x - 1, y] : [x + 1, y];
};

// mutate map instance for performance reasons
const enter = (map, direction, currentPosition, roomsSeen) => {
  const currentKey = `${currentPosition[0]},${currentPosition[1]}`;
  map[currentKey] = roomsSeen; // eslint-disable-line no-param-reassign

  const nextPosition = move(currentPosition, direction);
  const nextKey = `${nextPosition[0]},${nextPosition[1]}`;
  map[nextKey] = roomsSeen + 1; // eslint-disable-line no-param-reassign

  return { map, position: nextPosition, roomsSeen: roomsSeen + 1 };
};

const visit = (map, route, position, roomsSeen) => {
  const branches = getBranches(route);
  if (branches.length > 1) {
    branches.forEach(branch => visit(map, branch, position, roomsSeen));
    return { map, position, roomsSeen };
  }

  const braceIndexes = {
    opening: route.indexOf('('),
    closing: getClosingBrace(route),
  };
  if (!~braceIndexes.opening) {
    return route.split('')
      .reduce((memo, direction) => enter(memo.map,
        direction, memo.position, memo.roomsSeen), { map, position, roomsSeen });
  }

  const beforeBrace = route.slice(0, braceIndexes.opening);
  const withinBrace = route.slice(braceIndexes.opening + 1, braceIndexes.closing);
  const afterBrace = route.slice(braceIndexes.closing + 1);

  const beforeResult = visit(map, beforeBrace, position, roomsSeen);
  const withinResult = visit(map, withinBrace, beforeResult.position, beforeResult.roomsSeen);
  return visit(map, afterBrace, withinResult.position, withinResult.roomsSeen);
};

module.exports = visit;
