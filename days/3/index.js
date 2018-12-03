const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const gridSize = 1007;
  const grid = [...Array(gridSize)].map(() => [...Array(gridSize)].map(() => 0));
  // const grid = {}

  const claims = data.split('\r\n').map(row => {
    const [id, x, y, w, h] = /#(\d+)\s@\s(\d+),(\d+): (\d+)x(\d+)/.exec(row).slice(1);
    return { id: Number(id), x: Number(x), y: Number(y), w: Number(w), h: Number(h) };
  });

  claims.forEach(claim => {
    for (let row = claim.x; row < claim.x + claim.w; row++) {
      for (let col = claim.y; col < claim.y + claim.h; col++) {
        grid[row][col] = grid[row][col] ? grid[row][col] + 1 : 1;
      }
    }
  });

  console.log(grid.reduce((memo, column) => memo + column.filter(value => value > 1).length, 0));

  // claims.forEach(claim => {
  //   for (let row = claim.x; row < claim.x + claim.h; row++) {
  //     for (let col = claim.y; col < claim.y + claim.w; col++) {
  //       grid[`${row}${col}`] = grid[`${row}${col}`] ? grid[`${row}${col}`] + 1 : 1;
  //     }
  //   }
  // });

  // for (let row = 0; row < grid.length; row++) {
  //   console.log(grid[row]);
  // }
});