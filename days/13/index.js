const fs = require('fs');
const Cart = require('./cart');

const isCart = char => char === '^' || char === '>' || char === 'v' || char === '<';

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const track = data.split('\r\n')
    .map(row => row.split(''));

  let hasFirstCollision = false;
  let carts = track.reduce((memo, row, y) => [...memo, ...row.map((char, x) => (
    isCart(char) && new Cart(char, x, y))).filter(item => !!item)], []);

  while (carts.length > 1) {
    let unprocessed = carts;
    let processed = [];

    while (unprocessed.length > 0) {
      const cart = unprocessed.shift();
      const [nextX, nextY] = cart.getNextPosition();

      if (isCart(track[nextY][nextX])) {
        if (!hasFirstCollision) {
          console.log('part one', nextX, nextY);
          hasFirstCollision = true;
        }

        const collided = unprocessed.find(toFind => toFind.isAtPosition(nextX, nextY))
          || processed.find(toFind => toFind.isAtPosition(nextX, nextY));

        track[collided.y][collided.x] = cart.trackUnderneath;
        track[cart.y][cart.x] = cart.trackUnderneath;
        track[nextY][nextX] = collided.trackUnderneath || cart.trackUnderneath;

        unprocessed = unprocessed.filter(toFilter => !toFilter.isAtPosition(nextX, nextY));
        processed = processed.filter(toFilter => !toFilter.isAtPosition(nextX, nextY));
      } else {
        track[cart.y][cart.x] = cart.trackUnderneath;
        track[nextY][nextX] = cart.move(track[nextY][nextX]);
        processed.push(cart);
      }
    }

    carts = processed.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));
  }

  console.log('part two', carts[0].x, carts[0].y);
});
