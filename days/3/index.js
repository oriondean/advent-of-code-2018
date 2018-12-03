const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const grid = {};

  const claims = data.split('\r\n').map((row) => {
    const [id, x, y, w, h] = /#(\d+)\s@\s(\d+),(\d+): (\d+)x(\d+)/.exec(row).slice(1);
    return {
      id,
      x: Number(x),
      y: Number(y),
      w: Number(w),
      h: Number(h),
    };
  });

  claims.forEach((claim) => {
    // Fill in claim horizontally rightwards, one row at a time
    for (let col = claim.y; col < claim.y + claim.h; col++) {
      for (let row = claim.x; row < claim.x + claim.w; row++) {
        grid[`${row},${col}`] = grid[`${row},${col}`] ? grid[`${row},${col}`] + 1 : 1;
      }
    }
  });

  // Part One
  console.log(Object.values(grid).filter(value => value > 1).length);

  // Part Two
  console.log(claims.find((claim) => {
    for (let col = claim.y; col < claim.y + claim.h; col++) {
      for (let row = claim.x; row < claim.x + claim.w; row++) {
        if (grid[`${row},${col}`] > 1) {
          return false;
        }
      }
    }

    return true;
  }));
});
