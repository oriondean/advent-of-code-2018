const fs = require('fs');

const squares = require('./squares');
const unitFactory = require('./unit-factory');
const findNextStep = require('./path-finder');
const printMap = require('./map-printer');
const findTarget = require('./target-finder');
const readingOrder = require('./reading-order-sorter');

const isUnit = char => char === 'G' || char === 'E';

const attack = (unit, target, map, remainingEnemies, array, index) => {
  target.hp -= unit.ap; // eslint-disable-line no-param-reassign

  if (target.hp < 1) {
    map[`${target.x},${target.y}`] = '.'; // eslint-disable-line no-param-reassign

    if (remainingEnemies.length === 1) {
      return array.find((u, i) => u.hp > 0 && i > index);
    }
  }

  return false;
};

module.exports = (filename, elfAttackPower = 3, shouldLog = false) => new Promise((res) => {
  const createUnit = unitFactory(elfAttackPower);
  const log = (...args) => shouldLog && console.log(...args);

  fs.readFile(filename, 'utf-8', (err, data) => {
    const map = {};
    data.split('\r\n')
      .forEach((row, y) => {
        row.split('').forEach((value, x) => {
          map[`${x},${y}`] = value;
        });
      });

    let units = Object.entries(map)
      .reduce((memo, [key, char]) => {
        const [x, y] = key.split(',').map(Number);
        return isUnit(char) ? [...memo, createUnit(char, x, y, elfAttackPower)] : memo;
      }, []);

    let remainingElves = units.filter(unit => unit.char === 'E' && unit.hp > 0);
    let remainingGoblins = units.filter(unit => unit.char === 'G' && unit.hp > 0);
    let isCombatFinished = false;

    const startingElves = remainingElves.length;
    const startingGoblins = remainingGoblins.length;

    let turn = 0;
    while (remainingElves.length && remainingGoblins.length) {
      units.forEach((unit, index, array) => { // eslint-disable-line no-loop-func
        if (unit.hp < 1) {
          return;
        }

        const enemies = unit.enemy === 'G' ? remainingGoblins : remainingElves;
        const target = findTarget(unit, enemies);

        if (target) {
          isCombatFinished = attack(unit, target, map, enemies, array, index);
        } else {
          const enemySquares = squares.getAdjacentEnemy(map, enemies.filter((e => e.hp > 0)));

          const nextStep = findNextStep(map, unit.x, unit.y, enemySquares, shouldLog);
          if (!nextStep) {
            return;
          }

          map[`${unit.x},${unit.y}`] = '.';
          map[`${nextStep[0]},${nextStep[1]}`] = unit.char;
          [unit.x, unit.y] = nextStep; // eslint-disable-line no-param-reassign

          const targetAfterMoving = findTarget(unit, enemies);
          if (targetAfterMoving) {
            isCombatFinished = attack(unit, targetAfterMoving, map, enemies, array, index);
          }
        }
      });

      remainingElves = units.filter(unit => unit.char === 'E' && unit.hp > 0);
      remainingGoblins = units.filter(unit => unit.char === 'G' && unit.hp > 0);
      units = units.sort(readingOrder);

      if (!isCombatFinished) {
        turn++;
      }

      if (shouldLog) {
        printMap(map);
        console.table(units.map(unit => [unit.char, unit.x, unit.y, unit.hp]));
        console.log('\n\n');
      }
    }

    log(`Combat ends after ${turn} full rounds`);

    const remainingUnits = remainingElves.length ? remainingElves : remainingGoblins;
    const startingUnits = remainingElves.length ? startingElves : startingGoblins;
    const remainingType = remainingElves.length ? 'Elves' : 'Goblins';
    const remainingHp = remainingUnits.reduce((memo, unit) => memo + unit.hp, 0);
    log(`${remainingType} win with ${remainingHp} total hit points left and ${remainingUnits.length} / ${startingUnits} remaining ${remainingType.toLowerCase()}.`);
    log(`Outcome: ${turn * remainingHp}`);

    res({
      result: turn * remainingHp,
      turn,
      remainingHp,
    });
  });
});
