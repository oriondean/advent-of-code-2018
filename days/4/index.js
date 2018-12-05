const fs = require('fs');
const parseSchedule = require('./schedule-parser');

const getSleepiestMinute = minutes => Object.entries(minutes).sort((a, b) => b[1] - a[1])[0];

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const { guards } = parseSchedule(data);

  const [sleepiestGuard] = Object.values(guards)
    .sort((a, b) => b.durationAsleep - a.durationAsleep);

  const sleepiestMinute = getSleepiestMinute(sleepiestGuard.minutesAsleep);

  console.log(`Sleepiest guard ${sleepiestGuard.id} spent the most time asleep (${sleepiestMinute[1]} minutes) on minute ${sleepiestMinute[0]}`);

  const consistentlySleepyGuard = Object.values(guards)
    .sort((a, b) => {
      const mostA = getSleepiestMinute(a.minutesAsleep);
      const mostB = getSleepiestMinute(b.minutesAsleep);

      return (mostB ? mostB[1] : 0) - (mostA ? mostA[1] : 0);
    })[0];

  const consistentlySleepiestMinute = getSleepiestMinute(consistentlySleepyGuard.minutesAsleep);
  console.log(`Most consistently sleepiest guard spent most time asleep (${consistentlySleepiestMinute[0]} minutes) on minute ${consistentlySleepiestMinute[1]}`);
});
