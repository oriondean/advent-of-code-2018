const scanner = require('./flow-scanner');

const trickle = (map, spout) => {
  const downwardFlow = scanner.scanDownwards(map, spout);
  downwardFlow.forEach((node) => { map[node[0]][node[1]] = '|'; }); // eslint-disable-line no-param-reassign
  if (downwardFlow.length === 0) {
    scanner.scanLeft(map, spout).forEach((node) => { map[node[0]][node[1]] = '~'; }); // eslint-disable-line no-param-reassign
    scanner.scanRight(map, spout).forEach((node) => { map[node[0]][node[1]] = '~'; }); // eslint-disable-line no-param-reassign
  }

  downwardFlow.forEach((flow) => {
    const leftFlow = scanner.scanLeft(map, flow);
    const leftEdge = leftFlow[leftFlow.length - 1];
    const rightFlow = scanner.scanRight(map, flow);
    const rightEdge = rightFlow[rightFlow.length - 1];

    const isLeftFilling = leftEdge && map[leftEdge[0]][leftEdge[1] - 1] === '#';
    const isRightFilling = rightEdge && map[rightEdge[0]][rightEdge[1] + 1] === '#';
    const isLeftOverflowing = leftEdge && map[leftEdge[0]][leftEdge[1] - 1] === '.' && map[leftEdge[0] + 1][leftEdge[1]] === '#';
    const isRightOverflowing = rightEdge && map[rightEdge[0]][rightEdge[1] + 1] === '.' && map[rightEdge[0] + 1][rightEdge[1]] === '#';

    if ((isLeftFilling || isLeftOverflowing) && (isRightFilling || isRightOverflowing)) {
      if (isLeftFilling) {
        // eslint-disable-next-line no-param-reassign
        leftFlow.forEach((node) => { map[node[0]][node[1]] = map[node[0]][node[1]] === '~' ? '~' : isRightOverflowing ? '|' : '~'; });
      } else if (isLeftOverflowing) {
        leftFlow.forEach((node) => { map[node[0]][node[1]] = '|'; }); // eslint-disable-line no-param-reassign
        trickle(map, [leftEdge[0], leftEdge[1] - 1]);
      }

      if (isRightFilling) {
        // eslint-disable-next-line no-param-reassign
        rightFlow.forEach((node) => { map[node[0]][node[1]] = map[node[0]][node[1]] === '~' ? '~' : isLeftOverflowing ? '|' : '~'; });
      } else if (isRightOverflowing) {
        rightFlow.forEach((node) => { map[node[0]][node[1]] = '|'; }); // eslint-disable-line no-param-reassign
        trickle(map, [rightEdge[0], rightEdge[1] + 1]);
      }
    }
  });
};

module.exports = trickle;
