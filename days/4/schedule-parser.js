const tallyMinutesAsleep = require('./minutes-asleep-tallier');

const createGuard = id => ({
  id,
  isAwake: true,
  minutesAsleep: {},
  durationAsleep: 0,
});

const sleepReducer = (schedule, eventTime, activeGuard) => ({
  ...schedule,
  lastEventTime: eventTime,
  guards: {
    ...schedule.guards,
    [activeGuard.id]: {
      ...activeGuard,
      isAwake: false,
    },
  },
});

const awakeReducer = (schedule, eventTime, activeGuard) => ({
  ...schedule,
  lastEventTime: eventTime,
  guards: {
    ...schedule.guards,
    [schedule.activeGuardId]: {
      ...activeGuard,
      durationAsleep:
        activeGuard.durationAsleep + (activeGuard.isAwake ? 0 : eventTime - schedule.lastEventTime),
      isAwake: true,
      minutesAsleep: !activeGuard.isAwake
        ? tallyMinutesAsleep(activeGuard.minutesAsleep, schedule.lastEventTime, eventTime)
        : activeGuard.minutesAsleep,
    },
  },
});

const newGuardReducer = (schedule, eventTime, activeGuard, newActiveGuardId) => ({
  ...schedule,
  ...awakeReducer(schedule, eventTime, activeGuard),
  activeGuardId: newActiveGuardId,
  guards: {
    ...schedule.guards,
    [newActiveGuardId]: {
      ...createGuard(newActiveGuardId),
      ...schedule.guards[newActiveGuardId],
      isAwake: true,
    },
  },
});

module.exports = data => data
  .split('\r\n')
  .sort((a, b) => new Date(a.slice(1, 17)).valueOf() - new Date(b.slice(1, 17)).valueOf())
  .reduce((schedule, event) => {
    const eventTime = Number(event.slice(15, 17));
    const activeGuard = schedule.guards[schedule.activeGuardId];

    switch (eventTime) {
      case event.endsWith('begins shift'):
        return newGuardReducer(schedule, eventTime, activeGuard, /#\d+/.exec(event)[0]);
      case event.endsWith('wakes up'):
        return awakeReducer(schedule, eventTime, activeGuard);
      case event.endsWith('falls asleep'):
        return sleepReducer(schedule, eventTime, activeGuard);
      default:
        throw new Error('attempted to process unknown event');
    }
  }, {
    guards: { '-1': createGuard('-1') },
    lastEventTime: 0,
    activeGuardId: '-1',
  });
