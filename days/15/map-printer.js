module.exports = (map) => {
  const mapWidth = Object.keys(map)
    .map(key => Number(key.split(',')[0]))
    .sort((a, b) => b - a)[0];

  const mapHeight = Object.keys(map)
    .map(key => Number(key.split(',')[1]))
    .sort((a, b) => b - a)[0];

  for (let col = 0; col < mapHeight + 1; col++) {
    console.log(
      [...Array(mapWidth + 1)]
        .map((v, i) => i)
        .reduce((memo, row) => memo.concat(map[`${row},${col}`]), ''),
    );
  }
};
