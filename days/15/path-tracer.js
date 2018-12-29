module.exports = (seen, root) => {
  let paths = [[root]];
  let { distance } = seen[root];

  while (distance > 1) {
    paths = paths.map(path => (
      Array.isArray(path[0])
        ? path.reduce((memo, innerPath) => {
          memo.push(...seen[innerPath].paths); // modify instance for performance improvement
          return memo;
        }, []) : seen[path].paths
    ));
    ({ distance } = seen[paths[0][0]]);
  }

  return paths[0];
};
