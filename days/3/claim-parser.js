module.exports = (toParse) => {
  const [id, x, y, w, h] = /#(\d+)\s@\s(\d+),(\d+): (\d+)x(\d+)/.exec(toParse).slice(1);

  return {
    id,
    x: Number(x),
    y: Number(y),
    w: Number(w),
    h: Number(h),
  };
};
