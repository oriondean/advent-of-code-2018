const input = '637061';

const board = [3, 7];
const elfIndexes = [0, 1];

let hasFoundInput = false;

const getRecipes = (array, start, end) => array.slice(start, end).join('');

while (!hasFoundInput) {
  const combinedRecipe = board[elfIndexes[0]] + board[elfIndexes[1]];
  const newRecipes = String(combinedRecipe).split('').map(Number);
  board.push(...newRecipes);

  elfIndexes[0] = (elfIndexes[0] + 1 + board[elfIndexes[0]]) % board.length;
  elfIndexes[1] = (elfIndexes[1] + 1 + board[elfIndexes[1]]) % board.length;

  hasFoundInput = getRecipes(board, -input.length) === input
    || getRecipes(board, -input.length - 1, -1) === input;

  if (board.length === Number(input) + 10) {
    console.log('part one', board.slice(-10).join(''));
  }
}

console.log('part two', board.length - input.length - 1, board.length - input.length);
