const fs = require('fs');

const makeNode = (items) => {
  const children = [...Array(items[0])].reduce((memo) => {
    const node = makeNode(memo.items);
    return { nodes: [...memo.nodes, node], items: memo.items.slice(node.length) };
  }, { items: items.slice(2), nodes: [] });

  const metadata = children.items.slice(0, items[1]);
  const score = metadata.reduce((memo, value) => memo + value, 0);
  const referenceScore = items[0]
    ? metadata.reduce((memo, ref) => (
      children.nodes[ref - 1] ? memo + children.nodes[ref - 1].referenceScore : memo), 0)
    : score;

  return {
    referenceScore,
    inclusiveScore: children.nodes.reduce((memo, child) => memo + child.inclusiveScore, score),
    length: children.nodes.reduce((memo, child) => memo + child.length, 2 + items[1]),
  };
};

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const items = data.split(' ')
    .map(Number);

  const root = makeNode(items);

  console.log('part one', root.inclusiveScore);
  console.log('part two', root.referenceScore);
});
