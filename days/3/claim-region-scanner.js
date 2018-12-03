module.exports = (claim, action) => {
  // Scan claim horizontally rightwards, one row at a time
  for (let row = claim.y; row < claim.y + claim.h; row++) {
    for (let col = claim.x; col < claim.x + claim.w; col++) {
      const result = action(row, col);
      if (result !== undefined) {
        return result;
      }
    }
  }

  return true;
};
