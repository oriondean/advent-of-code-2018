module.exports = (item, id) => {
  const [x, y, dx, dy] = /position=<(.*),(.*)>\svelocity=<(.*),(.*)>/
    .exec(item)
    .slice(1);

  return {
    id,
    x: Number(x.trim()),
    y: Number(y.trim()),
    dx: Number(dx.trim()),
    dy: Number(dy.trim()),
  };
};
