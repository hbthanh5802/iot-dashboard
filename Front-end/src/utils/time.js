import moment from 'moment';

export function isDateInRange(date, startDate, endDate) {
  // if (!moment.isMoment(date)) date = moment(date);
  // if (!moment.isMoment(startDate)) startDate = moment(startDate);
  // if (!moment.isMoment(endDate)) endDate = moment(endDate);

  const isBetween = date.isBetween(startDate, endDate);
  console.log('isDateInRange:', isBetween, date, startDate, endDate);
  return isBetween;
}

export function formatToCustomFormat(date, formatStr) {
  // const isoString = date.toISOString();
  if (!formatStr) formatStr = 'dddd, DD/MM/yyyy HH:mm:ss';
  return moment(date).format(formatStr);
}

export function getRandomDate(startDate, endDate) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const randomDate = moment(startMoment + Math.random() * (endMoment - startMoment));

  return randomDate;
}

export function getCurrentDateTimeInVietnam() {
  return moment().utcOffset('+07:00');
}
