// @flow
const moment = require('moment-jalaali');
const { faToEnDigits, enToFaDigits } = require('./number-helper');

exports.getCurrectTimeStamp = () => {
  return moment().valueOf();
};

exports.formatJalaaliDate = ({
  jalaaliDate,
  inputFormat = 'jYYYY/jMM/jDD',
  outputFormat
}: { jalaaliDate: string, inputFormat: string, outputFormat: string }) => {
  moment.loadPersian();
  const enDigitsJalaaliDate = faToEnDigits(jalaaliDate);
  return moment(enDigitsJalaaliDate, inputFormat).format(outputFormat);
};

exports.addToJalaaliDate = ({
  jalaaliDate,
  inputFormat = 'jYYYY/jMM/jDD',
  outputFormat,
  addValue,
  addUnit
}: { jalaaliDate: string, inputFormat: string, outputFormat: string, addValue: number, addUnit: string }) => {
  moment.loadPersian();
  const enDigitsJalaaliDate = faToEnDigits(jalaaliDate);
  const momentDate = moment(enDigitsJalaaliDate, inputFormat);
  switch (addUnit) {
  case 'day':
    momentDate.add(addValue, 'days');
    break;
  case 'hour':
    momentDate.add(addValue, 'hours');
    break;
  case 'month':
    momentDate.add(addValue, 'months');
    break;
  }
  return momentDate.format(outputFormat);
};

exports.addToTimestampAndFormatJalaali = ({
  timestamp,
  outFormat,
  addValue,
  addUnit
}: { timestamp: number, outFormat: string, addValue: number, addUnit: string }) => {
  moment.loadPersian();
  const momentDate = moment(timestamp, 'X');

  switch (addUnit) {
  case 'day':
    momentDate.add(addValue, 'days');
    break;
  case 'hour':
    momentDate.add(addValue, 'hours');
    break;
  case 'month':
    momentDate.add(addValue, 'months');
    break;
  }
  return momentDate.format(outFormat);
};
