const sortSchedule = require('./schedule-event-sorter');
const tallyDurationAsleep = require('./duration-asleep-tallier');
const tallyMinutesAsleep = require('./minutes-asleep-tallier');

const createGuard = id => ({
  id,
  isAwake: true,
  minutesAsleep: {},
  periodsAsleep: [],
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
      durationAsleep: tallyDurationAsleep(activeGuard, schedule.lastEventTime, eventTime),
      isAwake: true,
      minutesAsleep:
        tallyMinutesAsleep(activeGuard.minutesAsleep, schedule.lastEventTime, eventTime),
    },
  },
});

const newGuardReducer = (schedule, eventTime, activeGuard, newActiveGuardId) => ({
  ...schedule,
  lastEventTime: eventTime,
  activeGuardId: newActiveGuardId,
  guards: {
    ...schedule.guards,
    [newActiveGuardId]: {
      ...createGuard(newActiveGuardId),
      ...schedule.guards[newActiveGuardId],
      isAwake: true,
    },
    [schedule.activeGuardId]: {
      ...activeGuard,
      id: schedule.activeGuardId,
      durationAsleep: tallyDurationAsleep(activeGuard, schedule.lastEventTime, eventTime),
      minutesAsleep: !activeGuard.isAwake
        ? tallyMinutesAsleep(activeGuard.minutesAsleep, schedule.lastEventTime, eventTime)
        : activeGuard.minutesAsleep,
    },
  },
});

module.exports = data => data
  .split('\r\n')
  .sort(sortSchedule)
  .reduce((schedule, event) => {
    const eventTime = Number(event.slice(15, 17));
    const activeGuard = schedule.guards[schedule.activeGuardId];

    if (event.endsWith('falls asleep')) {
      return sleepReducer(schedule, eventTime, activeGuard);
    }

    if (event.endsWith('begins shift')) {
      return newGuardReducer(schedule, eventTime, activeGuard, /#\d+/.exec(event)[0]);
    }

    if (event.endsWith('wakes up')) {
      return awakeReducer(schedule, eventTime, activeGuard);
    }

    throw new Error('attempted to process unknown event');
  }, {
    guards: { '-1': createGuard('-1') },
    lastEventTime: 0,
    activeGuardId: '-1',
  });
