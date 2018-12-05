// Period asleep is exclusive of ending time
module.exports = (periodsAsleep, start, end) => [...periodsAsleep, `${start} - ${end - 1}`];
