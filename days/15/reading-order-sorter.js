module.exports = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a[1] === b[1] ? a[0] - b[0] : a[1] - b[1];
  }
  return a.y === b.y ? a.x - b.x : a.y - b.y;
};
