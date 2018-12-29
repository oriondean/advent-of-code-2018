const game = require('./index');

describe('test', () => {
  it('AoC example one', () => game('./days/15/tests/AoC/AoC1.txt')
    .then((actual) => {
      expect(actual.result).toEqual(27730);
      expect(actual.remainingHp).toEqual(590);
      expect(actual.turn).toEqual(47);
    }));

  it('AoC example two', () => game('./days/15/tests/AoC/AoC2.txt')
    .then((actual) => {
      expect(actual.result).toEqual(36334);
      expect(actual.remainingHp).toEqual(982);
      expect(actual.turn).toEqual(37);
    }));

  it('AoC example three', () => game('./days/15/tests/AoC/AoC3.txt')
    .then((actual) => {
      expect(actual.result).toEqual(39514);
      expect(actual.remainingHp).toEqual(859);
      expect(actual.turn).toEqual(46);
    }));

  it('AoC example four', () => game('./days/15/tests/AoC/AoC4.txt')
    .then((actual) => {
      expect(actual.result).toEqual(27755);
      expect(actual.remainingHp).toEqual(793);
      expect(actual.turn).toEqual(35);
    }));

  it('AoC example five', () => game('./days/15/tests/AoC/AoC5.txt')
    .then((actual) => {
      expect(actual.result).toEqual(28944);
      expect(actual.remainingHp).toEqual(536);
      expect(actual.turn).toEqual(54);
    }));

  it('AoC example six', () => game('./days/15/tests/AoC/AoC6.txt')
    .then((actual) => {
      expect(actual.result).toEqual(18740);
      expect(actual.remainingHp).toEqual(937);
      expect(actual.turn).toEqual(20);
    }));

  it('move right', () => game('./days/15/tests/move-right.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10234);
      expect(actual.remainingHp).toEqual(301);
      expect(actual.turn).toEqual(34);
    }));

  it('movement', () => game('./days/15/tests/movement.txt')
    .then((actual) => {
      expect(actual.result).toEqual(27828);
      expect(actual.remainingHp).toEqual(1546);
      expect(actual.turn).toEqual(18);
    }));

  it('wall', () => game('./days/15/tests/wall.txt')
    .then((actual) => {
      expect(actual.result).toEqual(18468);
      expect(actual.remainingHp).toEqual(486);
      expect(actual.turn).toEqual(38);
    }));

  it('reddit one', () => game('./days/15/tests/reddit/1.txt')
    .then((actual) => {
      expect(actual.result).toEqual(13400);
      expect(actual.remainingHp).toEqual(200);
      expect(actual.turn).toEqual(67);
    }));

  it('reddit two', () => game('./days/15/tests/reddit/2.txt')
    .then((actual) => {
      expect(actual.result).toEqual(13987);
      expect(actual.remainingHp).toEqual(197);
      expect(actual.turn).toEqual(71);
    }));

  it('reddit three', () => game('./days/15/tests/reddit/3.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10325);
      expect(actual.remainingHp).toEqual(295);
      expect(actual.turn).toEqual(35);
    }));

  it('reddit four', () => game('./days/15/tests/reddit/4.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10804);
      expect(actual.remainingHp).toEqual(292);
      expect(actual.turn).toEqual(37);
    }));

  it('reddit five', () => game('./days/15/tests/reddit/5.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10620);
      expect(actual.remainingHp).toEqual(295);
      expect(actual.turn).toEqual(36);
    }));

  it('reddit six', () => game('./days/15/tests/reddit/6.txt')
    .then((actual) => {
      expect(actual.result).toEqual(16932);
      expect(actual.remainingHp).toEqual(498);
      expect(actual.turn).toEqual(34);
    }));

  it('reddit seven', () => game('./days/15/tests/reddit/7.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10234);
      expect(actual.remainingHp).toEqual(301);
      expect(actual.turn).toEqual(34);
    }));

  it('reddit eight', () => game('./days/15/tests/reddit/8.txt')
    .then((actual) => {
      expect(actual.result).toEqual(10430);
      expect(actual.remainingHp).toEqual(298);
      expect(actual.turn).toEqual(35);
    }));

  it('reddit nine', () => game('./days/15/tests/reddit/9.txt')
    .then((actual) => {
      expect(actual.result).toEqual(12744);
      expect(actual.remainingHp).toEqual(531);
      expect(actual.turn).toEqual(24);
    }));

  it('reddit ten', () => game('./days/15/tests/reddit/10.txt')
    .then((actual) => {
      expect(actual.result).toEqual(14740);
      expect(actual.remainingHp).toEqual(737);
      expect(actual.turn).toEqual(20);
    }));

  it('part one', () => game('./days/15/tests/input.txt')
    .then((actual) => {
      expect(actual.result).toEqual(208960);
      expect(actual.remainingHp).toEqual(2612);
      expect(actual.turn).toEqual(80);
    }));

  it('part two', () => game('./days/15/tests/input.txt', 23)
    .then((actual) => {
      expect(actual.result).toEqual(49863);
      expect(actual.remainingHp).toEqual(1511);
      expect(actual.turn).toEqual(33);
    }));
});
