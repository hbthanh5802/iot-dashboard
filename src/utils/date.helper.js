const moment = require('moment-timezone');
const dateHelper = {};

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const dateFormat = 'YYYY-MM-DD hh:mm:ss';

dateHelper.convertDateFormat = (dateString) => {
  if (!dateString) dateString = moment();
  return moment(dateString);
};

dateHelper.getCurrentDate = () => moment().format(dateFormat);

dateHelper.isToday = (dateString) =>
  moment(dateString).format(dateFormat).isSame(moment(), 'day');

module.exports = dateHelper;
