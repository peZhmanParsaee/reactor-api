// @flow
const moment = require("moment-jalaali");
const { faToEnDigits, enToFaDigits } = require("./number-helper");

exports.getCurrectTimeStamp = () => {
  return moment().valueOf();
};

exports.formatJalaaliDate = ({
  jalaaliDate : String,
  inFormat = "jYYYY/jMM/jDD",
  outFormat
}) => {
  moment.loadPersian();
  const enDigitsJalaaliDate = faToEnDigits(jalaaliDate);
  return moment(enDigitsJalaaliDate, inFormat).format(outFormat);
};

exports.addToJalaaliDate = ({
  jalaaliDate,
  inFormat = "jYYYY/jMM/jDD",
  outFormat,
  addValue,
  addUnit
}) => {
  moment.loadPersian();
  const enDigitsJalaaliDate = faToEnDigits(jalaaliDate);
  const momentDate = moment(enDigitsJalaaliDate, inFormat);
  switch (addUnit) {
    case "day":
      momentDate.add(addValue, "days");
      break;
    case "hour":
      momentDate.add(addValue, "hours");
      break;
    case "month":
      momentDate.add(addValue, "months");
      break;
  }
  return momentDate.format(outFormat);
};

exports.addToTimestampAndFormatJalaali = ({
  timestamp,
  outFormat,
  addValue,
  addUnit
}) => {
  moment.loadPersian();
  const momentDate = moment(timestamp, "X");

  switch (addUnit) {
    case "day":
      momentDate.add(1, "days");
      break;
    case "hour":
      momentDate.add(1, "hours");
      break;
    case "month":
      momentDate.add(1, "months");
      break;
  }
  return momentDate.format(outFormat);
};
