const moment = require('moment-jalaali');

exports.getCurrectTimeStamp = () => {
  return moment().valueOf();
};
