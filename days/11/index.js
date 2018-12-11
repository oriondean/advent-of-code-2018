const serialNumber = 7347;
const gridSize = 300;
const sizeCache = {};
const start = Date.now();
const largestCachableSize = 10;

let maxPowerLevelSeen = -1;
let maxPowerLevelCoord = [-1, -1];

const grid = [...Array(gridSize)].map((_, x) => [...Array(gridSize)].map((__, y) => {
  const rackID = (x + 1) + 10;
  return Number(String((rackID * (y + 1) + serialNumber) * rackID).slice(-3, -2)) - 5;
}));

const getLargestPrimeUpto = (number, upto) => [...Array(upto)]
  .map((v, i) => upto - i)
  .find(value => number % value === 0);

const calculateTotalPower = (startRow, startCol, size) => {
  let totalPower = 0;

  for (let col = startCol; col < startCol + size; col++) {
    for (let row = startRow; row < startRow + size; row++) {
      totalPower += grid[row] && grid[row][col] ? grid[row][col] : 0;
    }
  }

  return totalPower;
};

const getTotalPower = (cache, startRow, startCol, prime, ratio) => {
  let totalPower = 0;
  for (let sizeY = 0; sizeY < ratio; sizeY += prime) {
    for (let sizeX = 0; sizeX < ratio; sizeX += prime) {
      totalPower += cache[`${startRow + sizeX},${startCol + sizeY},${prime}`];
    }
  }

  return totalPower;
};

for (let size = 1; size <= 100; size++) {
  const largestPrime = getLargestPrimeUpto(size, largestCachableSize);
  const sizePrimeRatio = size / largestPrime;

  for (let col = 0; col < gridSize - size; col++) {
    for (let row = 0; row < gridSize - size; row++) {
      const hasCachedPrime = sizePrimeRatio > 1 && sizePrimeRatio <= largestCachableSize;

      const totalPower = hasCachedPrime
        ? getTotalPower(sizeCache, row, col, largestPrime, sizePrimeRatio)
        : calculateTotalPower(row, col, size);

      if (hasCachedPrime && size <= largestCachableSize) {
        sizeCache[`${row},${col},${size}`] = totalPower;
      }

      if (totalPower > maxPowerLevelSeen) {
        maxPowerLevelSeen = totalPower;
        maxPowerLevelCoord = [row + 1, col + 1, size];
      }
    }
  }
}

console.log(maxPowerLevelCoord, Date.now() - start);
