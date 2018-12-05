module.exports = (activeGuard, start, end) => activeGuard.durationAsleep
  + (activeGuard.isAwake ? 0 : end - start);
