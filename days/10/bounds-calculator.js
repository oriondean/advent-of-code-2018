module.exports = (points, padding) => {
  const sortedX = points.slice(0).sort((a, b) => a.x - b.x);
  const sortedY = points.slice(0).sort((a, b) => a.y - b.y);

  return {
    minX: sortedX[0].x - padding,
    minY: sortedY[0].y - padding,
    maxX: sortedX[sortedX.length - 1].x + padding,
    maxY: sortedY[sortedY.length - 1].y + padding,
  };
};
